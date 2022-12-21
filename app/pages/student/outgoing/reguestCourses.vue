<template> 
<NavbarOutgoing active="Request Courses"/>
  <CourseInputCard @refresh="fetch"/>
  <div class="">
    <h3 class="text-center p-2 bg-dark text-light">Requested Courses:</h3>
    <CourseStatusCard v-for="course in requestedCourses" :course="course" v-if="!fetchingCourses"/>
    <UtilSpinner v-else/>
  </div>
  <CourseSearchCard/>
</template>


<script setup lang="ts">import { Ref } from 'vue';
import Course from '~~/models/Course';


const requestedCourses:Ref<Course[]>= ref([])
const fetchingCourses= ref(false)
const {getCoursesByOwner} = useCourses()
const user= useSupabaseUser()

onMounted(async ()=>{
  await fetch()
})



async function fetch(){
  console.log("Fetching...")
  fetchingCourses.value= true
  if(user.value)
    requestedCourses.value= await getCoursesByOwner(user.value.id)
  fetchingCourses.value= false
}
</script>

