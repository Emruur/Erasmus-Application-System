<template>
    <NavbarExchangeCoordinator active="Grant Document"/>
    <h2 class="text-center bg-secondary text-light p-2">Grant Information</h2>
    <div class="container">
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center border border-dark rounded-start bg-dark text-light">
                ID
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-secondary text-light">
                Signed La
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-dark text-light">
                Acceptance Letter
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-secondary text-light">
                Insurance Doc
            </div>
            <div class="col d-flex align-items-center justify-content-center border border-dark bg-dark text-light">
                Account Info
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center border border-dark rounded-end bg-secondary text-light">
                Grant declaration
            </div>
        </div>
    </div>
    <DocGrantDecRowCard v-for="doc in docs" :gd_row="doc" class="mt-2"/>
    
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { GrantDocumentRow } from '~~/ui-types/types';
 

const {getGrantDocuments}= useDocument()

const docs:Ref<GrantDocumentRow[]>= ref([])



onMounted(async ()=>{
    await fetch()
})

async function fetch(){
    docs.value= await getGrantDocuments()
}
</script>