import Question from "./Question"

export default class FAQ {
    //data members
    private questions: Question[]

    //constructor
    constructor(questions: Question[]) {
        this.questions = questions
        //this.questions.sort(this.compare)
    }

    //methods
    public addQuestion(q: Question): boolean {
        let arrLength = this.questions.length
        var len:number = this.questions.push(q)
        //this.questions.sort(this.compare)
        return arrLength < len
    }

    public removeQuestion(id: number) {
        let result = false
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getId() == id) {
                this.questions.splice(i, 1)
                result = true
            }
        }
        //this.questions.sort(this.compare)
        return result
    }

    public getQuestions(): Question[] {
        return this.questions;
    }

    public setQuestions(questions: Question[]): void {
        this.questions = questions;
    }

    public updateQuestion(id:number, q:string, a:string):boolean{
        //this.questions.sort(this.compare)
        for(var i = 0; i < this.questions.length; i++){
            if(this.questions[i].getId() == id){
                this.questions[i].setQuestion(q)
                this.questions[i].setAnswer(a)
                return true;
            }
        }
        return false;
    }

    public compare(a:Question,b:Question){
        if(a.getPublishedDate() > b.getPublishedDate()){
            console.log("kucuk")
            return 1;
        }
        else if ( a.getPublishedDate() < b.getPublishedDate() ){
            console.log("buyuk")
            return -1;
        }
        return 0;
    }
}