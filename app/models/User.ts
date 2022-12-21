import DBEntityUpdater from "./DBEntityUpdater"

export default abstract class User implements DBEntityUpdater{
    //data members
    private name: string
    private surname: string
    private email: string
    private phone: number
    private id: number
    private role: string

    //constructor
    constructor(
        name: string,
        surname: string,
        email: string,
        phone: number,
        id: number,
        role: string
    ) {
        this.name = name
        this.surname = surname
        this.email = email
        this.phone = phone
        this.id = id
        this.role = role
    }

    //methods
    abstract updateDatabase(): boolean;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public setSurname(surname: string): void {
        this.surname = surname;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPhone(): number {
        return this.phone;
    }

    public setPhone(phone: number): void {
        this.phone = phone;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
    
    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }

    //TASKS
}