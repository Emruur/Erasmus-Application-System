export function useUser() {
    const client = useSupabaseClient();
    
    async function rejectStudent(studentId: number): Promise<boolean>{
        const student = {
            isPlaced : false,
            placed_university : ""
        };

        const { error } = await client
            .from("OutgoingStudent")
            .update(student as never)
            .eq('bilkent_id', studentId);

        if(error){
            console.error("Error rejecting student placement: ", error);
            return false;
        }
        return true;
    }

    async function removeFromWaitlist(id: number): Promise<boolean>{
        const { error } = await client
            .from("StudentUniversityJoin")
            .delete()
            .eq("student_id", id)
        if(error){
            console.error("Error removing user from waitlist: ", error);
            return false;
        }
        return true;
    }
    
    return { rejectStudent, removeFromWaitlist };
}
