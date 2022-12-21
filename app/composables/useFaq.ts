import FAQ from "~~/models/FAQ";
import Question from "~~/models/Question";
export function useFaq() {

    const client = useSupabaseClient();
    //Add FAQ --> Add FAQ:
    async function insertFaq(question: string, answer: string): Promise<boolean> {
        const faq = {
            question: question,
            answer: answer
        };
        const { data, error } = await client
            .from("Faq")
            .insert(faq as never)
            .select();
        if(error){
            console.error("Error inserting FAQ: ", error);
            return false;
        }    
        return true;
    }
    
    async function updateFaq(id:number, question: string, answer: string): Promise<boolean> {
        const faq = {
            question: question,
            answer: answer
        };
        const { error } = await client
            .from("Faq")
            .update(faq as never)
            .eq("id", id);
        if(error){
            console.error("Error updating FAQ: ", error);
            return false;
        }    
        return true;       
    }
    
    async function deleteFaqById(id:number): Promise<boolean> {
        const { error } = await client
            .from("Faq")
            .delete()
            .eq("id", id)
        if(error){
            console.error("Error deleting FAQ: ", error);
            return false;
        }    
        return true;    
    } 

    //Get FAQ:
    async function getFaqs(): Promise<FAQ> {
        const { data, error } = await client
            .from("Faq")
            .select();
        if (error) {
            console.error("Error getting FAQs: ", error);
        }
        if(data){
            var questions:Question[] = [];
            for(var i = 0; i < data?.length; i++){
                questions.push(Question.instantiate(data[i]))
            } 
            return new FAQ(questions);
        }
        
        return data as unknown as FAQ;
    }

    return { insertFaq, getFaqs, deleteFaqById, updateFaq };
}