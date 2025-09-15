export interface ISubTopicData
{
    solicitationTopicId: string;
    subtopicTitle: string;
    branch: string | null;
    subtopicNumber: string;
    subtopicDescription: string | null;
    sbirSubtopicLink: string | null;
}

export interface ISubTopic extends ISubTopicData
{
    id: string;
}