export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELED';

export type CargoType = 'GENERAL' | 'REFRIGERATED' | 'HAZARDOUS' | 'FRAGILE' | 'BULK';

export interface Shipment {
    id: string;
    trackingCode: string;
    cargoType: CargoType;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status: ShipmentStatus;
    createdAt: Date;
    uptatedAt: Date;
    operatorId: string;
    dockId: string;
}

export interface ShipmentCreateInput {
    trackingCode: string;
    cragoType: string;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status?: ShipmentStatus;
    operatorId: string;
    dockId: string;
}
