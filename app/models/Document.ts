export default class Document {
    //data members
    private id: number;
    private fileID: string;
    private name: string;
    private type: string;
    private ownerId: string;
    private status: string;

    //constructor
    constructor(
        id: number,
        fileID: string,
        name: string,
        type: string,
        ownerId: string,
        status: string
    ) {
        this.id = id;
        this.fileID = fileID;
        this.name = name;
        this.type = type;
        this.ownerId = ownerId;
        this.status = status;
    }

    //methods
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getFileID(): string {
        return this.fileID;
    }

    public setFileID(fileID: string): void {
        this.fileID = fileID;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getOwnerId(): string {
        return this.ownerId;
    }

    public setOwnerId(ownerId: string): void {
        this.ownerId = ownerId;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    static instantiateDocumentArray(objects: Document[]): Document[] {
        let arr: Document[] = [];

        for (let obj of objects) {
            arr.push(new Document(obj.id, obj.fileID, obj.name, obj.type, obj.ownerId, obj.status));
        }

        return arr
    }
}
