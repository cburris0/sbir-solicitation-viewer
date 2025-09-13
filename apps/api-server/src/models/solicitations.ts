import { SolicitationSelect } from "@repo/database";
import { solicitationsRouter } from "router/solicitations";
import { z } from "zod";

// TODO: Add pagination
export const SolicitationsQueryParams = z.object({

});

// how to handle responses in trpc
// export const SolicitationsResponse = z.object({
//     solicitations: z.array(SolicitationSelect)
// })

export type SolicitationsQueryParams = z.infer<typeof SolicitationsQueryParams>;
export type SolicitationsRes = Awaited<ReturnType<typeof solicitationsRouter.listSolicitations>>;

export const SolicitationRequestParams = z.object({
    id: z.string()
});

export type SolicitationRequestParams = z.infer<typeof SolicitationRequestParams>;
export type SolicitationRes = Awaited<ReturnType<typeof solicitationsRouter.getSolicitation>>;

export type LoadSolicitationRes = Awaited<ReturnType<typeof solicitationsRouter.loadSolicitations>>;