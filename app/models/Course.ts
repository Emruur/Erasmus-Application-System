export default class Course {
    //data members
    private id: number
    private hostUniName: string
    private hostCourseCode: string
    private hostCourseName: string
    private creditEcts: number
    private bilkentCode: string
    private bilkentCourseName: string
    private bilkentCredit: number
    private designation: string
    private status: string
    private syllabusId: string
    private ownerId: string
    private hostUniId: number

    //constructor
    constructor(
        id: number,
        hostUniName: string,
        hostCourseCode: string,
        hostCourseName: string,
        creditEcts: number,
        bilkentCode: string,
        bilkentCourseName: string,
        bilkentCredit: number,
        designation: string,
        status: string,
        syllabusId: string,
        ownerId: string,
        hostUniId: number
    ) {
        this.id = id
        this.hostUniName = hostUniName
        this.hostCourseCode = hostCourseCode
        this.hostCourseName = hostCourseName
        this.creditEcts = creditEcts
        this.bilkentCode = bilkentCode
        this.bilkentCourseName = bilkentCourseName
        this.bilkentCredit = bilkentCredit
        this.designation = designation
        this.status = status
        this.syllabusId = syllabusId
        this.ownerId = ownerId
        this.hostUniId= hostUniId
    }

    public getHostUniId(): number{
        return this.hostUniId
    }

    //methods
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getHostUniName(): string {
        return this.hostUniName;
    }

    public setHostUniName(hostUniName: string): void {
        this.hostUniName = hostUniName;
    }

    public getHostCourseCode(): string {
        return this.hostCourseCode;
    }

    public setHostCourseCode(hostCourseCode: string): void {
        this.hostCourseCode = hostCourseCode;
    }

    public getHostCourseName(): string {
        return this.hostCourseName;
    }

    public setHostCourseName(hostCourseName: string): void {
        this.hostCourseName = hostCourseName;
    }

    public getCreditEcts(): number {
        return this.creditEcts;
    }

    public setCreditEcts(creditEcts: number): void {
        this.creditEcts = creditEcts;
    }

    public getBilkentCode(): string {
        return this.bilkentCode;
    }

    public setBilkentCode(bilkentCode: string): void {
        this.bilkentCode = bilkentCode;
    }

    public getBilkentCourseName(): string {
        return this.bilkentCourseName;
    }

    public setBilkentCourseName(bilkentCourseName: string): void {
        this.bilkentCourseName = bilkentCourseName;
    }

    public getBilkentCredit(): number {
        return this.bilkentCredit;
    }

    public setBilkentCredit(bilkentCredit: number): void {
        this.bilkentCredit = bilkentCredit;
    }

    public getDesignation(): string {
        return this.designation;
    }

    public setDesignation(designation: string): void {
        this.designation = designation;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getSyllabusId(): string {
        return this.syllabusId;
    }

    public setSyllabusId(syllabusId: string): void {
        this.syllabusId = syllabusId;
    }

    public getOwnerId(): string {
        return this.ownerId;
    }

    public setOwnerId(ownerId: string): void {
        this.ownerId = ownerId;
    }

    public static instantiate(c:any): Course{
        return new Course(c.id, c.hostUniName, c.hostCourseCode, c.hostCourseName, c.creditEcts, c.bilkentCode, c.bilkentCourseName,
            c.bilkentCredit, c.designation, c.status, c.syllabusId, c.ownerId,c.hostUniId);
    }

    static instantiateArray(data: any[]): Course[]{
        let arr= []

        for(let d of data){
            arr.push(this.instantiate(d))
        }

        return arr
    }
}