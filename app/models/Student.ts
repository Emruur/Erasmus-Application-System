import User from "./User"

export default abstract class Student extends User {
    //data members
    private university: string
    private placed_university: string
    private cgpa: number
    private learning_agreement: number
    private hasSubmittedLa: boolean

    constructor(
        name: string,
        surname: string,
        email: string,
        phone: number,
        id: number,
        university: string,
        placed_university: string,
        cgpa: number,
        learning_agreement: number,
        hasSubmittedLa: boolean,
        role: string
    ) {
        super(name,
            surname,
            email,
            phone,
            id,
            role) 
        this.university = university
        this.placed_university = placed_university
        this.cgpa = cgpa
        this.learning_agreement = learning_agreement
        this.hasSubmittedLa = hasSubmittedLa
    } 


    public getUniversity(): string {
        return this.university;
    }

    public setUniversity(university: string): void {
        this.university = university;
    }

    public getPlaced_university(): string | null {
        if(this.placed_university)
            return this.placed_university;
        return null
    }

    public setPlaced_university(placed_university: string): void {
        this.placed_university = placed_university;
    }

    public getCgpa(): number {
        return this.cgpa;
    }

    public setCgpa(cgpa: number): void {
        this.cgpa = cgpa;
    }

    public getLearning_agreement(): number {
        return this.learning_agreement;
    }

    public setLearning_agreement(learning_agreement: number): void {
        this.learning_agreement = learning_agreement;
    }

    public isHasSubmittedLa(): boolean {
        return this.hasSubmittedLa;
    }

    public setHasSubmittedLa(hasSubmittedLa: boolean): void {
        this.hasSubmittedLa = hasSubmittedLa;
    }
    //Assignemnts
}

