import Student from "./Student";

export default class IncomingStudent extends Student {
    //data members

    //constructor
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
        super(name, surname, email, phone, id, university, placed_university, cgpa, learning_agreement, hasSubmittedLa, role); 
    }
    

    //methods

    updateAll(): boolean {
        throw new Error("Method not implemented.");
    }

    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }
    
    static instantiate(user:any): IncomingStudent{
        return new IncomingStudent(user.name, user.surname, user.email, user.phone, user.bilkent_id, user.university, user.placed_university,
            user.cpga, user.learning_agreement, user.hasSubmittedLa, "IncomingStudent");
    }
}