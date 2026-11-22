import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeListDocksUseCase } from "../../../use-cases/factories/make-list-docks-use-case";

export async function list(req: FastifyRequest, rep: FastifyReply) {
    const listDockUseCase = makeListDocksUseCase()

    const { docks } = await listDockUseCase.execute();

    return rep.status(200).send({ docks });
}
