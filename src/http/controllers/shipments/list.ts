import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeListShipmentsUseCase } from "../../../use-cases/factories/make-list-shipments-use-case";

export async function list(req: FastifyRequest, rep: FastifyReply) {
    const listShipmentsUseCase = makeListShipmentsUseCase()

    const { shipments } = await listShipmentsUseCase.execute();

    return rep.status(200).send({ shipments });
}
