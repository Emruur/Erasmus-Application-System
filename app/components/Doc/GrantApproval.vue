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
const status = ref("not uploaded")
const fileUploaded: Ref<File | undefined> = ref()
const loading = ref(true)

const uploading = ref(false)
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


async function handleFileUpload() {
    // debugger;
    if (fileUploaded.value) {
        //upsert a new document for file
        uploading.value = true
        let uploading_type= props.cardCode+"-s"
        const docs: Document[] = await getDocumentsByOwnerAndType(user.value?.id as string, uploading_type)
        let doc = Document.instantiateDocumentArray(docs)
        console.log("Found doc: ", doc)

        let doc_status_g: boolean
        if (doc.length != 0) {
            //upsert doc
            let doc_id = doc[0].getId()
            console.log("Updating doc at id", doc_id)
            const doc_status: boolean = await updateDocument(doc_id, user.value?.id as string, uploading_type, props.cardType, "pending")
            doc_status_g = doc_status

        }
        else {
            console.log("Inserting doc")
            const doc_status: boolean = await insertDocument(user.value?.id as string, uploading_type, props.cardType)
            doc_status_g = doc_status
        }

        if (doc_status_g) {
            const file_status: boolean = await uploadDocument(fileUploaded.value as File, user.value?.id as string, uploading_type, "learningagreement")
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
    <div class="bg-light rounded border border-dark">
        <h4 class="text-center bg-dark p-1 text-light">{{ props.cardType }}</h4>
        <div class="row text-center p-3">
            <div class="col ">
                <div v-if="status != 'not uploaded'" class="d-flex">
                    <input type="file" class="form-control"  accept= ".pdf" @change="handleFileChange($event)" />
                    <button class="btn btn-primary" @click="handleFileUpload" :class="{disabled: fileUploaded==undefined}">
                        <IconsUpload v-if="!uploading"/>
                        <UtilSpinner v-else/>
                    </button>
                </div>
                <p v-else>Not Uploaded </p>
            </div>
            <div v-if="status != 'not uploaded'" class="col">
                <button class="btn btn-primary" @click="downloadUploadedFile">
                    
                    <IconsDownload v-if="!downloading_uploaded"/>
                    <UtilSpinner v-else/>

                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-success {
    color: white
}
</style>