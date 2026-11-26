import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { FetchParamsUseCase } from "../fetch-shipments";

export function makeFetchShipmentsUseCase(): FetchParamsUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const fetchShipmentsUseCase = new FetchParamsUseCase(shipmentsRepo);

    return fetchShipmentsUseCase;
}
