import Fastify from "fastify";
import { env } from "./env/index";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

export const app = Fastify({
    logger: env.NODE_ENV === "dev",
});

app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(usersRoutes);

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.message,
            issues: error.format(),
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // in production log tool in the future
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})
