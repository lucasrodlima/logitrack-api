import { Role, User } from "@prisma/client";
import bcrypt from "bcryptjs";
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

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
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

    const passwordHash = await bcrypt.hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      role,
    });

    return { user };
  }
}
