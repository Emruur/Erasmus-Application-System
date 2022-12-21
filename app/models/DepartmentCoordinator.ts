import Assignment from "./Assignment";
import Coordinator from "./Coordinator";

export default class DepartmentCoordinator extends Coordinator{
    
    //uploadStudentList??
    static instantiate(user:any): DepartmentCoordinator{
        return new DepartmentCoordinator(user.name, user.surname, user.email, user.phone, user.bilkent_id, "DepartmentCoordinator");
    }

    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }
}