import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { ListShipmentsUseCase } from "../list-shipments";

export function makeListShipmentsUseCase(): ListShipmentsUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const listShipmentsUseCase = new ListShipmentsUseCase(shipmentsRepo);

    return listShipmentsUseCase;
}
