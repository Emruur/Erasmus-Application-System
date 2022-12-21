import Course from '~~/models/Course';
import DepartmentCoordinator from '~~/models/DepartmentCoordinator';
import IncomingStudent from '~~/models/IncomingStudent';
import OutgoingStudent from '~~/models/OutgoingStudent';
import Advisor from './Advisor';
import Instructor from './Instructor';
import University from './University';

export default class Department {
    //data members
    private name: string
    private id: number
    private outgoingStudents: OutgoingStudent[]
    private incomingStudents: IncomingStudent[]
    private departmentCoordinators: DepartmentCoordinator[]
    private advisors: Advisor[]
    private instructors: Instructor[]
    private takenCourses: Course[]
    private universities: University[]

    //constructor
    constructor(
        name: string,
        id:number,
        outgoingStudents: OutgoingStudent[],
        incomingStudents: IncomingStudent[],
        departmentCoordinators: DepartmentCoordinator[],
        advisors: Advisor[],
        instructors: Instructor[],
        takenCourses: Course[],
        universities: University[]
    ) {
        this.name = name
        this.id = id
        this.outgoingStudents = outgoingStudents
        this.incomingStudents = incomingStudents
        this.departmentCoordinators = departmentCoordinators
        this.advisors = advisors
        this.instructors = instructors
        this.takenCourses = takenCourses
        this.universities = universities
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
    
    public getOutgoingStudents(): OutgoingStudent[] {
        return this.outgoingStudents;
    }

    public setOutgoingStudents(outgoingStudents: OutgoingStudent[]): void {
        this.outgoingStudents = outgoingStudents;
    }

    public getIncomingStudents(): IncomingStudent[] {
        return this.incomingStudents;
    }

    public setIncomingStudents(incomingStudents: IncomingStudent[]): void {
        this.incomingStudents = incomingStudents;
    }

    public getDepartmentCoordinators(): DepartmentCoordinator[] {
        return this.departmentCoordinators;
    }

    public setDepartmentCoordinators(departmentCoordinators: DepartmentCoordinator[]): void {
        this.departmentCoordinators = departmentCoordinators;
    }

    public getAdvisors(): Advisor[] {
        return this.advisors;
    }

    public setAdvisors(advisors: Advisor[]): void {
        this.advisors = advisors;
    }

    public getInstructors(): Instructor[] {
        return this.instructors;
    }

    public setInstructors(instructors: Instructor[]): void {
        this.instructors = instructors;
    }

    public getTakenCourses(): Course[] {
        return this.takenCourses;
    }

    public setTakenCourses(takenCourses: Course[]): void {
        this.takenCourses = takenCourses;
    }

    public getUniversities(): University[] {
        return this.universities;
    }

    public setUniversities(universities: University[]): void {
        this.universities = universities;
    }

}