import Department from "./Department";
import Student from "./Student";

export default class University {
    //data members
    private name: string
    private id: number
    private city: string
    private country: string
    private department: Department
    private placedStudents: Student[]
    private waitlist: Student[]
    private quota: number

    //constructor
    constructor(
        name: string,
        id: number,
        city: string,
        country: string,
        department: Department,
        placedStudents: Student[],
        waitlist: Student[],
        quota: number
    ) {
        this.name = name
        this.id = id
        this.city = city
        this.country = country
        this.department = department
        this.placedStudents = placedStudents
        this.waitlist = waitlist
        this.quota = quota
    }

    //methods
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getDepartment(): Department {
        return this.department;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public getPlacedStudents(): Student[] {
        return this.placedStudents;
    }

    public setPlacedStudents(placedStudents: Student[]): void {
        this.placedStudents = placedStudents;
    }

    public getWaitlist(): Student[] {
        return this.waitlist;
    }

    public setWaitlist(waitlist: Student[]): void {
        this.waitlist = waitlist;
    }

    public getQuota(): number {
        return this.quota;
    }

    public setQuota(quota: number): void {
        this.quota = quota;
    }

    static instantiateArray(arr: any[]): University[] {
        let out = [];

        for (let a of arr) {
            out.push(new University(a.name,a.id, a.city, a.country, a.department, [], [], a.quota));
        }

        return out;
    }
}
