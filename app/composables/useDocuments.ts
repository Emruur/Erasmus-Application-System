import Document from "~/models/Document";
import { GrantDocumentRow } from "~~/ui-types/types";
export function useDocument() {
    const client = useSupabaseClient();

    async function insertDocument(ownerId: string, type: string, name: string): Promise<boolean> {
        const doc = {
            fileID: ownerId + "/" + type,
            name: name,
            ownerId: ownerId,
            type: type,
            status: "pending",
        };
        const { data, error } = await client
            .from("Document")
            .insert(doc as never)
            .select();
        if (error) {
            console.error("Error inserting document: ", error);
            return false;
        }

        return true;
    }
    async function updateDocument(
        id: number,
        ownerId: string,
        type: string,
        name: string,
        status: string
    ): Promise<boolean> {
        const doc = {
            fileID: ownerId + "/" + type,
            name: name,
            ownerId: ownerId,
            type: type,
            status: status,
        };
        const { error } = await client
            .from("Document")
            .update(doc as never)
            .eq("id", id);
        if (error) {
            console.error("Error updating document: ", error);
            return false;
        }

        return true;
    }

    async function getDocumentsByOwnerAndType(ownerId: string, type: string): Promise<Document[]> {
        const { data, error } = await client
            .from("Document")
            .select()
            .eq("ownerId", ownerId)
            .eq("type", type);
        if (error) {
            console.error("Error getting document with type and owener: ", error);
        }
        console.log("Data: ", data);
        let documents = Document.instantiateDocumentArray(data as unknown as Document[]);
        return documents;
    }
    async function getPendingDocumentsByType(type: string): Promise<Document[]> {
        const { data, error } = await client
            .from("Document")
            .select()
            .eq("status", "pending")
            .eq("type", type);
        if (error) {
            console.error("Error getting document with type: ", error);
        }
        console.log("Data: ", data);
        let documents = Document.instantiateDocumentArray(data as unknown as Document[]);
        return documents;
    }

    async function getGrantDocuments(): Promise<GrantDocumentRow[]> {
        const studentMap: Map<string, Set<string>> = new Map();

        const { data, error } = await client
            .from("Document")
            .select()
            .in('type', ['hs-la','ha-l','id','ea-i','ega-s'])

        if (error) {
            console.error("Error fetching grant documents: ", error);
        }
        console.log("FETCHED: ",data)

        let documents = Document.instantiateDocumentArray(data as unknown as Document[]);
        for (let doc of documents) {
            //check if user object is created
            if (!studentMap.has(doc.getOwnerId())) {
                let newDocSet: Set<string> = new Set();
                newDocSet.add(doc.getType());
                studentMap.set(doc.getOwnerId(), newDocSet);
            } else {
                let userObj = studentMap.get(doc.getOwnerId());
                if (userObj) {
                    userObj.add(doc.getType());
                    studentMap.set(doc.getOwnerId(), userObj);
                }
            }
        }
        let outArray:GrantDocumentRow[]= []

        for (let [key, value] of studentMap) {
            outArray.push({
                user_id: key,
                documents: value
            })
        }
        return outArray
    }
    async function getCTEDocuments(): Promise<GrantDocumentRow[]> {
        const studentMap: Map<string, Set<string>> = new Map();

        const { data, error } = await client
            .from("Document")
            .select()
            .in('type', ['tran', 'cte',"cte-s"])

        if (error) {
            console.error("Error fetching grant documents: ", error);
        }
        console.log("FETCHED: ",data)

        let documents = Document.instantiateDocumentArray(data as unknown as Document[]);
        for (let doc of documents) {
            //check if user object is created
            if (!studentMap.has(doc.getOwnerId())) {
                let newDocSet: Set<string> = new Set();
                newDocSet.add(doc.getType());
                studentMap.set(doc.getOwnerId(), newDocSet);
            } else {
                let userObj = studentMap.get(doc.getOwnerId());
                if (userObj) {
                    userObj.add(doc.getType());
                    studentMap.set(doc.getOwnerId(), userObj);
                }
            }
        }
        let outArray:GrantDocumentRow[]= []

        for (let [key, value] of studentMap) {
            if(!value.has("cte-s")){
                outArray.push({
                user_id: key,
                documents: value
            }) 
            }
            
        }
        return outArray
    }
    return {
        insertDocument,
        getDocumentsByOwnerAndType,
        updateDocument,
        getPendingDocumentsByType,
        getGrantDocuments,
        getCTEDocuments
    };
}
