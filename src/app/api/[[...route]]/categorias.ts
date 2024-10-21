import { z } from "zod";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { categorias, inserirCategoriaSchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const data = await db
      .select({
        id: categorias.id,
        nome: categorias.nome,
      })
      .from(categorias)
      .where(eq(categorias.userId, auth.userId));

    return c.json({ data });
  })
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
          id: categorias.id,
          nome: categorias.nome,
        })
        .from(categorias)
        .where(and(eq(categorias.userId, auth.userId), eq(categorias.id, id)));

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
      inserirCategoriaSchema.pick({
        nome: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Não autorizado" }, 401);
      }

      const [data] = await db
        .insert(categorias)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
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

      const data = await db
        .delete(categorias)
        .where(
          and(
            eq(categorias.userId, auth.userId),
            inArray(categorias.id, values.ids)
          )
        )
        .returning({
          id: categorias.id,
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
      inserirCategoriaSchema.pick({
        nome: true,
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

      const [data] = await db
        .update(categorias)
        .set(values)
        .where(and(eq(categorias.userId, auth.userId), eq(categorias.id, id)))
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

      const [data] = await db
        .delete(categorias)
        .where(and(eq(categorias.userId, auth.userId), eq(categorias.id, id)))
        .returning({
          id: categorias.id,
        });

      if (!data) {
        return c.json({ error: "Não encontrado" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
