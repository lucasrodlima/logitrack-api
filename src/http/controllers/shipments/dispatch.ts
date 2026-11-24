import { FastifyReply, FastifyRequest } from "fastify";
import { makeDispatchShipmentUseCase } from "../../../use-cases/factories/make-dispatch-shipment-use-case";
import { z } from 'zod';
import { ShipmentAlreadyDispatchedError } from "../../../use-cases/errors/shipment-already-dispatched";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function dispatch(req: FastifyRequest, rep: FastifyReply) {
    const dispatchShipmentBodySchema = z.object({
        id: z.string().uuid(),
    })

    const { id: shipmentId } = dispatchShipmentBodySchema.parse(req.params);

    try {
        const dispatchShipmentUseCase = makeDispatchShipmentUseCase();

        const { shipment } = await dispatchShipmentUseCase.execute({
            shipmentId
        });

        return rep.status(200).send({ shipment });
    } catch (err) {

        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }
        if (err instanceof ShipmentAlreadyDispatchedError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }
}
