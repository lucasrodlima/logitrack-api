import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { RegisterUserUseCase } from "./register-user.js";
import { HasherBcrypt } from "../cryptography/hasher-bcrypt.js";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;
const hasher = new HasherBcrypt()

describe("Register User Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUserUseCase(usersRepository, hasher);
    });

    it("should be able to register a new user", async () => {
        const { user } = await sut.execute({
            name: "Suzuna Tzuzuhi",
            email: "tzuzuhi@gmail.com",
            password: "password123",
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.role).toEqual("OPERATOR");
    });

    it("should hash user password upon registration", async () => {
        const password = "password123";

        const { user } = await sut.execute({
            name: "Suzuna Tzuzuhi",
            email: "tzuzuhi@gmail.com",
            password,
        });

        const isPasswordCorrectlyHashed = await hasher.compare(
            password,
            user.passwordHash,
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("should not be able to register with same email twice", async () => {
        const email = "tzuzuhi@gmail.com";
        const name = "Suzuna Tzuzuhi";
        const password = "password123";

        await sut.execute({
            name,
            email,
            password,
        });

        await expect(
            sut.execute({
                name,
                email,
                password,
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
