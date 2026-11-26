import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeFetchShipmentsUseCase } from "../../../use-cases/factories/make-fetch-shipments-use-case";

export async function fetch(req: FastifyRequest, rep: FastifyReply) {
    const fetchShipmentsUseCase = makeFetchShipmentsUseCase()

    const fetchQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(20),
        status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED']).optional(),
        cargoType: z.enum(['GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK']).optional(),
    });

    const { page, perPage, status, cargoType } = fetchQuerySchema.parse(req.query);

    const { shipments } = await fetchShipmentsUseCase.execute({
        page,
        perPage,
        status,
        cargoType,
    });

    return rep.status(200).send({ shipments });
}
