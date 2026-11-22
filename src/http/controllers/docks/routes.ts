import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { list } from "./list";
import { create } from "./create";

export async function docksRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.get('/docks', list);
    app.post('/docks', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
