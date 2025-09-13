import { solicitation } from "@repo/database";
import { getSolicitation, listAllSolicitations, loadSolicitations } from "controllers/SolicitationController";
import { SolicitationRequestParams, SolicitationsQueryParams, SolicitationsRes } from "models/solicitations";
import { createTRPCRouter, procedure } from "trpc";
import { z } from "zod";

export const solicitationsRouter = createTRPCRouter({
    getSolicitation: procedure.input(SolicitationRequestParams).query(async ({ input }) => { await getSolicitation(input) }),
    listSolicitations: procedure.input(SolicitationsQueryParams).query(async ({ input }) => { await listAllSolicitations(input) }),
    loadSolicitations: procedure.query(async () => await loadSolicitations())
});
