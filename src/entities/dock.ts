export type DockStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface Dock {
    id: String,
    code: String,
    status: DockStatus,
    CreatedAt: Date,
}

export interface DockCreateInput {
    code: String;
    status?: DockStatus;
}
