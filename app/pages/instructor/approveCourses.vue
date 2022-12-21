<script setup lang="ts">
import { LinkType , Dropdown } from "ui-types/types"
import { Ref } from "vue";
import Course from "~/models/Course"

 
const client = useSupabaseClient()
const pendingCourses:Ref<Course[]>= ref([])
const {getPendingCoursesForInstructor}= useCourses()
const user= useSupabaseUser()

const fetching= ref(false)

onMounted(()=>{
    fetchPending()
})

async function fetchPending(){
    fetching.value= true
    let bilkentId= user.value?.user_metadata.userId
    if(!bilkentId){
        
        let auth = (await client.auth.getUser()).data.user
        bilkentId= auth?.user_metadata.userId
        console.log("Usesupabase user failed",bilkentId)
    }
        
    console.log("BİLKENT ID:",bilkentId)
    pendingCourses.value= await getPendingCoursesForInstructor(bilkentId)
    fetching.value= false
}

</script>

<template>
    <NavbarInstructor active="Approve Courses"/>
    <div class="">
        <h3 class="p-2 bg-secondary text-light text-center">Approve course requests</h3>
        <CourseApprovalCard v-for="c in pendingCourses" :course="c" class="mt-1 p-2" @refresh="fetchPending" v-if="!fetching"/>
        <UtilSpinner v-else/>
    </div>
</template>