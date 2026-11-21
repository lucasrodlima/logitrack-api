import '@fastify/jwt';
import { Role } from '../entities/user.js';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        payload: {
            role: Role;
        };
        user: {
            sub: string;
            role: Role;
        };
    }
}
