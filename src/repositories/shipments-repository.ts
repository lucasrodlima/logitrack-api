import { CargoType, Shipment, ShipmentCreateInput, ShipmentStatus } from "../entities/shipment";

export interface ShipmentsRepository {
    findById(id: string): Promise<Shipment | null>;
    findByTrackingCode(trackingCode: string): Promise<Shipment | null>;
    findMany(params: FetchShipmentsParams): Promise<Shipment[]>;
    create(data: ShipmentCreateInput): Promise<Shipment>;
    save(shipment: Shipment): Promise<Shipment>;
}

export interface FetchShipmentsParams {
    page: number;
    perPage: number;
    status?: ShipmentStatus;
    cargoType?: CargoType;
}
