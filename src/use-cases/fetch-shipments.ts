import { CargoType, Shipment, ShipmentStatus } from "../entities/shipment";
import { ShipmentsRepository } from "../repositories/shipments-repository";

interface FetchShipmentsUseCaseRequest {
    page: number,
    perPage: number,
    status?: ShipmentStatus,
    cargoType?: CargoType,
}

interface FetchShipmentsUseCaseResponse {
    shipments: Shipment[],
}

export class FetchShipmentsUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository
    ) { }

    async execute({
        page,
        perPage,
        status,
        cargoType,
    }: FetchShipmentsUseCaseRequest): Promise<FetchShipmentsUseCaseResponse> {
        const shipments = await this.shipmentsRepo.findMany({
            page,
            perPage,
            status,
            cargoType,
        });

        return { shipments };
    }
}
