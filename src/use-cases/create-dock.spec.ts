import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { CreateDockUseCase } from "./create-dock";
import { DockAlreadyExistsError } from "./errors/dock-already-exists-error";

let docksRepo: InMemoryDocksRepository;
let sut: CreateDockUseCase;

describe("Create Dock Use Case", () => {
    beforeEach(() => {
        docksRepo = new InMemoryDocksRepository();
        sut = new CreateDockUseCase(docksRepo);
    });

    it('should be able to create a new dock', async () => {
        const { dock } = await sut.execute({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        })

        expect(dock.id).toEqual(expect.any(String));
        expect(dock.status).toEqual('AVAILABLE');
    });

    it('should not be able to create dock w/ existent code', async () => {
        await sut.execute({
            code: 'DOCA-01',
            description: 'Preexistent dock',
        });

        await expect(sut.execute({
            code: 'DOCA-01',
            description: 'New dock',
        })).rejects.toBeInstanceOf(DockAlreadyExistsError);
    })
})
