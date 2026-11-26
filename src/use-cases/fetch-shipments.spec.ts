import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository"
import { FetchShipmentsUseCase } from "./fetch-shipments";

let shipmentsRepo: InMemoryShipmentsRepository;
let sut: FetchShipmentsUseCase;

describe('Fetch Shipments Use Case', () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        sut = new FetchShipmentsUseCase(shipmentsRepo);
    });

    it('should be able to fetch paginated shipments', async () => {
        for (let i = 1; i <= 15; i++) {
            await shipmentsRepo.create({
                trackingCode: `TRACK-${i}`,
                cargoType: "GENERAL",
                driverName: "John Guy",
                licensePlate: "ABC4030",
                origin: "Belém - BR",
                destination: "Hokkaido - JP",
                weightKg: 200,
                status: "IN_TRANSIT",
                operatorId: `operator-${i}`,
                dockId: `dock-${i}`,
            })
        }

        const { shipments } = await sut.execute({
            page: 2,
            perPage: 10,
        });

        expect(shipments).toHaveLength(5);
    });

    it('should be able to filter shipments by cargo type and status', async () => {
        await shipmentsRepo.create({
            trackingCode: "TR1",
            cargoType: "GENERAL",
            driverName: "John Guy",
            licensePlate: "ABC4030",
            origin: "Belém - BR",
            destination: "Hokkaido - JP",
            weightKg: 200,
            operatorId: `operator1`,
            dockId: `dock2`,
        });

        await shipmentsRepo.create({
            trackingCode: "TR2",
            cargoType: "REFRIGERATED",
            driverName: "Sopia",
            licensePlate: "ABC8888",
            origin: "São Paulo - BR",
            destination: "Paris - FR",
            weightKg: 800,
            status: "IN_TRANSIT",
            operatorId: `operator1`,
            dockId: `dock2`,
        });

        const { shipments } = await sut.execute({
            page: 1,
            perPage: 10,
            status: 'IN_TRANSIT',
            cargoType: 'REFRIGERATED',
        });

        expect(shipments).toHaveLength(1);
        expect(shipments[0].cargoType).toEqual('REFRIGERATED');
    });
});
