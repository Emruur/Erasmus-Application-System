export default class Question {
    //data members
    private question: string
    private answer: string
    private publishedDate: Date
    private id: number

    //constructor
    constructor(question: string, answer: string, publishedDate: Date, id: number) {
        this.question = question
        this.answer = answer
        this.publishedDate = publishedDate
        this.id = id
    }

    //methods
    public getQuestion(): string {
        return this.question;
    }

    public setQuestion(question: string): void {
        this.question = question;
    }

    public getAnswer(): string {
        return this.answer;
    }

    public setAnswer(answer: string): void {
        this.answer = answer;
    }

    public getPublishedDate(): Date {
        return this.publishedDate;
    }

    public setPublishedDate(publishedDate: Date): void {
        this.publishedDate = publishedDate;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public static instantiate(q:any): Question{
        return new Question(q.question, q.answer, new Date(q.created_at), q.id);
    }
}