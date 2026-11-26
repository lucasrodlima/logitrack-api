import { Shipment, ShipmentCreateInput } from "../../entities/shipment";
import { prisma } from "../../lib/prisma";
import { FetchShipmentsParams, ShipmentsRepository } from "../shipments-repository";

export class PrismaShipmentsRepository implements ShipmentsRepository {

    async findById(id: string): Promise<Shipment | null> {
        return await prisma.shipment.findUnique({ where: { id } });
    }

    async findByTrackingCode(trackingCode: string): Promise<Shipment | null> {
        return await prisma.shipment.findUnique({ where: { trackingCode } });
    }

    async findMany({ page, perPage, status, cargoType }: FetchShipmentsParams): Promise<Shipment[]> {
        return await prisma.shipment.findMany({
            where: {
                ...(status && { status }),
                ...(cargoType && { cargoType }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });
    }

    async create(data: ShipmentCreateInput): Promise<Shipment> {
        return await prisma.shipment.create({ data });
    }

    async save(shipment: Shipment): Promise<Shipment> {
        return await prisma.shipment.update({
            where: { id: shipment.id },
            data: shipment,
        });
    }
}
