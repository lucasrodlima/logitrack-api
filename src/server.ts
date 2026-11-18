import { app } from "./app";
import { env } from "./env/index";

const start = async () => {
  try {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
