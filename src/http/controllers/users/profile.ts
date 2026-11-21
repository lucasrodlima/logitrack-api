import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function profile(req: FastifyRequest, rep: FastifyReply) {
    try {
        const getUserProfile = makeGetUserProfileUseCase();

        const { user } = await getUserProfile.execute({
            userID: req.user.sub,
        });

        const { passwordHash: _passwordHash, ...userWithoutPassword } = user;

        return rep.status(200).send({
            user: userWithoutPassword,
        });

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }

        throw err;
    }
}
