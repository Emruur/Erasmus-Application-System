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
    
    return { rejectStudent };
}
