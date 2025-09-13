import { getSolicitation, listAllSolicitations, loadSolicitations } from "controllers/SolicitationController";
import { GetSolicitationResponse, ListAllSolicitationsResponse, SolicitationRequestParams, SolicitationsQueryParams } from "models/solicitations";
import { createTRPCRouter, procedure } from "trpc";

export const solicitationsRouter = createTRPCRouter({
    getSolicitation: procedure.input(SolicitationRequestParams).output(GetSolicitationResponse).query(async ({ input }) => { return await getSolicitation(input) }),
    listSolicitations: procedure.input(SolicitationsQueryParams.optional()).output(ListAllSolicitationsResponse).query(async ({ input }) => { return await listAllSolicitations(input) }),
    loadSolicitations: procedure.query(async () => await loadSolicitations())
});
