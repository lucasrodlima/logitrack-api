import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { HasherBcrypt } from "../cryptography/hasher-bcrypt";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credential-errors";

let usersRepo: InMemoryUsersRepository;
const hasher = new HasherBcrypt;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepo = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepo, hasher);
    });

    it("should be able to authenticate w/ valid credentials.", async () => {
        const email = "tzuzuhi@gmail.com";
        const password = "password123";

        await usersRepo.create({
            name: "Suzuna Tzuzuhi",
            email,
            passwordHash: await hasher.hash(password),
        });

        const { user } = await sut.execute({
            email,
            password
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate w/ wrong credentials.", async () => {
        await expect(
            sut.execute({
                email: "tzuzuhi@gmail.com",
                password: "password123",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenctica w/ wrong password", async () => {
        const email = "tzuzuhi@gmail.com";

        await usersRepo.create({
            name: "Suzuna Tzuzuhi",
            email,
            passwordHash: await hasher.hash("password123"),
        });

        await expect(
            sut.execute({
                email,
                password: "wrong_password",

            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })
})
