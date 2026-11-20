import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userID: string,
}

interface GetUserProfileUseCaseResponse {
    user: User,
}

export class GetUserProfileUseCase {
    constructor(private usersRepo: UsersRepository) { }

    async execute({
        userID,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepo.findByID(userID);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
