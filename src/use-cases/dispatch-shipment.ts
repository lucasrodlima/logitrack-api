import { Shipment } from "../entities/shipment";
import { DocksRepository } from "../repositories/docks-repository";
import { ShipmentsRepository } from "../repositories/shipments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ShipmentAlreadyDispatchedError } from "./errors/shipment-already-dispatched";

interface DispatchShipmentUseCaseRequest {
    shipmentId: string;
}

interface DispatchShipmentUseCaseResponse {
    shipment: Shipment;
}

export class DispatchShipmentUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository,
        private docksRepo: DocksRepository,
    ) { }

    async execute({ shipmentId }: DispatchShipmentUseCaseRequest): Promise<DispatchShipmentUseCaseResponse> {
        const shipment = await this.shipmentsRepo.findById(shipmentId);

        if (!shipment) {
            throw new ResourceNotFoundError();
        }

        if (shipment.status === 'IN_TRANSIT') {
            throw new ShipmentAlreadyDispatchedError();
        }

        shipment.status = 'IN_TRANSIT';

        this.shipmentsRepo.save(shipment);
        return { shipment };
    }
}
