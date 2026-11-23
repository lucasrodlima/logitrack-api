import { Dock, DockCreateInput, DockStatus } from "../entities/dock";

export interface DocksRepository {
    findById(id: string): Promise<Dock | null>;
    findByCode(code: string): Promise<Dock | null>
    findMany(): Promise<Dock[]>;
    create(data: DockCreateInput): Promise<Dock>;
    updateStatus(id: string, status: DockStatus): Promise<Dock>;
}
