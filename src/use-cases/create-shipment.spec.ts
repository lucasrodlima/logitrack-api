import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository"
import { CreateShipmentUseCase } from "./create-shipment";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";

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
    })
})
