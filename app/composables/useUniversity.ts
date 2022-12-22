import University from "~~/models/University";

export function useUniversity() {
    const client = useSupabaseClient();

    async function getUniversities(): Promise<University[]> {
        const { data, error } = await client
            .from("University")
            .select()
        if(error)
            console.error("Error fetching universities: ", error)

        return University.instantiateArray(data as University[])
    }

    async function sendToWaitlist(uniId:number, studentId:number, uniName:string): Promise<boolean> {
        if(uniId < 0 || studentId < 0 || uniName==""){
            console.log("Cannot be added, invalid input")
            return false
        }
        const placement = {
            uni_id: uniId,
            student_id: studentId,
            uni_name: uniName
        };
        const { data } = await client
            .from("StudentUniversityJoin")
            .select()
            .eq('student_id', studentId)
            .eq('uni_id', uniId);
        
        if(data?.length == 0){
            const { error } = await client
                .from("StudentUniversityJoin")
                .insert(placement as never)
                .select()
            if(error){
                console.error("Error adding placement: ", error)
                return false
            }
            return true
        }
        console.log("Cannot be added, because the student is already in the waitlist")
        return false
    }

    async function getUniversitiesWaitlist(studentId:number): Promise<string[]> {
        if(studentId < 0 )
            return []
        const { data, error } = await client
            .from("StudentUniversityJoin")
            .select()
            .eq('student_id', studentId)

        var unis:string[] = []
        if(data){
            //var anyArr:[] = []
            console.log(data)
            for(var i of data){
                unis.push(i.uni_name)
            }
        }
        if(error)
            console.error("Error fetching universities: ", error)

        return unis
    }

    async function updateQuota(name: string): Promise<boolean>{

        var q = await getCurrentStudentNumber(name)
        console.log("q is ", q)
        if(q != -1){
            const uni = {
                currentStudentNumber: q-1,
            };
            const { error } = await client
            .from("University")
            .update(uni as never)
            .eq('name', name);

            if(error){
                console.error("Error updating quota: ", error);
                return false;
            }
            return true;
        }
       
        return false;
    }
    
    async function getCurrentStudentNumber(name:string): Promise<number>{
        console.log("NAME: ", name)
        const { data, error } = await client
            .from("University")
            .select()
            .eq("name", name);
        if (error) {
            console.error("Error getting current student number: ", error);
        }
        if(data){
            console.log("DATA", data)
            return data[0].currentStudentNumber
        }
        
        return -1;
    }

    async function getCurrentStudentNumberAndQuota(name:string): Promise<{
       student_number: number
       quota: number 
    } | null>{
        console.log("NAME: ", name)
        const { data, error } = await client
            .from("University")
            .select()
            .eq("name", name);
        if (error) {
            console.error("Error getting current student number: ", error);
        }
        if(data){
            console.log("DATA", data)
            return {student_number: data[0].currentStudentNumber, quota: data[0].quota}
        }
        
        return null;
    }

    async function getWaitingStudentIdsByUniversity(name:string): Promise<number[]>{
        const { data, error } = await client
            .from("StudentUniversityJoin")
            .select("student_id")
            .eq("name", name);
        if (error) {
            console.error("Error getting current student number: ", error);
        }
        return data as unknown as number[];
    }

    async function placeStudent(ids:number[]){
        
    }

    async function getUniversityNameById(id: number): Promise<string>{
        const { data, error } = await client
            .from("University")
            .select("name")
            .eq("id", id)
            .single();

        if(error)
            console.error("Error fetching uni name with id",error)
        if(data)
            return data.name
        return ""
    }
    return {getUniversities, sendToWaitlist, getUniversitiesWaitlist, updateQuota, getUniversityNameById, getCurrentStudentNumberAndQuota, getWaitingStudentIdsByUniversity};
}
