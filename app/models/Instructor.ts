import Course from "./Course";
import User from "./User";

export default class Instructor extends User{
    //data members
    private taughtCourses?: Course[];

    //constructor
    constructor(
        name: string,
        surname: string,
        email: string,
        phone: number,
        id: number,
        role: string
    ) {
        super(name, surname, email, phone, id, role); 
    }

    //methods
    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public getTaughtCourses(): Course[] {
        return this.taughtCourses!;
    }

    public setTaughtCourses(taughtCourses: Course[]): void {
        this.taughtCourses = taughtCourses;
    }

    static instantiate(user:any): Instructor{
        return new Instructor(user.name, user.surname, user.email, user.phone, user.bilkent_id, "Instructor");
    }

    static instantiateArray(users: any[]): Instructor[]{
        let instructors= []

        for(let u of users ){
            instructors.push(new Instructor(
                u.name,
                u.surname,
                u.email,
                u.mail,
                u.bilkent_id,
                "Instructor"
            ))
        }

        return instructors
    }
}