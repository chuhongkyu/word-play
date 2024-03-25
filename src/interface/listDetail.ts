export interface IDetailData {
    data: IQuiz
}

export interface IQuiz {
    _id: string;
    testType: string;
    subtitle: string;
    startDatetime: string;
    content: IContent[]
}

export interface IContent{
    tts: string;
    words: string[],
    answerKr: string
    distractors: string[]
}
