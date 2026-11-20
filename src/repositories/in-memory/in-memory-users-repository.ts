import { User, UserCreateInput } from "../../entities/user";
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email);
        return user ?? null;
    }

    async create(data: UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role ?? "OPERATOR",
            createdAt: new Date(),
        };

        this.items.push(user);
        return user;
    }

    async findByID(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }
}
