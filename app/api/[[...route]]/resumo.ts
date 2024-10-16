import { db } from "@/db/drizzle";
import { contas, categorias, transferencias } from "@/db/schema";
import { calculcatePercentageChange, fillMissingDays } from "@/lib/utils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { differenceInDays, parse, subDays } from "date-fns";
import { and, sql, sum, eq, gte, lte, lt, desc } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().get(
  "/",
  clerkMiddleware(),
  zValidator(
    "query",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      contaId: z.string().optional(),
    })
  ),

  async (c) => {
    const auth = getAuth(c);
    const { from, to, contaId } = c.req.valid("query");

    if (!auth?.userId) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, "yyyy-MM-dd", new Date())
      : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    async function fetchFinancialData(
      userId: string,
      startDate: Date,
      endDate: Date
    ) {
      return await db
        .select({
          renda:
            sql`SUM(CASE WHEN ${transferencias.valor} >= 0 THEN ${transferencias.valor} ELSE 0 END)`.mapWith(
              Number
            ),
            despesas:
            sql`SUM(CASE WHEN ${transferencias.valor} < 0 THEN ${transferencias.valor} ELSE 0 END)`.mapWith(
              Number
            ),
            restante: sum(transferencias.valor).mapWith(Number),
        })
        .from(transferencias)
        .innerJoin(contas, eq(transferencias.contaId, contas.id))
        .where(
          and(
            contaId ? eq(transferencias.contaId, contaId) : undefined,
            eq(contas.userId, userId),
            gte(transferencias.data, startDate),
            lte(transferencias.data, endDate)
          )
        );
    }

    const [currentPeriod] = await fetchFinancialData(
      auth.userId,
      startDate,
      endDate
    );

    const [lastPeriod] = await fetchFinancialData(
      auth.userId,
      lastPeriodStart,
      lastPeriodEnd
    );

    const rendaChange = calculcatePercentageChange(
      currentPeriod.renda,
      lastPeriod.renda
    );
    const despesasChange = calculcatePercentageChange(
      currentPeriod.despesas,
      lastPeriod.despesas
    );
    const restanteChange = calculcatePercentageChange(
      currentPeriod.restante,
      lastPeriod.restante
    );

    const categoria = await db
      .select({
        nome: categorias.nome,
        value: sql`SUM(ABS(${transferencias.valor}))`.mapWith(Number),
      })
      .from(transferencias)
      .innerJoin(contas, eq(transferencias.contaId, contas.id))
      .innerJoin(categorias, eq(transferencias.categoriaId, categorias.id))
      .where(
        and(
          contaId ? eq(transferencias.contaId, contaId) : undefined,
          eq(contas.userId, auth.userId),
          lt(transferencias.valor, 0),
          gte(transferencias.data, startDate),
          lte(transferencias.data, endDate)
        )
      )
      .groupBy(categorias.nome)
      .orderBy(desc(sql`SUM(ABS(${transferencias.valor}))`));

    const topCategorias = categoria.slice(0, 3);
    const otherCategorias = categoria.slice(3);
    const otherSum = otherCategorias.reduce(
      (sum, current) => sum + current.value,
      0
    );

    const finalCategorias = topCategorias;
    if (otherCategorias.length > 0) {
      finalCategorias.push({
        nome: "Outro",
        value: otherSum,
      });
    }

    const activeDays = await db
      .select({
        date: transferencias.data,
        renda:
          sql`SUM(CASE WHEN ${transferencias.valor} >= 0 THEN ${transferencias.valor} ELSE 0 END)`.mapWith(
            Number
          ),
        despesas:
          sql`SUM(CASE WHEN ${transferencias.valor} < 0 THEN ABS(${transferencias.valor}) ELSE 0 END)`.mapWith(
            Number
          ),
      })
      .from(transferencias)
      .innerJoin(contas, eq(transferencias.contaId, contas.id))
      .where(
        and(
          contaId ? eq(transferencias.contaId, contaId) : undefined,
          eq(contas.userId, auth.userId),
          gte(transferencias.data, startDate),
          lte(transferencias.data, endDate)
        )
      )
      .groupBy(transferencias.data)
      .orderBy(transferencias.data);

    const days = fillMissingDays(activeDays, startDate, endDate);

    return c.json({
      data: {
        valorRestante: currentPeriod.restante,
        restanteChange,
        valorRenda: currentPeriod.renda,
        rendaChange,
        valorDespesas: currentPeriod.despesas,
        despesasChange,
        categorias: finalCategorias,
        days,
      },
    });
  }
);

export default app;
