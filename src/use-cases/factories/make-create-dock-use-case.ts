import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { CreateDockUseCase } from "../create-dock";

export function makeCreateDockUseCase(): CreateDockUseCase {
    const docksRepo = new PrismaDocksRepository;
    const createDockUseCase = new CreateDockUseCase(docksRepo);

    return createDockUseCase;
}
