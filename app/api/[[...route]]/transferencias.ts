import { z } from "zod";
import { Hono } from "hono";
import { parse, subDays } from "date-fns";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

import { and, eq, gte, lte, desc, sql, inArray } from "drizzle-orm";
import { db } from "@/db/drizzle";
import {
  transferencias,
  inserirTransferenciaSchema,
  categorias,
  contas,
} from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        contaId: z.string().optional(),
      })
    ),
    clerkMiddleware(),
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

      const data = await db
        .select({
          id: transferencias.id,
          data: transferencias.data,
          categoria: categorias.nome,
          categoriaId: transferencias.categoriaId,
          recebedor: transferencias.recebedor,
          valor: transferencias.valor,
          notas: transferencias.notas,
          conta: contas.nome,
          contaId: transferencias.contaId,
        })
        .from(transferencias)
        .innerJoin(contas, eq(transferencias.contaId, contas.id))
        .leftJoin(categorias, eq(transferencias.categoriaId, categorias.id))
        .where(
          and(
            contaId ? eq(transferencias.contaId, contaId) : undefined,
            eq(contas.userId, auth.userId),
            gte(transferencias.data, startDate),
            lte(transferencias.data, endDate)
          )
        )
        .orderBy(desc(transferencias.data));

      return c.json({ data });
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "ID ausente" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const [data] = await db
        .select({
          id: transferencias.id,
          data: transferencias.data,
          categoriaId: transferencias.categoriaId,
          recebedor: transferencias.recebedor,
          valor: transferencias.valor,
          notas: transferencias.notas,
          contaId: transferencias.contaId,
        })
        .from(transferencias)
        .innerJoin(contas, eq(transferencias.contaId, contas.id))
        .where(and(eq(transferencias.id, id), eq(contas.userId, auth.userId)));

      if (!data) {
        return c.json({ error: "Não encontrado" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirTransferenciaSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const [data] = await db
        .insert(transferencias)
        .values({
          id: createId(),
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.array(
        inserirTransferenciaSchema.omit({
          id: true,
        })
      )
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const data = await db
        .insert(transferencias)
        .values(
          values.map((value) => ({
            id: createId(),
            ...value,
          }))
        )
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const transferenciasToDelete = db.$with("transferencias_to_delete").as(
        db
          .select({ id: transferencias.id })
          .from(transferencias)
          .innerJoin(contas, eq(transferencias.contaId, contas.id))
          .where(
            and(
              inArray(transferencias.id, values.ids),
              eq(contas.userId, auth.userId)
            )
          )
      );

      const data = await db
        .with(transferenciasToDelete)
        .delete(transferencias)
        .where(
          inArray(
            transferencias.id,
            sql`(select id from ${transferenciasToDelete})`
          )
        )
        .returning({
          id: transferencias.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      inserirTransferenciaSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "ID ausente" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const transferenciasToUpdate = db.$with("transferencias_to_update").as(
        db
          .select({ id: transferencias.id })
          .from(transferencias)
          .innerJoin(contas, eq(transferencias.contaId, contas.id))
          .where(and(eq(transferencias.id, id), eq(contas.userId, auth.userId)))
      );

      const [data] = await db
        .with(transferenciasToUpdate)
        .update(transferencias)
        .set(values)
        .where(
          inArray(
            transferencias.id,
            sql`(select id from ${transferenciasToUpdate})`
          )
        )
        .returning();

      if (!data) {
        return c.json({ error: "Não encontrado" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "ID ausente" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const transferenciasToDelete = db.$with("transferencias_to_delete").as(
        db
          .select({ id: transferencias.id })
          .from(transferencias)
          .innerJoin(contas, eq(transferencias.contaId, contas.id))
          .where(and(eq(transferencias.id, id), eq(contas.userId, auth.userId)))
      );

      const [data] = await db
        .with(transferenciasToDelete)
        .delete(transferencias)
        .where(
          inArray(
            transferencias.id,
            sql`(select id from ${transferenciasToDelete})`
          )
        )
        .returning({
          id: transferencias.id,
        });

      if (!data) {
        return c.json({ error: "Não encontrado" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;