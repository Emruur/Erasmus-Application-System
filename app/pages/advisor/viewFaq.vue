<script setup lang="ts">
import { Ref } from "vue";
import FAQ from "~/models/FAQ"
import Question from "~~/models/Question";


    const {getFaqs, insertFaq, deleteFaqById, updateFaq} = useFaq()
    async function fetchFaqs(){
        let data= await getFaqs()
        faq.value = data
        questions.value= data.getQuestions()
    }
    onMounted(async()=>{
        await fetchFaqs()
    })
    
    const faq:Ref<FAQ|undefined>= ref()
    const questions: Ref<Question[]>= ref([])

    async function deleteFaq(id: number) {
        if(faq.value){
            faq.value.removeQuestion(id)
            await deleteFaqById(id)
        }
        await fetchFaqs()
    }
    const q = ref("")
    const a = ref("")

    const currentQ:Ref<Question | undefined> = ref()

    async function saveValue(id:number, q:string, a:string){
        if(faq.value){
            if(q == "" && a == ""){
                faq.value.updateQuestion(id, (currentQ.value)?currentQ.value.getQuestion():"", (currentQ.value)?currentQ.value.getAnswer():"")
            } else if(q == ""){
                faq.value.updateQuestion(id, (currentQ.value)?currentQ.value.getQuestion():"", a)
            } else if(a == ""){
                faq.value.updateQuestion(id, q, (currentQ.value)?currentQ.value.getAnswer():"")
            }else{
                faq.value.updateQuestion(id, q, a)
            }
            await updateFaq(id, q, a)
        }
        await fetchFaqs()
    }
    const qa = ref("")
    const aa = ref("")
    
    function defaultValues(): void{
        q.value = currentQ.value?currentQ.value.getQuestion():'';
        a.value = currentQ.value?currentQ.value.getAnswer():'';
    }

    function resetAddFaq(): void{
        qa.value = '';
        aa.value = '';
    }

    async function addFAQ(qa:string, aa:string){
        if(faq.value){
            if(qa!="" && aa!=""){
                faq.value.addQuestion(new Question(qa, aa, new Date(), 5))
                await insertFaq(qa, aa)
            }
        }
        await fetchFaqs()
    }
</script>

<template>
    <NavbarAdvisor active="FAQ"/>
    <div class="container-sm">
        <h1 class="text-center">FAQ Page</h1>
        <div class="card text-center">
            <div v-for="question in questions" class="card-body">
            <!--For each FAQ, display question, answer, edit, and delete buttons-->
                <h5 class="card-title">{{ question.getQuestion() }}</h5>
                <p class="card-text">{{ question.getAnswer() }}</p>
                <button type="button" class="btn btn-success" @click="()=> {currentQ=question; defaultValues()}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button type="button" class="btn btn-danger"  @click="()=> currentQ=question"  data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                <!--Delete modal/popup for the deletion of an element from the FAQ array-->
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header"> 
                            <h5 class="modal-title" id="exampleModalLabel">DELETE FAQ</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this FAQ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" @click="()=> deleteFaq(currentQ?currentQ.getId():0)" data-bs-dismiss="modal">Delete</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <!--Edit modal/popup for editing an element from the FAQ array-->
                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">EDIT FAQ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <h2> FAQ Question:</h2>
                                    <input v-model="q" style="width:90%">
                                    <br>
                                    <h2> FAQ Answer:</h2>
                                    <input v-model="a" :placeholder="currentQ?currentQ.getAnswer():''" style="width:90%">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" @click="()=> saveValue(currentQ?currentQ.getId():0, q, a)" data-bs-dismiss="modal">Save FAQ</button>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
                
            </div>
            <br>
            <div class="text-center">
                <!--This part is for the addition of a new FAQ to the system. This operation is done by exchange advisors.-->
                <button type="button" class="btn btn-success" @click="()=> resetAddFaq()" text-align:center data-bs-toggle="modal" data-bs-target="#addModal">Add FAQ</button>    
                <!--Add modal/popup for the addition of a new FAQ to the FAQ array-->
                <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">ADD FAQ</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <h2>FAQ Question:</h2>
                                <input v-model="qa" style="width:90%">
                                <br>
                                <h2>FAQ Answer:</h2>
                                <input v-model="aa" style="width:90%">
                                </div>
                            </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" @click="()=> addFAQ(qa, aa)" data-bs-dismiss="modal">Add FAQ</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            <div class="card-footer text-muted">
                Exchange Advisors
            </div>
        </div>

</template>