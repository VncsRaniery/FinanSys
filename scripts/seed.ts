import "server-only";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categorias } from "@/db/schema";

const SEED_CATEGORIAS = (SEED_USER_ID: string) => [
  { id: "categoria_1", nome: "Custos Fixos", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_2", nome: "Conforto", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_3", nome: "Metas", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_5", nome: "Prazeres", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_3", nome: "Liberdade Financeira", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_6", nome: "Conhecimentos", userId: SEED_USER_ID, playdId: null },
];

export const seed = async (userId: string) => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  await db.insert(categorias).values(SEED_CATEGORIAS(userId)).execute();
};

// dependencias: npm i server-only