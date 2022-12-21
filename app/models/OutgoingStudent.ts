import Student from "./Student";

export default class OutgoingStudent extends Student{
    //data members
    private isPlaced: boolean
    private laDocumentId: number
    private hasSubmittedPa: boolean
    private preApprovalFormId: number
    private isPlacementRejected: boolean
    private preferredUniversities: String[]
    private authId: string

    //constructor
    constructor(name:string, surname:string, email:string, id:number, isPlaced:boolean, phone: number, placed_university: string, 
        university: string, cgpa: number, learning_agreement: number, hasSubmittedLa: boolean, laDocumentId: number, hasSubmittedPa: boolean,
        preApprovalFormId: number, isPlacementRejected: boolean, preferredUniversities: String[], role: string, authId: string) {
        super(name, surname,  email, phone, id, university, placed_university, cgpa, learning_agreement, hasSubmittedLa, role)
        this.isPlaced = isPlaced
        this.laDocumentId = laDocumentId
        this.hasSubmittedPa = hasSubmittedPa
        this.preApprovalFormId = preApprovalFormId
        this.isPlacementRejected = isPlacementRejected
        this.preferredUniversities = preferredUniversities
        this.authId= authId
    }

    //methods
    updateDatabase(): boolean {
        throw new Error("Method not implemented.");
    }

    public getAuthId(){
        return this.authId;
    }

    public isIsPlaced(): boolean {
        return this.isPlaced;
    }

    public setIsPlaced(isPlaced: boolean): void {
        this.isPlaced = isPlaced;
    }

    public getLaDocumentId(): number {
        return this.laDocumentId;
    }

    public setLaDocumentId(laDocumentId: number): void {
        this.laDocumentId = laDocumentId;
    }

    public isHasSubmittedPa(): boolean {
        return this.hasSubmittedPa;
    }

    public setHasSubmittedPa(hasSubmittedPa: boolean): void {
        this.hasSubmittedPa = hasSubmittedPa;
    }

    public getPreApprovalFormId(): number {
        return this.preApprovalFormId;
    }

    public setPreApprovalFormId(preApprovalFormId: number): void {
        this.preApprovalFormId = preApprovalFormId;
    }

    public isIsPlacementRejected(): boolean {
        return this.isPlacementRejected;
    }

    public setIsPlacementRejected(isPlacementRejected: boolean): void {
        this.isPlacementRejected = isPlacementRejected;
    }

    public getPreferredUniversities(): String[] {
        return this.preferredUniversities;
    }

    public setPreferredUniversities(preferredUniversities: String[]): void {
        this.preferredUniversities = preferredUniversities;
    }

    static instantiate(user:any): OutgoingStudent{
        let unis: String[] = [user.preferedUniversity1, user.preferedUniversity2, user.preferedUniversity3, user.preferedUniversity4,
            user.preferedUniversity5]
        return new OutgoingStudent(user.name, user.surname, user.email, user.bilkent_id, user.isPlaced, user.phone, user.placed_university,
            user.university, user.cgpa, user.learning_agreement, user.hasSubmittedLa, user.laDocumentId, user.hasSubmittedPa,
            user.preApprovalFormId, user.isPlacementRejected, unis, "OutgoingStudent",user.authId);
    }
}
