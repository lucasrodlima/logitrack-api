import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { ListDocksUseCase } from "./list-docs";

let docksRepo: InMemoryDocksRepository;
let sut: ListDocksUseCase;

describe("List Docks Use Case", () => {
    beforeEach(() => {
        docksRepo = new InMemoryDocksRepository();
        sut = new ListDocksUseCase(docksRepo);
    });

    it('should be able to list all docks', async () => {
        await docksRepo.create({ code: 'DOCA-01' });
        await docksRepo.create({ code: 'DOCA-02' });

        const { docks } = await sut.execute();

        expect(docks).toHaveLength(2);
        expect(docks).toEqual([
            expect.objectContaining({ code: 'DOCA-01' }),
            expect.objectContaining({ code: 'DOCA-02' }),
        ]);
    });
});
