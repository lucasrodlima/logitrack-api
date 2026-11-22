import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { ListDocksUseCase } from "../list-docs";

export function makeListDocksUseCase(): ListDocksUseCase {
    const usersRepository = new PrismaDocksRepository;
    const listDocksUseCase = new ListDocksUseCase(usersRepository);

    return listDocksUseCase;
}
