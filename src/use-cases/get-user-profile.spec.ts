import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { beforeEach, describe, expect, it } from "vitest"

let usersRepo: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
    beforeEach(() => {
        usersRepo = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepo);
    });

    it('should be able to get user profile', async () => {
        const name = 'Achichi Mela';

        const createdUser = await usersRepo.create({
            name,
            email: 'mela@logitrack.com',
            passwordHash: "hashed-password",
        });

        const { user } = await sut.execute({
            userID: createdUser.id,
        });

        expect(user.name).toEqual(name);
    });

    it('should not be able to get user profile w/ wrong id', async () => {
        await expect(
            sut.execute({
                userID: "doesn't exit",
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});



