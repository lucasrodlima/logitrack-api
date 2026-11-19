import { Hasher } from "./hasher";
import bcrypt from "bcryptjs";

export class HasherBcrypt implements Hasher {
    public async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 6);
        return hashed;
    };

    public async compare(password: string, passwordHash: string): Promise<boolean> {
        const isCorrectlyhashed = bcrypt.compare(password, passwordHash);
        return isCorrectlyhashed;
    }
}
