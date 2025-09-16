import db, { and, eq, solicitation, SolicitationInsert, SolicitationSelect, solicitationTopic, SolicitationTopicInsert, subtopic, SubtopicInsert } from "@repo/database";
import { ISolicitation } from "interfaces/ISolicitation";
import { logger } from "lib/logger";
import { SolicitationsQueryParams } from "models/solicitations";
import { PostgresError } from "postgres";

export async function createNewSolicitation(solicitationData: SolicitationInsert): Promise<SolicitationSelect | null> 
{
	try
	{
		const [newSolicitation] = await db.insert(solicitation).values(solicitationData).returning();
		return newSolicitation;
	} 
	catch (error)
	{
		if (error instanceof PostgresError && error.code === "23505") 
		{
			logger.warn(`Duplicate solicitation detected: ${solicitationData.solicitationId}`);
			return null;
		}
		logger.error(`Error creating new solicitation: ${error}`);
		throw error;
	}
}

export async function createNewSolicitationTopic(solicitationTopicData: SolicitationTopicInsert): Promise<void> 
{
	try 
	{
		const existingSolicitationTopic = await db
			.select()
			.from(solicitationTopic)
			.where(eq(solicitationTopic.topicNumber, solicitationTopicData.topicNumber));

		if (existingSolicitationTopic.length > 0) 
		{
			logger.warn(`Solicitation topic ${solicitationTopicData.solicitationId} already exists`);
			return;
		}

		await db.insert(solicitationTopic).values(solicitationTopicData);
	} 
	catch (error) 
	{
		logger.error(`Error creating new solicitation topic: ${error}`);
		throw error;
	}
}

export async function createNewSubtopic(subtopicData: SubtopicInsert): Promise<void> 
{
	try 
	{
		const existingSubtopic = await db
			.select()
			.from(subtopic)
			.where(eq(subtopic.solicitationTopicId, subtopicData.solicitationTopicId!)); // do I really want to ! here?

		if (existingSubtopic.length > 0) 
		{
			logger.warn(`Subtopic ${subtopic.solicitationTopicId} already exists`);
			return;
		}

		await db.insert(subtopic).values(subtopicData);
	} 
	catch (error) 
	{
		logger.error(`Error creating new subtopic: ${error}`);
		throw error;
	}
}

export async function listSolicitations(query?: SolicitationsQueryParams): Promise<ISolicitation[]> 
{
	try 
	{
		const conditions = [];

		if (query?.program) conditions.push(eq(solicitation.program, query.program));

		if (query?.solicitationId) conditions.push(eq(solicitation.solicitationId, query.solicitationId));

		if (query?.solicitationNumber) conditions.push(eq(solicitation.solicitationNumber, query.solicitationNumber));

		const solicitations = await db.query.solicitation.findMany({
			where: conditions.length ? and(...conditions) : undefined,
			with: {
				solicitationTopics: {
					with: {
						subtopics: true,
					},
				},
			},
		});

		return solicitations;
	} 
	catch (error) 
	{
		logger.error(`Error listing solicitations: ${error}`);
		throw error;
	}
}

export async function getSolicitationById(id: string): Promise<ISolicitation | undefined> 
{
	try 
	{
		const existingSolicitation = await db.query.solicitation.findFirst({
			where: eq(solicitation.id, id),
			with: {
				solicitationTopics: {
					with: {
						subtopics: true,
					},
				},
			},
		});
		return existingSolicitation;
	} 
	catch (error) 
	{
		logger.error(`Error getting solicitation ${id}: ${error}`);
		throw error;
	}
}
