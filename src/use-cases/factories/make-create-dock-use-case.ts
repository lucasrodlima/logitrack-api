import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { CreateDockUseCase } from "../create-dock";

export function makeCreateDockUseCase(): CreateDockUseCase {
    const usersRepository = new PrismaDocksRepository;
    const createDockUseCase = new CreateDockUseCase(usersRepository);

    return createDockUseCase;
}
