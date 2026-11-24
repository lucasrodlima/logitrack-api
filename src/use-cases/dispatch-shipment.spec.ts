import { describe, it, beforeEach, expect } from "vitest"
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { DispatchShipmentUseCase } from "./dispatch-shipment";
import { ShipmentAlreadyDispatchedError } from "./errors/shipment-already-dispatched";

let shipmentsRepo: InMemoryShipmentsRepository;
let docksRepo: InMemoryDocksRepository;
let usersRepo: InMemoryUsersRepository;
let sut: DispatchShipmentUseCase;

describe('Dispatch Shipment Use Case', () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        docksRepo = new InMemoryDocksRepository();
        usersRepo = new InMemoryUsersRepository();
        sut = new DispatchShipmentUseCase(shipmentsRepo, docksRepo);
    });

    it('should be able to dispatch a shipment correctly', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
            status: 'OCCUPIED',
        });

        const shipment = await shipmentsRepo.create({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        });

        await sut.execute({
            shipmentId: shipment.id,
        })

        expect(shipment.status).toEqual('IN_TRANSIT');
        expect(dock.status).toEqual('AVAILABLE');
    })

    it("It shouldn't be able to dispatch aleady dispatched shipment", async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const shipment = await shipmentsRepo.create({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
            status: "IN_TRANSIT",
        });

        await expect(sut.execute({
            shipmentId: shipment.id
        })).rejects.toBeInstanceOf(ShipmentAlreadyDispatchedError);
    })
})
