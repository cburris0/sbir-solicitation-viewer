import { SolicitationSelect } from "@repo/database";
import { ISolicitationTopic } from "./ISolicitationTopic";

export enum CurrentStatus
{
    Open = "open",
    Closed = "closed",
    Future = "future"
}

export enum Program 
{
    SBIR = "SBIR",
    STTR = "STTR",
    Both = "BOTH"
}

export enum Phase
{
    PhaseI = "Phase I",
    PhaseII = "Phase II",
    Both = "BOTH"
}

export interface ISolicitationData extends Omit<SolicitationSelect, "id">
{
    solicitationNumber: string | null;
    solicitationId: number | null;
    solicitationTitle: string;
    program: "SBIR" | "STTR" | "BOTH";
    phase: "Phase I" | "Phase II"| "BOTH";
    agency: string;
    branch: string | null;
    solicitationYear: number; 
    releaseDate: string; // Format: YYYY-MM-DD (ISO) - input MM/DD/YYYY gets converted
    openDate: string; 
    closeDate: string; 
    applicationDueDate: string[] | null;
    occurrenceNumber: string | null;
    solicitationAgencyUrl: string;
    currentStatus: "open" | "closed" | "future" | null;
    solicitationTopics: ISolicitationTopic[]
}

export interface ISolicitation extends ISolicitationData
{
    id: string;
}