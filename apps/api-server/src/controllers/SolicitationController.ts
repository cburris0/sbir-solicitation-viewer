import * as data from "data/sbir-resp.json";
import { createNewSolicitation, createNewSolicitationTopic, createNewSubtopic, listSolicitations } from "services/SolicitationService";
import { solicitation, SolicitationInsert, SolicitationSelect, SolicitationTopicInsert, subtopic, SubtopicInsert } from "@repo/database";
import { SolicitationRequestParams, SolicitationsQueryParams } from "models/solicitations";

export async function listAllSolicitations(query: SolicitationsQueryParams): Promise<SolicitationSelect[]>
{
    try
    {
        console.log("Fetching list of solicitations");
        const solicitations = await listSolicitations();
        return solicitations;
    }
    catch (err)
    {
        throw err;
    }
}

export async function getSolicitation(req: SolicitationRequestParams): Promise<Object>
{
    // return single solicitation based on id
    console.log("Getting solicitation");
    return {};
}

export async function loadSolicitations(): Promise<string>
{
    try
    {
        console.log("Loading solicitation data...");

        // fetch data from SBIR endpoint
        // const url = new URL(process.env.SBIR_SOLICITATION_ENDPOINT);
        // const response = await fetch(url);
        // console.log(`Response from API: ${response.json()}`);

        // but actually let's get them from the json file
        const res = data;

        for (const rawSolicitation of res)
        {
            console.log(`Inserting ${rawSolicitation.solicitation_id}`);
            const solicitation = transformSolicitationData(rawSolicitation);
            await createNewSolicitation(solicitation);

            for (const rawSolicitationTopic of rawSolicitation.solicitation_topics)
            {
                const solicitationTopic = transformSolicitationTopicData(rawSolicitationTopic, solicitation.solicitationId);
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

        return "200"; // TODO: Replace with an http status package
    }
    catch (err)
    {
        // TODO: Better error responses
        throw err;
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
            applicationDueDate: [rawData.application_due_date],
            occurrenceNumber: rawData.occurrence_number,
            solicitationAgencyUrl: rawData.solicitation_agency_url,
            currentStatus: rawData.current_status
        }
    }

    function transformSolicitationTopicData(rawTopic: any, solicitationId: number): SolicitationTopicInsert 
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