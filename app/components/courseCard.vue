<script setup lang="ts">
import Course from "~/models/Course"

const courses = defineProps<{
    course: Course
}>()

</script>

<template>
    <div class="row">
        <div class="col d-flex justify-content-center align-items-center bg-light pt-2 pb-2">{{
                course.getHostCourseCode()
        }} </div>
        <div class="col d-flex justify-content-center align-items-center bg-light pt-2 pb-2">{{
                course.getBilkentCode()
        }} </div>
        <div class="col d-flex justify-content-center align-items-center bg-light pt-2 pb-2">{{ course.getCreditEcts()
        }}</div>
        <div class="col d-flex justify-content-center align-items-center pt-2 pb-2 bg-light">
            <div :class="{ 'bg-success': course.getStatus() == 'approved', 'bg-danger': course.getStatus() == 'rejected' }"
                class="text-light p-2 rounded">
                {{
                course.getStatus()
                }} </div>
        </div>
    </div>

</template>
