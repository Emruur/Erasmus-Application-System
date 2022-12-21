import Assignment from "./Assignment";
import User from "./User";

export default abstract class Coordinator extends User{
    giveAssignment(assignments:Assignment[]): boolean{
        throw new Error("Method not implemented.");
    }
}