import Fastify from "fastify";
import { env } from "./env/index";

export const app = Fastify({
  logger: env.NODE_ENV === "dev",
});

app.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});
