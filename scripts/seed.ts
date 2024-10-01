import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2maPtdqx1kVCAcCpisY9HPijfg3";
const SEED_CATEGORIES = [
  { id: "categoria_1", name: "Comida", userId: SEED_USER_ID, playdId: null, },
  { id: "categoria_2", name: "Aluguel", userId: SEED_USER_ID, playdId: null, },
  { id: "categoria_3", name: "Utilitários", userId: SEED_USER_ID, playdId: null, },
  { id: "categoria_7", name: "Roupas", userId: SEED_USER_ID, playdId: null, },
];

const SEED_ACCOUNTS = [
  { id: "conta_1", name: "Verificando", userId: SEED_USER_ID, playidId: null },
  { id: "conta_2", name: "Poupança", userId: SEED_USER_ID, playidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: typeof transactions.$inferSelect[] = [];

import { eachDayOfInterval, format } from "date-fns";
import { convertAmountToMiliunits } from "@/lib/utils";

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Aluguel":
      return Math.random() * 400 + 90;
    // O aluguel provavelmente será um valor maior
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

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  // 1 a 4 transações por dia
  for (let i = 0; i < numTransactions; i++) {
    const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    // 60% de chance de ser uma despesa
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount
    );

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      // Supondo sempre usar a primeira conta para simplificar
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Comerciante",
      notes: "Transação aleatória",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  });
  days.forEach(day => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    // Redefinir banco de dados
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    // Exportar categorias
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    // Exportar contas
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    // Exportar transações
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error("Erro durante a execução:", error);
    process.exit(1);
  }
};

main();