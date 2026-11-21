export type DockStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface Dock {
    id: string,
    code: string,
    description: string | null,
    status: DockStatus,
    createdAt: Date,
}

export interface DockCreateInput {
    code: string;
    description?: string | null,
    status?: DockStatus;
}
