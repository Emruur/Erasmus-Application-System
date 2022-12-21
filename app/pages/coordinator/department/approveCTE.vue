<template>
    <NavbarDepartmentCoordinator active="Documents"/>
    <h2 class="text-center bg-secondary text-light p-2">CTE FORMS & TRANSCRIPTS</h2>
    <div class="container">
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center border border-dark rounded-start bg-dark text-light">
                ID
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-secondary text-light">
                CTE Form
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-dark text-light">
                Transcript
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-secondary text-light">
                Signed CTE Form
            </div>
        </div>
    </div>
    <AfterMobDocRowCard v-for="doc in docs" :gd_row="doc" class="mt-2"/>
    
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import AfterMobDocRowCard from '~~/components/Doc/AfterMobDocRowCard.vue';
import { GrantDocumentRow } from '~~/ui-types/types';


const {getCTEDocuments}= useDocument()

const docs:Ref<GrantDocumentRow[]>= ref([])



onMounted(async ()=>{
    await fetch()
})

async function fetch(){
    docs.value= await getCTEDocuments()
}
</script>