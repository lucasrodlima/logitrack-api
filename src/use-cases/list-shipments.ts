import { Shipment } from "../entities/shipment";
import { ShipmentsRepository } from "../repositories/shipments-repository";

interface ListShipmentsUseCaseResponse {
    shipments: Shipment[];
}

export class ListShipmentsUseCase {
    constructor(private shipmentsRepo: ShipmentsRepository) { }

    async execute(): Promise<ListShipmentsUseCaseResponse> {
        const shipments = await this.shipmentsRepo.findMany();

        return { shipments };
    }
}
