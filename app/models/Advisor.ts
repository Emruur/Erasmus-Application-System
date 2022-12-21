import FAQ from "./FAQ";
import Question from "./Question";
import User from "./User";

export default class Advisor extends User {

    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }

    
    static instantiate(user:any): Advisor{
        return new Advisor(user.name, user.surname, user.email, user.phone, user.bilkent_id, "Advisor");
    }
}