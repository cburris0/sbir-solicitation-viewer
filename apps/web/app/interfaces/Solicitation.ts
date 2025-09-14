export interface SolicitationTopic
{

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