import { User, UserCreateInput } from "../entities/user";

export interface UsersRepository {
    findByID(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>;
    create(data: UserCreateInput): Promise<User>;
}
