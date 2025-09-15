import { ISubTopic } from "./ISubTopic";

export interface ISolicitationTopicData
{
    topicNumber: string;
    solicitationId: string;
    topicTitle: string;
    branch: string | null;
    topicOpenDate: string | null;
    topicClosedDate: string | null;
    topicDescription: string | null;
    sbirTopicLink: string | null;
    subtopics: ISubTopic[]
}

export interface ISolicitationTopic extends ISolicitationTopicData
{
    id: string;
}