import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { Hasher } from "../cryptography/hasher";
import { InvalidCredentialsError } from "./errors/invalid-credential-errors";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {
    private usersRepository: UsersRepository;
    private hasher: Hasher;

    constructor(usersRepository: UsersRepository, hasher: Hasher) {
        this.usersRepository = usersRepository;
        this.hasher = hasher
    }

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await this.hasher.compare(password, user.passwordHash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
