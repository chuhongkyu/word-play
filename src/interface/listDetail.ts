export interface IDetailData {
    data: IQuiz
}

export interface IQuiz {
    id: number;
    subtitle: string;
    startDatetime: string;
    content: IContent[]
}

interface IContent{
    tts: string;
    words: string[],
    answerKr: string
    distractors: string[]
}
