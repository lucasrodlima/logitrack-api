import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { create } from "./create";

export async function shipmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.post('/shipments', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
