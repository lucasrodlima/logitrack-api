import { User, UserCreateInput } from "../entities/user";

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>;
    create(data: UserCreateInput): Promise<User>;
}
