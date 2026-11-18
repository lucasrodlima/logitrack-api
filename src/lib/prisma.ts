import { PrismaClient } from "@prisma/client";
import { env } from "../env/index";

export const primsa = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
