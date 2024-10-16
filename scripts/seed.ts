/*
import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categorias, contas, transferencias } from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2maPtdqx1kVCAcCpisY9HPijfg3";
const SEED_CATEGORIAS = [
  { id: "categoria_1", nome: "Salário", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_2", nome: "Rendimentos de investimentos", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_3", nome: "Moradia", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_4", nome: "Alimentação", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_5", nome: "Transporte", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_6", nome: "Saúde", userId: SEED_USER_ID, playdId: null },
];

const SEED_CONTAS = [
  { id: "conta_1", nome: "Banco Inter", userId: SEED_USER_ID, playidId: null },
  { id: "conta_2", nome: "Nubank", userId: SEED_USER_ID, playidId: null },
  { id: "conta_3", nome: "Poupança", userId: SEED_USER_ID, playidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSFERENCIAS: (typeof transferencias.$inferSelect)[] = [];

import { eachDayOfInterval, format } from "date-fns";
import { convertValorToMiliunits } from "@/lib/utils";

const generateRandomValor = (categoria: typeof categorias.$inferInsert) => {
  switch (categoria.nome) {
    case "Aluguel":
      return Math.random() * 400 + 90;
    case "Utilitários":
      return Math.random() * 200 + 50;
    case "Comida":
      return Math.random() * 30 + 10;
    case "Transporte":
    case "Saúde":
      return Math.random() * 50 + 15;
    case "Entretenimento":
    case "Roupas":
    case "Variado":
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransferenciasForDay = (day: Date) => {
  const numTransferencias = Math.floor(Math.random() * 4) + 1;
  // 1 a 4 transferências por dia
  for (let i = 0; i < numTransferencias; i++) {
    const categoria =
      SEED_CATEGORIAS[Math.floor(Math.random() * SEED_CATEGORIAS.length)];
    const isDespesa = Math.random() > 0.6;
    // 60% de chance de ser uma despesa
    const valor = generateRandomValor(categoria);
    const formattedValor = convertValorToMiliunits(isDespesa ? -valor : valor);

    SEED_TRANSFERENCIAS.push({
      id: `transferencia_${format(day, "yyyy-MM-dd")}_${i}`,
      contaId: SEED_CONTAS[0].id,
      categoriaId: categoria.id,
      data: day,
      valor: formattedValor,
      recebedor: "Comerciante",
      notas: "Transferência aleatória",
    });
  }
};

const generateTransferencias = () => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  });
  days.forEach((day) => generateTransferenciasForDay(day));
};

generateTransferencias();

const main = async () => {
  try {
    // Redefinir banco de dados
    await db.delete(transferencias).execute();
    await db.delete(contas).execute();
    await db.delete(categorias).execute();
    // Exportar categorias
    await db.insert(categorias).values(SEED_CATEGORIAS).execute();
    // Exportar contas
    await db.insert(contas).values(SEED_CONTAS).execute();
    // Exportar transferências
    await db.insert(transferencias).values(SEED_TRANSFERENCIAS).execute();
  } catch (error) {
    console.error("Erro durante a execução:", error);
    process.exit(1);
  }
};

main();
*/


import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categorias, contas, transferencias } from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2maPtdqx1kVCAcCpisY9HPijfg3";
const SEED_CATEGORIAS = [
  { id: "categoria_1", nome: "Salário", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_2", nome: "Rendimentos de investimentos", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_3", nome: "Moradia", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_4", nome: "Alimentação", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_5", nome: "Transporte", userId: SEED_USER_ID, playdId: null },
  { id: "categoria_6", nome: "Saúde", userId: SEED_USER_ID, playdId: null },
];

const SEED_CONTAS = [
  { id: "conta_1", nome: "Banco Inter", userId: SEED_USER_ID, playidId: null },
  { id: "conta_2", nome: "Nubank", userId: SEED_USER_ID, playidId: null },
  { id: "conta_3", nome: "Poupança", userId: SEED_USER_ID, playidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSFERENCIAS: (typeof transferencias.$inferSelect)[] = [];

import { eachDayOfInterval, format } from "date-fns";
import { convertValorToMiliunits } from "@/lib/utils";

// Função para gerar um valor aleatório baseado na categoria
const generateRandomValor = (categoria: typeof categorias.$inferInsert) => {
  switch (categoria.nome) {
    case "Salário":
      return Math.random() * 4000 + 2000;
    case "Rendimentos de investimentos":
      return Math.random() * 1000 + 500;
    case "Moradia":
      return Math.random() * 1500 + 800;
    case "Alimentação":
      return Math.random() * 500 + 100;
    case "Transporte":
      return Math.random() * 300 + 50;
    case "Saúde":
      return Math.random() * 400 + 50;
    default:
      return Math.random() * 100 + 10;
  }
};

// Função para escolher uma conta aleatória
const getRandomConta = () => {
  return SEED_CONTAS[Math.floor(Math.random() * SEED_CONTAS.length)];
};

// Função para gerar transferências para um dia
const generateTransferenciasForDay = (day: Date) => {
  const numTransferencias = Math.floor(Math.random() * 4) + 1; // 1 a 4 transferências por dia

  for (let i = 0; i < numTransferencias; i++) {
    const categoria = SEED_CATEGORIAS[Math.floor(Math.random() * SEED_CATEGORIAS.length)];
    const conta = getRandomConta(); // Seleciona uma conta aleatória
    const isDespesa = Math.random() > 0.6; // 60% de chance de ser uma despesa
    const valor = generateRandomValor(categoria);
    const formattedValor = convertValorToMiliunits(isDespesa ? -valor : valor);

    SEED_TRANSFERENCIAS.push({
      id: `transferencia_${format(day, "yyyy-MM-dd")}_${i}`,
      contaId: conta.id,
      categoriaId: categoria.id,
      data: day,
      valor: formattedValor,
      recebedor: "Comerciante",
      notas: "Transferência aleatória",
    });
  }
};

// Função para gerar transferências para o intervalo de tempo
const generateTransferencias = () => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  });

  days.forEach((day) => generateTransferenciasForDay(day));
};

generateTransferencias();

const main = async () => {
  try {
    // Redefinir banco de dados
    await db.delete(transferencias).execute();
    await db.delete(contas).execute();
    await db.delete(categorias).execute();
    // Exportar categorias
    await db.insert(categorias).values(SEED_CATEGORIAS).execute();
    // Exportar contas
    await db.insert(contas).values(SEED_CONTAS).execute();
    // Exportar transferências
    await db.insert(transferencias).values(SEED_TRANSFERENCIAS).execute();
  } catch (error) {
    console.error("Erro durante a execução:", error);
    process.exit(1);
  }
};

main();
