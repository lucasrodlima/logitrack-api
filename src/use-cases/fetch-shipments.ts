import { CargoType, Shipment, ShipmentStatus } from "../entities/shipment";
import { ShipmentsRepository } from "../repositories/shipments-repository";

interface FetchParamsUseCaseRequest {
    page: number,
    perPage: number,
    status?: ShipmentStatus,
    cargoType?: CargoType,
}

interface FetchParamsUseCaseResponse {
    shipments: Shipment[],
}

export class FetchParamsUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository
    ) { }

    async execute({
        page,
        perPage,
        status,
        cargoType,
    }: FetchParamsUseCaseRequest): Promise<FetchParamsUseCaseResponse> {
        const shipments = await this.shipmentsRepo.findMany({
            page,
            perPage,
            status,
            cargoType,
        });

        return { shipments };
    }
}
