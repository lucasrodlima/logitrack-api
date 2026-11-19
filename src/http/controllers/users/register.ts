import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeRegisterUserUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['ADMIN', 'OPERATOR']).optional(),
    });

    const { name, email, password, role } = registerBodySchema.parse(request.body);

    try {
        const registerUserUseCase = makeRegisterUserUseCase();

        await registerUserUseCase.execute({
            name,
            email,
            password,
            role,
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
    }

    return reply.status(201).send();
} 
