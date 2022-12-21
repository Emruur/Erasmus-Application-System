import Coordinator from "./Coordinator";
import User from "./User";

export default class ExchangeCoordinator extends Coordinator{
    cancelApplication(studentId: number): void{
        
    }

    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }

    static instantiate(user:any): ExchangeCoordinator{
        return new ExchangeCoordinator(user.name, user.surname, user.email, user.phone, user.bilkent_id, "ExchangeCoordinator");
    }
}