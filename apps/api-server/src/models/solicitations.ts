import { SolicitationSelect, SolicitationTopicSelect, SubtopicSelect } from "@repo/database";
import { solicitationsRouter } from "router/solicitations";
import { z } from "zod";

// TODO: Add pagination
export const SolicitationsQueryParams = z.object({

});

// TODO: Replace this with full zod def for solicitation
export const SolicitationWithRelations = z.object({
    ...SolicitationSelect.shape,
    solicitationTopics: z.array(
    z.object({
        ...SolicitationTopicSelect.shape,
        subtopics: z.array(z.object({
        ...SubtopicSelect.shape
        }))
    })
    )
});

export const SolicitationRequestParams = z.object({
    id: z.number()
});

export const ListAllSolicitationsResponse = z.object({
    solicitations: z.array(SolicitationWithRelations)
})

export const GetSolicitationResponse = SolicitationWithRelations.extend({

});


export type SolicitationWithRelations = z.infer<typeof SolicitationWithRelations>;
export type SolicitationsQueryParams = z.infer<typeof SolicitationsQueryParams>;
export type SolicitationsRes = Awaited<ReturnType<typeof solicitationsRouter.listSolicitations>>;
export type SolicitationRequestParams = z.infer<typeof SolicitationRequestParams>;
export type SolicitationRes = Awaited<ReturnType<typeof solicitationsRouter.getSolicitation>>;
export type LoadSolicitationRes = Awaited<ReturnType<typeof solicitationsRouter.loadSolicitations>>;
export type ListAllSolicitationsResponse = Awaited<z.infer<typeof ListAllSolicitationsResponse>>;
export type GetSolicitationResponse = Awaited<z.infer<typeof GetSolicitationResponse>>;