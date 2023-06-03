export interface IQuestion {
    question: string;
    answer: string;
    id?: string
}

export interface IStudySet {
    course: string
    questions: IQuestion[]
    title: string
    user: string
    id: string
}