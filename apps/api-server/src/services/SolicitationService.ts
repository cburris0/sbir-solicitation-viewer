import db, { eq, solicitation, SolicitationInsert, SolicitationSelect, solicitationTopic, SolicitationTopicInsert, subtopic, SubtopicInsert } from "@repo/database";

export async function createNewSolicitation(solicitationData: SolicitationInsert): Promise<void>
{
    try
    {
        const existingSolicitation = await db.select().from(solicitation).where(eq(solicitation.solicitationId, solicitationData.solicitationId));

        if (existingSolicitation.length > 0)
        {
            console.warn(`Solicitation ${solicitationData.solicitationId} already exists`);
            return;
        }

        console.log(`Creating new solicitation: ${solicitationData.solicitationId}`);
        await db.insert(solicitation).values(solicitationData);
    }
    catch (error)
    {
        console.error(error);
        throw error;
    }
}

export async function createNewSolicitationTopic(solicitationTopicData: SolicitationTopicInsert): Promise<void>
{
    try
    {
        const existingSolicitationTopic = await db.select().from(solicitationTopic).where(eq(solicitationTopic.topicNumber, solicitationTopicData.topicNumber));

        if (existingSolicitationTopic.length > 0)
        {
            console.warn(`Solicitation topic ${solicitationTopicData.solicitationId} already exists`);
            return;
        }

        console.log(`Creating new solicitation topic: ${solicitationTopicData.topicNumber}`);
        await db.insert(solicitationTopic).values(solicitationTopicData);
    }
    catch (error)
    {
        console.error(error);
        throw error;
    }
}

export async function createNewSubtopic(subtopicData: SubtopicInsert): Promise<void>
{
    try
    {
        const existingSubtopic = await db.select().from(subtopic).where(eq(subtopic.solicitationTopicId, subtopicData.solicitationTopicId!)); // do I really want to ! here?

        if (existingSubtopic.length > 0)
        {
            console.warn(`Subtopic ${subtopic.solicitationTopicId} already exists`);
            return;
        }

        console.log(`Creating new subtopic`);
        await db.insert(subtopic).values(subtopicData);
    }
    catch (error)
    {
        console.error(error);
        throw error;
    }
}

export async function listSolicitations(): Promise<SolicitationSelect[]>
{
    try
    {
        // will .select populate the relations?
        const solicitations = await db.select().from(solicitation);
        console.log(solicitations)
        return solicitations;
    }
    catch (error)
    {
        console.error(error);
        throw error;
    }
}