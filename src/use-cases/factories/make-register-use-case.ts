import { HasherBcrypt } from "../../cryptography/hasher-bcrypt";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUserUseCase(): RegisterUserUseCase {
    const usersRepository = new PrismaUsersRepository;
    const hasher = new HasherBcrypt;
    const registerUserUseCase = new RegisterUserUseCase(usersRepository, hasher);

    return registerUserUseCase;
}
