import { getSolicitation, listAllSolicitations } from "controllers/SolicitationController";
import { GetSolicitationResponse, ListAllSolicitationsResponse, SolicitationRequestParams, SolicitationsQueryParams } from "models/solicitations";
import { createTRPCRouter, procedure } from "trpc";

export const solicitationsRouter = createTRPCRouter({
	get: procedure
		.input(SolicitationRequestParams)
		.output(GetSolicitationResponse)
		.query(async ({ input }) => {
			return await getSolicitation(input);
		}),
	list: procedure
		.input(SolicitationsQueryParams.optional())
		.output(ListAllSolicitationsResponse)
		.query(async ({ input }) => {
			return await listAllSolicitations(input);
		}),
});
