import { Dock, DockStatus } from "../entities/dock";
import { DocksRepository } from "../repositories/docks-repository";
import { DockAlreadyExistsError } from "./errors/dock-already-exists-error";

interface CreateDockUseCaseRequest {
    code: string,
    description?: string | null,
    status?: DockStatus
}

interface CreateDockUseCaseResponse {
    dock: Dock,
}

export class CreateDockUseCase {
    constructor(private docksRepo: DocksRepository) { }

    async execute({
        code,
        description,
        status,
    }: CreateDockUseCaseRequest): Promise<CreateDockUseCaseResponse> {
        const dockWithSameCode = await this.docksRepo.findByCode(code);

        if (dockWithSameCode) {
            throw new DockAlreadyExistsError();
        }

        const dock = await this.docksRepo.create({
            code,
            description,
            status,
        })

        return { dock };
    }
}
