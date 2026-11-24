import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { CreateShipmentUseCase } from "../create-shipment";

export function makeCreateShipmentUseCase(): CreateShipmentUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const docksRepo = new PrismaDocksRepository();
    const createShipmentsUseCase = new CreateShipmentUseCase(shipmentsRepo, docksRepo);

    return createShipmentsUseCase;
}
