import * as data from "data/sbir-resp.json";
import { createNewSolicitation, createNewSolicitationTopic, createNewSubtopic, getSolicitationById, listSolicitations } from "services/SolicitationService";
import { SolicitationInsert, SolicitationTopicInsert, SubtopicInsert } from "@repo/database";
import { GetSolicitationResponse, ListAllSolicitationsResponse, SolicitationRequestParams, SolicitationsQueryParams } from "models/solicitations";
import { TRPCError } from "@trpc/server";
import { logger } from "../lib/logger";

export async function listAllSolicitations(query: SolicitationsQueryParams | undefined): Promise<ListAllSolicitationsResponse>
{
    try
    {
        logger.info("Fetching list of solicitations");
        const solicitations = await listSolicitations(query);
        return ListAllSolicitationsResponse.parse(solicitations);
    }
    catch (err)
    {
        logger.error(`Error fetching solicitations: ${err}`);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch solicitations"
        });
    }
}

export async function getSolicitation(req: SolicitationRequestParams): Promise<GetSolicitationResponse>
{
    logger.info("Fetching solicitation by id");
    const solicitation = await getSolicitationById(req.id);
    if (!solicitation)
    {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Solicitation not found"
        });
    }
    
    return GetSolicitationResponse.parse(solicitation)
}

export async function loadSolicitations(): Promise<void>
{
    try
    {
        logger.info("Loading solicitation data...");
        const res = data;

        for (const rawSolicitation of res)
        {
            logger.info(`Attempting to create solicitation ${rawSolicitation.solicitation_id}...`);
            const solicitation = transformSolicitationData(rawSolicitation);
            const newSolicitation = await createNewSolicitation(solicitation);
            if (newSolicitation)
            {
                for (const rawSolicitationTopic of rawSolicitation.solicitation_topics)
                {
                    const solicitationTopic = transformSolicitationTopicData(rawSolicitationTopic, newSolicitation.id);
                    await createNewSolicitationTopic(solicitationTopic);
    
                    const validSubtopics = rawSolicitationTopic.subtopics.filter(subtopic => 
                        subtopic && Object.keys(subtopic).length > 0
                    );
    
                    if (validSubtopics.length > 0)
                    {
                        for (const rawSubtopic of rawSolicitationTopic.subtopics)
                        {
                            const subtopic = transformSubtopicData(rawSubtopic, solicitationTopic.topicNumber);
                            await createNewSubtopic(subtopic);
                        }
                    }
                }
            }

        }
    }
    catch (err)
    {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error loading solicitations",
            cause: err
        });
    }

    function transformSolicitationData(rawData: any): SolicitationInsert
    {
        return {
            solicitationId: rawData.solicitation_id,
            solicitationTitle: rawData.solicitation_title,
            solicitationNumber: rawData.solicitation_number,
            program: rawData.program,
            phase: rawData.phase,
            agency: rawData.agency,
            branch: rawData.branch,
            solicitationYear: rawData.solicitation_year,
            releaseDate: rawData.release_date,
            openDate: rawData.open_date,
            closeDate: rawData.close_date,

            // Respect application due date as a string or as an array, to account for old data vs data dictionary mismatch
            applicationDueDate: rawData.application_due_date ?
                (Array.isArray(rawData.application_due_date) ?
                    rawData.application_due_date :
                    [rawData.application_due_date]) :
                null,
            occurrenceNumber: rawData.occurrence_number,
            solicitationAgencyUrl: rawData.solicitation_agency_url,
            currentStatus: rawData.current_status
        }
    }

    function transformSolicitationTopicData(rawTopic: any, solicitationId: string): SolicitationTopicInsert
    {
        return {
            topicNumber: rawTopic.topic_number,
            solicitationId: solicitationId,
            topicTitle: rawTopic.topic_title,
            branch: rawTopic.branch,
            topicOpenDate: rawTopic.topic_open_date,
            topicClosedDate: rawTopic.topic_closed_date,
            topicDescription: rawTopic.topic_description,
            sbirTopicLink: rawTopic.sbir_topic_link
        };
    }

    function transformSubtopicData(rawSubtopic: any, topicNumber: string): SubtopicInsert
    {
        return {
            solicitationTopicId: topicNumber,
            subtopicTitle: rawSubtopic.subtopic_title,
            branch: rawSubtopic.branch,
            subtopicNumber: rawSubtopic.subtopic_number,
            subtopicDescription: rawSubtopic.subtopic_description,
            sbirSubtopicLink: rawSubtopic.sbir_subtopic_link
        };
    }
}