<script setup lang="ts">
import { Ref } from "vue";
import Course from "~~/models/Course";
import University from "~~/models/University";


const searching = ref(false)
const fetching_universities = ref(false)
const courses: Ref<Course[]> = ref([])
const { getCoursesByUni, getCoursesByUniAndCode } = useCourses()
const { getUniversities } = useUniversity()

const hostUni = ref()
const bilkentCode = ref("")

const hostUnis: Ref<University[]> = ref([])

onMounted(async () => {
    await fetchUniversities()
})

async function searchCourses() {
    searching.value = true
    if (hostUni.value && !bilkentCode.value) {
        console.log(hostUni.value)
        let cs = await getCoursesByUni(hostUni.value)
        courses.value = cs
        console.log("Courses: ", cs)
    }
    else if (hostUni.value) {
        console.log(hostUni.value)
        let cs = await getCoursesByUniAndCode(hostUni.value, bilkentCode.value)
        courses.value = cs
        console.log("Courses: ", cs)
    }
    searching.value = false

    const myTimeout = setTimeout(() => window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight), 500);


}

async function fetchUniversities() {
    fetching_universities.value = true
    let unis = await getUniversities()
    hostUnis.value = unis
    fetching_universities.value = false
}


</script>

<template>
    <h3 class="p-2 bg-secondary text-light text-center">Search Courses</h3>

    <div class="container-lg">

        <div class="row">

            <div class="col d-flex justify-content-center align-items-center flex-column">
                <label for="bilkentCode">Host Institution:</label>
                <select v-model="hostUni" class="form-select" v-if="!fetching_universities">
                    <option v-for="uni in hostUnis" :value="uni.getId()">
                        {{ uni.getName() }}
                    </option>
                </select>
                <UtilSpinner v-else />
            </div>
            <div class="col d-flex justify-content-center align-items-center flex-column">
                <label for="bilkentCode" class="form-label">Bilkent Course Code:</label>
                <input type="text" id="bilkentCode" v-model="bilkentCode" class="form-control" @input="bilkentCode=bilkentCode.toUpperCase()" />
            </div>
            <div class="col d-flex justify-content-center align-items-center flex-column">
                <button type="button" class="btn btn-success m-2" @click="searchCourses()">SEARCH</button>
            </div>
        </div>
        <div class="" v-if="!searching">
            <h5 class="p-2 m-2">Results: <span v-if="courses.length == 0" class="ms-3"> No results :/</span>
            </h5>
            <div class="row border" v-if="courses.length != 0">
                <div class="col d-flex justify-content-center align-items-center bg-light p-2">
                    <h5>Host Course Code</h5>

                </div>
                <div class="col d-flex justify-content-center align-items-center  bg-secondary text-light p-2">
                    <h5>Bilkent Course Code</h5>

                </div>
                <div class="col d-flex justify-content-center align-items-center bg-light p-2">
                    <h5>ECTS</h5>

                </div>
                <div class="col d-flex justify-content-center align-items-center bg-secondary text-light p-2">
                    <h5>Status</h5>

                </div>
            </div>
        </div>
        <UtilSpinner v-else />
        <div class="pt-2">
            <CourseCard v-for="c in courses" :course="c" />
        </div>
    </div>


</template>

