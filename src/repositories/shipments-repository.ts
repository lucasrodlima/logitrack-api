import { Shipment, ShipmentCreateInput } from "../entities/shipment";

export interface ShipmentsRepository {
    findById(id: string): Promise<Shipment | null>;
    findByTrackingCode(trackingCode: string): Promise<Shipment | null>;
    findMany(): Promise<Shipment[]>;
    create(data: ShipmentCreateInput): Promise<Shipment>;
    save(shipment: Shipment): Promise<Shipment>;
}
