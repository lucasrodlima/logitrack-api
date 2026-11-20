import { User, UserCreateInput } from "../../entities/user";
import { prisma } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        return user;
    }

    async create(data: UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    async findByID(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        return user;
    }
}
