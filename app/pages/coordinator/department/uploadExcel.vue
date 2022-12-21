<template>
    <NavbarDepartmentCoordinator active="Documents" />
    <form enctype="multipart/form-data" action="http://127.0.0.1:5000" method="POST">
        <input id="file" type="file" name="file" class="form-control"/>
        <button class="btn btn-primary" type="submit" ><IconsUpload/></button>
    </form>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" :class="{ 'active': activetab == 'Students' }" aria-current="page"
                @click="activetab = 'Students'">Students</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ 'active': activetab == 'Universities' }"
                @click="activetab = 'Universities'">Universities</a>
        </li>
    </ul>
    <div style="max-width: 100%;">
        <div class="" v-if="activetab == 'Students'">
            <h3 class="bg-secondary pt-2 pb-2 text-center text-light">Students</h3>
            <div class="row">
                <h4 class="col d-flex justify-content-center  border"> <strong>Name</strong></h4>
                <h4 class="col d-flex justify-content-center  border"><strong> Total Points</strong></h4>
                <h4 class="col d-flex justify-content-center  border"> <strong>Placement</strong> </h4>
            </div>
            <div class="" v-for="student in students">

                <div class="row">
                    <div class="col d-flex justify-content-center  border"> <strong>{{ student.name }}</strong></div>
                    <div class="col d-flex justify-content-center  border"> {{ student.points }}</div>
                    <div class="col d-flex justify-content-start  border  text-light "
                        :class="{ 'bg-success': student.placement, 'bg-warning': !student.placement }">{{
                                student.placement
                                    ?
                                    student.placement : "NotPlaced"
                        }}</div>
                </div>
            </div>
        </div>
        <div class="" v-if="activetab == 'Universities'">
            <h3 class="bg-secondary pt-2 pb-2 text-center text-light">Universities</h3>
            <div class="row">
                <h4 class="col d-flex justify-content-center  border"> <strong>Name</strong></h4>
                <h4 class="col d-flex justify-content-center  border"><strong> Coordinator</strong></h4>
                <h4 class="col d-flex justify-content-center  border"> <strong>Placed students</strong> </h4>
            </div>
            <div class="" v-for="uni in universities">

                <div class="row">
                    <div class="col d-flex justify-content-center  border"> <strong>{{ uni.name }}</strong></div>
                    <div class="col d-flex justify-content-center  border"> {{ uni.coordinator }}</div>
                    <div class="col d-flex justify-content-start  border  text-light ">{{ uni.placed_students }}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
const fileUploaded = ref()

const students = ref()
const universities = ref()



const activetab = ref("Students")


</script>

<style scoped>
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
