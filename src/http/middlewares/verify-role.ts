import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../../entities/user";

export function verifyUserRole(roleToVerify: Role) {
    return (req: FastifyRequest, rep: FastifyReply) => {
        const role = req.user.role;

        if (role !== roleToVerify) {
            return rep.status(403).send({ message: 'Forbidden' });
        }
    }
}
