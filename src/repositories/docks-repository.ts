import { Dock, DockCreateInput } from "../entities/dock";

export interface DocksRepository {
    findById(id: String): Promise<Dock | null>;
    findByCode(code: String): Promise<Dock | null>
    findMany(): Promise<Dock[]>;
    create(data: DockCreateInput): Promise<Dock>;
}
