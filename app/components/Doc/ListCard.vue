<script setup lang="ts">
import { Ref } from 'vue';
import Document from '~~/models/Document';
const props = defineProps<{
    type: string
}>()


const { getPendingDocumentsByType } = useDocument()

const docs: Ref<Document[]> = ref([])
const loading = ref(true)

async function fetchDocs() {
    loading.value= true

    docs.value=  await getPendingDocumentsByType(props.type)

    loading.value= false
}

onMounted(async () => {
    await fetchDocs()
})
</script>


<template>
    <div v-if="!loading">
        <DocApprovalCard v-for="doc in docs" :document="doc" :type="props.type" @refresh="fetchDocs"/>
    </div>
    <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

</template>