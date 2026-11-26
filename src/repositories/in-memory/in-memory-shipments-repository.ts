import { randomUUID } from "node:crypto";
import { Shipment, ShipmentCreateInput } from "../../entities/shipment";
import { FetchShipmentsParams, ShipmentsRepository } from "../shipments-repository";
import { DockNotFoundError } from "../../use-cases/errors/dock-not-found-error";

export class InMemoryShipmentsRepository implements ShipmentsRepository {
    public items: Shipment[] = [];

    async findById(id: string): Promise<Shipment | null> {
        return await this.items.find((item) => item.id === id) ?? null;
    }

    async findByTrackingCode(trackingCode: string): Promise<Shipment | null> {
        return await this.items.find((item) => item.trackingCode === trackingCode) ?? null;
    }

    async findMany({
        page,
        perPage,
        status,
        cargoType,
    }: FetchShipmentsParams): Promise<Shipment[]> {
        return this.items
            .filter((item) => {
                if (status && item.status !== status) return false;
                if (cargoType && item.cargoType !== cargoType) return false;
                return true
            })
            .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * perPage);
    }

    async create(data: ShipmentCreateInput): Promise<Shipment> {
        const shipment: Shipment = {
            id: randomUUID(),
            trackingCode: data.trackingCode,
            cargoType: data.cargoType ?? "GENERAL",
            driverName: data.driverName,
            licensePlate: data.licensePlate,
            origin: data.origin,
            destination: data.destination,
            weightKg: data.weightKg,
            status: data.status ?? 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date(),
            operatorId: data.operatorId,
            dockId: data.dockId,
        }

        this.items.push(shipment);

        return shipment;
    }

    async save(shipment: Shipment): Promise<Shipment> {
        const index = this.items.findIndex((item) => item.id === shipment.id);

        if (index === -1) {
            throw new DockNotFoundError();
        }

        this.items[index] = shipment;

        return this.items[index];
    }
}
