import { Hono } from "hono";
import { handle } from "hono/vercel";

import resumo from "./resumo";
import contas from "./contas";
import categorias from "./categorias";
import transferencias from "./transferencias";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/resumo", resumo)
  .route("/contas", contas)
  .route("/categorias", categorias)
  .route("/transferencias", transferencias);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
