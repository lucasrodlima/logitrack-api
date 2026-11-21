import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
    const usersRepo = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepo);

    return getUserProfileUseCase;
}
