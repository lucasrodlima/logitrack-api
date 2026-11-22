import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeCreateDockUseCase } from "../../../use-cases/factories/make-create-dock-use-case";
import { DockAlreadyExistsError } from "../../../use-cases/errors/dock-already-exists-error";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const createDockBodySchema = z.object({
        code: z.string().min(2),
        description: z.string().nullable().optional(),
        status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
    })

    const { code, description, status } = createDockBodySchema.parse(req.body);

    try {
        const createDockUseCase = makeCreateDockUseCase();

        const { dock } = await createDockUseCase.execute({
            code,
            description,
            status
        });

        return rep.status(201).send({ dock });

    } catch (err) {
        if (err instanceof DockAlreadyExistsError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }
}
