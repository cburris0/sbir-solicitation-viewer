import { currentStatusEnum, SolicitationSelect, SolicitationTopicSelect, SubtopicSelect } from "@repo/database";
import { CurrentStatus, Phase, Program } from "interfaces/ISolicitation";
import { solicitationsRouter } from "router/solicitations";
import { z } from "zod";

export const CurrentStatusEnum = z.nativeEnum(CurrentStatus);
export const ProgramEnum = z.nativeEnum(Program);
export const PhaseEnum = z.nativeEnum(Phase);

// TODO: Add pagination
export const SolicitationsQueryParams = z.object({

});

export const SolicitationTopic = z.object({
    id: z.string().uuid(),
    topicNumber: z.string().min(1),
    solicitationId: z.string().uuid(),
    topicTitle: z.string().min(1),
    branch: z.string().nullable(),           
    topicOpenDate: z.string().nullable(),    
    topicClosedDate: z.string().nullable(),  
    topicDescription: z.string().nullable(), 
    sbirTopicLink: z.string().url().nullable(), 
});

export const SolicitationWithTopics = z.object({
    id: z.string(),
    solicitationNumber: z.string().nullable(),
    solicitationId: z.number().nullable(),
    solicitationTitle: z.string(),
    program: ProgramEnum,
    phase: PhaseEnum,
    agency: z.string(),
    branch: z.string().nullable(),
    solicitationYear: z.number(),
    releaseDate: z.string(),
    openDate: z.string(),
    closeDate: z.string(),
    applicationDueDate: z.array(z.string()).nullable(),
    occurrenceNumber: z.string().nullable(),
    solicitationAgencyUrl: z.string().nullable(),
    currentStatus: CurrentStatusEnum.nullable(),
    solicitationTopics: z.array(SolicitationTopic)
});

export const SolicitationRequestParams = z.object({
    id: z.string()
});

export const ListAllSolicitationsResponse = z.array(SolicitationWithTopics);

export const GetSolicitationResponse = SolicitationWithTopics.extend({

});

export type SolicitationWithTopics = z.infer<typeof SolicitationWithTopics>;
export type SolicitationsQueryParams = z.infer<typeof SolicitationsQueryParams>;
export type SolicitationsRes = Awaited<ReturnType<typeof solicitationsRouter.listSolicitations>>;
export type SolicitationRequestParams = z.infer<typeof SolicitationRequestParams>;
export type SolicitationRes = Awaited<ReturnType<typeof solicitationsRouter.getSolicitation>>;
export type ListAllSolicitationsResponse = Awaited<z.infer<typeof ListAllSolicitationsResponse>>;
export type GetSolicitationResponse = Awaited<z.infer<typeof GetSolicitationResponse>>;