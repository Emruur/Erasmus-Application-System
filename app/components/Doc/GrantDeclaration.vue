<script setup lang="ts">
import { Ref } from 'vue';
import Document from '~~/models/Document';

const props = defineProps<{
    cardType: string,
    cardCode: string
}>()

const user = useSupabaseUser()
const { downloadFile } = useStorage()
const { getDocumentsByOwnerAndType } = useDocument()

const doc: Ref<Document | undefined> = ref()
const status = ref("not uploaded")
const loading = ref(true)

const downloading_uploaded = ref(false)


async function fetchDoc() {
    loading.value = true
    const docs: Document[] = await getDocumentsByOwnerAndType(user.value?.id as string, props.cardCode)
    if (docs.length > 0) {
        let documents = Document.instantiateDocumentArray(docs)
        doc.value = documents[0]
        status.value = documents[0].getStatus()
    }
    loading.value = false
}

onMounted(async () => {
    //FETCH learning agreement doc for user and type
    await fetchDoc()
})

async function downloadUploadedFile() {
    console.log("Downloading...")

    if (doc.value && user.value) {
        downloading_uploaded.value = true
        await downloadFile("learningagreement", user.value.id + "/" + doc.value.getType())
        downloading_uploaded.value = false
    }
    else
        console.error("Cant download file??")
}

</script>

<template>
    <div class="bg-light rounded border border-dark">
        <h4 class="text-center bg-dark p-1 text-light">{{ props.cardType }}</h4>
        <div class="row text-center p-3">
            <div v-if="status != 'not uploaded'" class="col">
                <button class="btn btn-primary" @click="downloadUploadedFile">
                    <div class="" v-if="!downloading_uploaded">Download
                        <IconsDownload />
                    </div>
                    <UtilSpinner v-else/>

                </button>
            </div>
            <p v-else>Not Uploaded</p>
        </div>
    </div>
</template>

<style scoped>
.bg-success {
    color: white
}
</style>