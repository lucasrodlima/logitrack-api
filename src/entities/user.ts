export type Role = 'ADMIN' | 'OPERATOR'

export interface User {
    id: string
    name: string
    email: string
    passwordHash: string
    role: Role
    createdAt: Date
}

export interface UserCreateInput {
    name: string
    email: string
    passwordHash: string
    role?: Role
}
