<script setup lang="ts">
import { Ref } from 'vue';
import Document from '~~/models/Document';

const props = defineProps<{
    cardType: string,
    cardCode: string
}>()

const user = useSupabaseUser()
const { uploadDocument, downloadFile } = useStorage()
const { insertDocument, getDocumentsByOwnerAndType, updateDocument } = useDocument()

const doc: Ref<Document | undefined> = ref()
const fileUploaded: Ref<File | undefined> = ref()
const loading = ref(true)
const status = ref("not uploaded")
const uploading = ref(false)
const downloading_uploaded = ref(false)

async function fetchDoc() {
    loading.value = true
    const documents: Document[] = await getDocumentsByOwnerAndType(user.value?.id as string, props.cardCode)

    if (documents.length > 0) {
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


async function handleFileUpload() {
    // debugger;
    if (fileUploaded.value) {
        //upsert a new document for file
        uploading.value = true
        const docs: Document[] = await getDocumentsByOwnerAndType(user.value?.id as string, props.cardCode)
        let doc= Document.instantiateDocumentArray(docs)
        console.log("Found doc: ", doc)

        let doc_status_g: boolean
        if (doc.length != 0) {
            //upsert doc
            let doc_id = doc[0].getId()
            console.log("Updating doc at id", doc_id)
            const doc_status: boolean = await updateDocument(doc_id, user.value?.id as string, props.cardCode, props.cardType, "pending")
            doc_status_g = doc_status

        }
        else {
            console.log("Inserting doc")
            const doc_status: boolean = await insertDocument(user.value?.id as string, props.cardCode, props.cardType)
            doc_status_g = doc_status
        }

        if (doc_status_g) {
            const file_status: boolean = await uploadDocument(fileUploaded.value as File, user.value?.id as string, props.cardCode, "learningagreement")
            if (file_status) {
                console.log("Succesfully added document!!!!!")
                uploading.value = false
                await fetchDoc()
            }
        }
        else
            uploading.value = false
    }
}
function handleFileChange(e: Event) {
    // Check if file is selected

    if (e.target) {
        const target = e.target as HTMLInputElement
        if (target.files) {
            if (target.files && target.files[0]) {
                fileUploaded.value = target.files[0];
                // Get uploaded file
                const file = target.files[0],
                    // Get file size
                    fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,
                    // Get file extension
                    fileExtention = file.name.split(".").pop(),
                    // Get file name
                    fileName = file.name.split(".").shift();
                // Print to console
                console.log(fileSize, fileExtention, fileName);
            }
        }

    }

}
</script>

<template>
    <div class="bg-light rounded border border-dark mt-4">
        <h4 class="text-center bg-secondary p-1 text-light" :class="{ 'bg-success': status != 'not uploaded' }">{{
                props.cardType
        }}</h4>
        <div class="container text-center">
            <div v-if="!loading" class="row d-flex align-items-center">
                <div v-if="status != 'not uploaded'" class="col  d-flex align-items-center justify-content-center">
                    <h5>File Uploaded:</h5>
                    <button class="btn btn-primary ms-1" @click="downloadUploadedFile">
                        <IconsDownload v-if="!downloading_uploaded" />
                        <UtilSpinner v-else />
                    </button>
                </div>
                <div class="col d-flex justify-content-center align-items-center ">
                    <div class="d-flex justify-content-center align-items-center flex-column">
                        <h5>{{ status == 'not uploaded' ? "Upload:" : "Upload new file:" }} </h5>
                        <div class="d-flex">
                            <input type="file" class="mt-1 mb-1 form-control"
                                @change="handleFileChange($event)" />
                            <button class="btn btn-primary mt-1" @click="handleFileUpload">
                                <IconsUpload v-if="!uploading" />
                                <UtilSpinner v-else />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.bg-success {
    color: white
}
</style>