CREATE TABLE IF NOT EXISTS "categorias" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text,
	"nome" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contas" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text,
	"nome" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transferencias" (
	"id" text PRIMARY KEY NOT NULL,
	"valor" integer NOT NULL,
	"recebedor" text NOT NULL,
	"notas" text,
	"data" timestamp NOT NULL,
	"conta_id" text NOT NULL,
	"categoria_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_conta_id_contas_id_fk" FOREIGN KEY ("conta_id") REFERENCES "contas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
