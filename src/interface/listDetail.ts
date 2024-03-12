export interface IDetailData {
    data: IQuiz
}

export interface IQuiz {
    _id: string;
    subtitle: string;
    startDatetime: string;
    content: IContent[]
}

interface IContent{
    tts: string;
    words: string[],
    answerEn: string
    distractors: string[]
}
