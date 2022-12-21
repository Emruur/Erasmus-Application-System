<template>
    <div class="row">
        <div class="col d-flex justify-content-center align-items-center bg-dark text-light p-2">Bilkent Code - Bilkent Course Name</div>
        <div class="col d-flex justify-content-center align-items-center bg-secondary text-light p-2">Bilkent Credit - Host Credit</div>
        <div class="col d-flex justify-content-center align-items-center bg-dark text-light p-2">Host University Name</div>
        <div class="col d-flex justify-content-center align-items-center bg-secondary text-light p-2">Download Syllabus</div>
        <div class="col d-flex justify-content-center align-items-center bg-dark text-light p-2">Actions</div>
    </div>
    <div class="row">
        <div class="col d-flex justify-content-center align-items-center">{{ props.course.getBilkentCode() }} -
            {{ props.course.getBilkentCourseName() }} </div>
        <div class="col d-flex justify-content-center align-items-center">{{ props.course.getBilkentCredit() }} -
            {{ props.course.getCreditEcts() }}</div>
        <div class="col d-flex justify-content-center align-items-center">
            
            <UtilSpinner v-if="loading"/>
            <p v-else>{{ uniName }}</p>

        </div>
        <div class="col d-flex justify-content-center align-items-center"><button class="btn btn-primary" @click="downloadSyllabus">
                <IconsDownload v-if="!downloading"/>
                <UtilSpinner v-else/>
            </button></div>
        <div class="col d-flex justify-content-center align-items-center">
            <button class="btn-success btn" @click="approveCourse"><IconsApprove/></button>
            <button class="ms-1 btn btn-danger" @click="rejectCourse"><IconsReject/></button>
        </div>
    </div>

</template>


<script setup lang="ts">import Course from '~~/models/Course';
const {downloadFile} = useStorage()
const {approveCourseById, rejectCourseById}= useCourses()
const {getUniversityNameById}= useUniversity()

const props = defineProps<{
    course: Course
}>()
const emit = defineEmits(['refresh'])

const downloading= ref(false)
const approving= ref()
const rejecting= ref()

const uniName= ref()
const loading= ref(false)

onMounted(async ()=>{
    loading.value= true
    uniName.value= await getUniversityNameById(props.course.getHostUniId())
    loading.value= false

})

async function downloadSyllabus(){
    downloading.value= true
    const status = await downloadFile("learningagreement", props.course.getOwnerId() + "/course/" + props.course.getId())
    downloading.value= false
}

async function approveCourse(){
    approving.value= true
    await approveCourseById(props.course.getId())
    approving.value= false
    emit("refresh")
}

async function rejectCourse(){
    rejecting.value= true
    await rejectCourseById(props.course.getId())
    rejecting.value= false
    emit('refresh')
}
</script>