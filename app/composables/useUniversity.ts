import OutgoingStudent from '~~/models/OutgoingStudent';
import Student from "~~/models/Student";
import University from "~~/models/University";

export function useUniversity() {
    const client = useSupabaseClient();
    const{getProfileById} = useProfile()
    const{removeFromWaitlist} = useUser()

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

            if(await addStudentToUni(uniName)){
                await placeStudent(await getWaitingStudentIdsByUniversity(uniName), uniName)
            }
            
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

    async function addStudentToUni(name: string): Promise<boolean>{

        var composite = await getCurrentStudentNumberAndQuota(name)
        var q = composite?.student_number
        var quota = composite?.quota
        console.log("q is: ", q, "quota is: ", quota)
        if(q!= undefined && quota!= undefined){
            //console.log("q is ", q)
            if(q < quota){
                const uni = {
                    currentStudentNumber: q+1,
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
            } else{
                console.log("Student capacity is full")
            }
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
            .eq("uni_name", name);
        if (error) {
            console.error("Error getting current student number: ", error);
        }
        return data as unknown as number[];
    }

    async function placeStudent(ids:number[], u:string): Promise<boolean>{
        console.log("PLACE STUDENT", ids)
        var stds:Student[] = [];
        for(var ind = 0; ind< ids.length; ind++){
            const { data, error } = await client
            .from('OutgoingStudent')
            .select()
            .eq("bilkent_id", ids[ind].student_id)
            console.log("id: ", data, "type: ", typeof ids[ind])
            stds.push(await getProfileById(ids[ind].student_id, "OutgoingStudent") as OutgoingStudent)
        }

        var cgpa = 0;
        var indexBiggest = 0;
        for(var i = 0; i < stds.length; i++){
            if(stds[i].getCgpa() > cgpa){
                cgpa = stds[i].getCgpa()
                indexBiggest = i
            }
        }

        const student = {
            isPlaced : true,
            placed_university : u
        };

        const { error} = await client
            .from("OutgoingStudent")
            .update(student as never)
            .eq('bilkent_id', stds[indexBiggest].getId());
        console.log("remove from : ", await removeFromWaitlist(stds[indexBiggest].getId()))
        return true
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
    return {getUniversities, sendToWaitlist, getUniversitiesWaitlist, updateQuota, placeStudent, addStudentToUni,
         getUniversityNameById, getCurrentStudentNumberAndQuota, getWaitingStudentIdsByUniversity};
}
