import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { DispatchShipmentUseCase } from "../dispatch-shipment";

export function makeDispatchShipmentUseCase(): DispatchShipmentUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const docksRepo = new PrismaDocksRepository();
    const dispatchShipmentsUseCase = new DispatchShipmentUseCase(shipmentsRepo, docksRepo);

    return dispatchShipmentsUseCase;
}
