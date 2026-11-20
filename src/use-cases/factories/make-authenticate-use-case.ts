import { HasherBcrypt } from "../../cryptography/hasher-bcrypt";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository;
    const hasher = new HasherBcrypt;
    const authenticateUseCase = new AuthenticateUseCase(usersRepository, hasher);

    return authenticateUseCase;
}
