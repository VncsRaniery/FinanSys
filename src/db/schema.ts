import { z } from "zod";
import { createInsertSchema } from "drizzle-zod"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tabela de contas
export const contas = pgTable("contas", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    nome: text("nome").notNull(),
    userId: text("user_id").notNull(),
});

export const contasRelacoes = relations(contas, ({ many }) => ({
    transferencias: many(transferencias),
}));

export const inserirContaSchema = createInsertSchema(contas);

// Tabela de categorias
export const categorias = pgTable("categorias", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    nome: text("nome").notNull(),
    userId: text("user_id").notNull(),
});

export const categoriasRelacoes = relations(categorias, ({ many }) => ({
    transferencias: many(transferencias),
}));

export const inserirCategoriaSchema = createInsertSchema(categorias);

// Tabela de transferências
export const transferencias = pgTable("transferencias", {
    id: text("id").primaryKey(),
    valor: integer("valor").notNull(),
    recebedor: text("recebedor").notNull(),
    notas: text("notas"),
    data: timestamp("data", {
        mode: "date"
    }).notNull(),
    contaId: text("conta_id")
        .references(() => contas.id, {
            onDelete: "cascade",
        }).notNull(),
    categoriaId: text("categoria_id")
        .references(() => categorias.id, {
            onDelete: "set null",
        }),
});

export const transferenciasRelacoes = relations(transferencias, ({ one }) => ({
    conta: one(contas, {
        fields: [transferencias.contaId],
        references: [contas.id],
    }),
    categoria: one(categorias, {
        fields: [transferencias.categoriaId],
        references: [categorias.id],
    }),
}));

export const inserirTransferenciaSchema = createInsertSchema(transferencias, {
    data: z.coerce.date(),
});
