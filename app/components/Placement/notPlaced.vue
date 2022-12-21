<template>
    <div class="">
        <h3 class="text-center bg-secondary p-2 text-light">Join a waitlist</h3>
        <div class="container-sm"><label for="a" class="form-label">Choose University:</label>
            <select name="" id="a" class="form-select" v-model="univ" v-if="!loading">
                <option v-for="uni in universities" :value="uni">
                    {{ uni.getName() }}
                </option>
            </select>
            <UtilSpinner v-else />
            <button type="button" class="btn btn-success m-2" 
                @click="sendToWaitlist(univ?univ.getId():-1, student.getId(), univ?univ.getName():''),
                getNames(), reloadPage()">JOIN WAITLIST</button>
        </div>
    </div>
    <h3 class="text-center p-2 bg-dark text-light">My Waitlists</h3>

    <PlacementWaitlist v-for="n in names" :uniName="n"/>
</template>

<script setup lang="ts">
import { loadNuxtConfig } from '@nuxt/kit';
import { Ref } from 'vue';
import OutgoingStudent from '~~/models/OutgoingStudent';
import University from '~~/models/University';
const props = defineProps<{
    student: OutgoingStudent
}>()

const { getUniversities, sendToWaitlist, getUniversitiesWaitlist } = useUniversity()

const universities: Ref<University[]> = ref([])
const loading = ref(false)
const univ: Ref<University | undefined> = ref()

async function fetchUnis() {
    loading.value = true
    universities.value = await getUniversities()
    loading.value = false
}

let names:Ref<string[]>= ref([])

async function getNames(){
    let da= (await getUniversitiesWaitlist(props.student.getId()))
    names.value =  da
}

async function reloadPage(){
    window.location.reload()
}

onMounted(() => {
    fetchUnis()
    getNames()
})

</script>