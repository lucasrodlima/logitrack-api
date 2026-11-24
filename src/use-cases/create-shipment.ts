import { CargoType, Shipment, ShipmentStatus } from "../entities/shipment";
import { DocksRepository } from "../repositories/docks-repository";
import { ShipmentsRepository } from "../repositories/shipments-repository";
import { DockUnavailableError } from "./errors/dock-unavailable-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ShipmentAlreadyExistsError } from "./errors/shipment-already-exists";

interface CreateShipmentUseCaseRequest {
    trackingCode: string;
    cargoType?: CargoType;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status?: ShipmentStatus;
    operatorId: string;
    dockId: string;
}

interface CreateShipmentUseCaseResponse {
    shipment: Shipment;
}

export class CreateShipmentUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository,
        private docksRepo: DocksRepository,
    ) { }

    async execute({
        trackingCode,
        cargoType,
        driverName,
        licensePlate,
        origin,
        destination,
        weightKg,
        status,
        dockId,
        operatorId,
    }: CreateShipmentUseCaseRequest): Promise<CreateShipmentUseCaseResponse> {
        const existingShipment = await this.shipmentsRepo.findByTrackingCode(trackingCode);

        if (existingShipment) {
            throw new ShipmentAlreadyExistsError();
        }

        const dock = await this.docksRepo.findById(dockId);

        if (!dock) {
            throw new ResourceNotFoundError();
        }

        if (dock.status !== 'AVAILABLE') {
            throw new DockUnavailableError();
        }

        const shipment = await this.shipmentsRepo.create({
            trackingCode,
            cargoType,
            driverName,
            licensePlate,
            origin,
            destination,
            weightKg,
            status,
            dockId,
            operatorId,
        });

        await this.docksRepo.updateStatus(dock.id, 'OCCUPIED');

        return { shipment };
    }
}
