import { Dock } from "../entities/dock";
import { DocksRepository } from "../repositories/docks-repository";

interface ListDocksUseCaseResponse {
    docks: Dock[],
}

export class ListDocksUseCase {
    constructor(private docksRepo: DocksRepository) { }

    async execute(): Promise<ListDocksUseCaseResponse> {
        const docks = await this.docksRepo.findMany();

        return { docks };
    }
}
