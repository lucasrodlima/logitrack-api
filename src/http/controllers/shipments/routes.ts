import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { create } from "./create";
import { fetch } from "./fetch";
import { dispatch } from "./dispatch";

export async function shipmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.post('/shipments', create);
    app.get('/shipments', fetch);
    app.patch('/shipments/:id/dispatch', dispatch)
}
