import { User, Role } from "../entities/user";
import { Hasher } from "../cryptography/hasher";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

interface RegisterUserUseCaseResponse {
    user: User;
}

export class RegisterUserUseCase {
    private usersRepository: UsersRepository;
    private hasher: Hasher;

    constructor(usersRepository: UsersRepository, hasher: Hasher) {
        this.usersRepository = usersRepository;
        this.hasher = hasher
    }

    async execute({
        name,
        email,
        password,
        role,
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await this.hasher.hash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash,
            role,
        });

        return { user };
    }
}
