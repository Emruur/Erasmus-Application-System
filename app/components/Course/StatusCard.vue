<template>
    <div class="p-1 m-2">
        <div class="row">
            <div class="col d-flex justify-content-center align-items-center">
                {{ props.course.getBilkentCode() }}/{{ props.course.getBilkentCourseName() }}</div>
            <div class="col d-flex justify-content-center align-items-center">
                {{ props.course.getHostCourseCode() }}/{{ props.course.getHostCourseName() }}</div>
            <div class="col d-flex justify-content-center align-items-center">
                <div :class="{ 'bg-warning': props.course.getStatus() == 'pending','bg-danger': props.course.getStatus() == 'rejected','bg-success': props.course.getStatus() == 'approved', }" class="p-1 rounded">{{ props.course.getStatus() }}</div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import Course from '~~/models/Course';

const props = defineProps<{
    course: Course
}>()
</script>

<style scoped>
.bg-danger, .bg-success{
    color: white;
}
</style>