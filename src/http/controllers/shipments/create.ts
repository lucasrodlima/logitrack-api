import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateShipmentUseCase } from "../../../use-cases/factories/make-create-shipment-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { DockUnavailableError } from "../../../use-cases/errors/dock-unavailable-error";
import { ShipmentAlreadyExistsError } from "../../../use-cases/errors/shipment-already-exists";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const createShipmentBodySchema = z.object({
        trackingCode: z.string().min(3),
        cargoType: z.enum(['GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK']),
        driverName: z.string(),
        licensePlate: z.string(),
        origin: z.string(),
        destination: z.string(),
        weightKg: z.float64(),
        status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED']).optional(),
        dockId: z.string(),
    })

    const {
        trackingCode,
        cargoType,
        driverName,
        licensePlate,
        origin,
        destination,
        weightKg,
        status,
        dockId,
    } = createShipmentBodySchema.parse(req.body);

    try {
        const createShipmentUseCase = makeCreateShipmentUseCase();

        const { shipment } = await createShipmentUseCase.execute({
            trackingCode,
            cargoType,
            driverName,
            licensePlate,
            origin,
            destination,
            weightKg,
            status,
            operatorId: req.user.sub,
            dockId,
        });

        return rep.status(201).send({ shipment });

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }

        if (err instanceof DockUnavailableError) {
            return rep.status(409).send({ message: err.message });
        }

        if (err instanceof ShipmentAlreadyExistsError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }

}
