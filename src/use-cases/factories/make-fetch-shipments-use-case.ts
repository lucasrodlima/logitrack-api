import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { FetchShipmentsUseCase } from "../fetch-shipments";

export function makeFetchShipmentsUseCase(): FetchShipmentsUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const fetchShipmentsUseCase = new FetchShipmentsUseCase(shipmentsRepo);

    return fetchShipmentsUseCase;
}
