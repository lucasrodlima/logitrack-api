import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository"
import { CreateShipmentUseCase } from "./create-shipment";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ShipmentAlreadyExistsError } from "./errors/shipment-already-exists";
import { DockUnavailableError } from "./errors/dock-unavailable-error";

let shipmentsRepo: InMemoryShipmentsRepository;
let docksRepo: InMemoryDocksRepository;
let usersRepo: InMemoryUsersRepository;
let sut: CreateShipmentUseCase;

describe("Create Shipment Use Case", () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        docksRepo = new InMemoryDocksRepository();
        usersRepo = new InMemoryUsersRepository();
        sut = new CreateShipmentUseCase(shipmentsRepo, docksRepo);
    });

    it("should be able to create a new shipment", async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const { shipment } = await sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        });

        expect(shipment.id).toEqual(expect.any(String));
        expect(shipment.status).toEqual("PENDING");
        expect(shipment.cargoType).toEqual("GENERAL");

        expect(dock.status).toEqual('OCCUPIED');
    })


    it('should not be able to create shipment w/ existent code', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock1 = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const dock2 = await docksRepo.create({
            code: 'DOCA-02',
            description: 'Doca secundária de carga seca',
        });

        await sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock1.id,
            operatorId: user.id,
        });

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Pekora",
            licensePlate: "ABH7696",
            origin: "New York",
            destination: "Dallas",
            weightKg: 132,
            dockId: dock2.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(ShipmentAlreadyExistsError);
    });

    it('should not be able to create shipment w/ occupied dock', async () => {
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

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(DockUnavailableError);
    })

    it('should not be able to create shipment w/ in-maintenance dock', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
            status: 'MAINTENANCE',
        });

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(DockUnavailableError);
    })
});
