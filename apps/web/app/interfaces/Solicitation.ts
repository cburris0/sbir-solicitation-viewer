export interface Subtopic
{

}

export interface SolicitationTopic
{
	topicNumber: string,
    solicitationId: number,
    topicTitle: string,
    branch: string | null,
    topicOpenDate: string | null,
    topicClosedDate: string | null,
    topicDescription: string | null,
    sbirTopicLink: string | null,
	subtopics: Subtopic[]
}

export interface Solicitation 
{
	id: number;
	solicitationNumber: string | null; 
	solicitationId: number | null;
	solicitationTitle: string;
	program: "BOTH" | "SBIR" | "STTR";
	phase: "BOTH" | "Phase I" | "Phase II";
	agency: string;
	branch: string | null;   
	solicitationYear: number;
	releaseDate: string;
	openDate: string;
	closeDate: string;
	applicationDueDate: string[] | null;
	occurrenceNumber: string | null;
	solicitationAgencyUrl: string;
	currentStatus: "open" | "closed" | "future" | null;
	solicitationTopics?: SolicitationTopic[];
}