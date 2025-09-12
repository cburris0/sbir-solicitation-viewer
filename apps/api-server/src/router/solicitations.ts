import { getSolicitation, listSolicitations, loadSolicitations } from "controllers/SolicitationController";
import { createTRPCRouter, procedure } from "trpc";
import { z } from "zod";

// TODO: Add pagination
export const SolicitationsQueryParams = z.object({

});

export type SolicitationsQueryParams = z.infer<typeof SolicitationsQueryParams>;
export type SolicitationsRes = Awaited<
    ReturnType<typeof solicitationsRouter.listSolicitations>
>;

export const SolicitationRequestParams = z.object({
    id: z.string()
});

export type SolicitationRequestParams = z.infer<typeof SolicitationRequestParams>;
export type SolicitationRes = Awaited<
    ReturnType<typeof solicitationsRouter.getSolicitation>
>;

export type LoadSolicitationRes = Awaited<
    ReturnType<typeof solicitationsRouter.loadSolicitations>
>;

export const solicitationsRouter = createTRPCRouter({
    getSolicitation: procedure.input(SolicitationRequestParams).query(async ({ input }) => { await getSolicitation(input) }),
    listSolicitations: procedure.input(SolicitationsQueryParams).query(async ({ input }) => { await listSolicitations(input) }),
    loadSolicitations: procedure.query(async () => await loadSolicitations())
});
