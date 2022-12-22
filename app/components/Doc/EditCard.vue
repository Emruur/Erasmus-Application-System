<script setup lang="ts">
import { User } from '@supabase/gotrue-js';
import { Session } from 'inspector';
import { Ref } from 'vue';
import Document from '~~/models/Document';

const props = defineProps<{
    cardType: string,
    cardCode: string,
    user: User
}>()

const { uploadDocument, downloadFile } = useStorage()
const { insertDocument, getDocumentsByOwnerAndType, updateDocument } = useDocument()

const doc: Ref<Document | undefined> = ref()
const status = ref("not uploaded")
const fileUploaded: Ref<File | undefined> = ref()
const loading = ref(true)

const uploading = ref(false)
const downloading_uploaded = ref(false)
const downloading_signed = ref(false)


async function fetchDoc() {
    loading.value = true
    console.log("FETCHİNG: ",props.user)
    const docs: Document[] = await getDocumentsByOwnerAndType(props.user.id as string, props.cardCode)
    if (docs.length > 0) {
        let documents= Document.instantiateDocumentArray(docs)
        doc.value = documents[0]
        status.value = documents[0].getStatus()
    }
    loading.value = false
}


let session= ref()

onMounted(async () => {
    fetchDoc()
})

async function downloadUploadedFile() {
    console.log("Downloading...")

    if (doc.value && props.user) {
        downloading_uploaded.value = true
        await downloadFile("learningagreement", props.user.id + "/" + doc.value.getType())
        downloading_uploaded.value = false
    }
    else
        console.error("Cant download file??")
}

async function downloadSignedDocument() {
    console.log("Downloading signed document...")
    if (doc.value && props.user){
        //TODO maybe write a decorator for it
        downloading_signed.value= true
        await downloadFile("learningagreement", props.user.id + "/" + doc.value.getType() + "-s")
        downloading_signed.value= false
    }   
    else
        console.error("Cant download file??")
}

async function handleFileUpload() {
    
    // debugger;
    console.log("Uploading",props.user)
    if (fileUploaded.value) {
        //upsert a new document for file
        uploading.value= true
        let userid= props.user?.id
        const doc: Document[] = await getDocumentsByOwnerAndType(userid as string, props.cardCode)

        console.log("Found doc: ", doc)

        let doc_status_g: boolean
        if (doc.length != 0) {
            //upsert doc
            let doc_id = doc[0].getId()
            console.log("Updating doc at id", doc_id)
            const doc_status: boolean = await updateDocument(doc_id, userid as string, props.cardCode, props.cardType, "pending")
            doc_status_g = doc_status

        }
        else {
            console.log("Inserting doc")
            const doc_status: boolean = await insertDocument(userid as string, props.cardCode, props.cardType)
            doc_status_g = doc_status
        }

        if (doc_status_g) {
            console.log("uploading doc", props.user.id)
            const file_status: boolean = await uploadDocument(fileUploaded.value as File, userid as string, props.cardCode, "learningagreement")
            if (file_status) {
                console.log("Succesfully added document!!!!!")
                uploading.value= false
                await fetchDoc()
            }
        }
        else
            uploading.value= false
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
        <div class="container text-center">
            <div v-if="!loading" class="row d-flex justify-content-center align-items-center" style="min-height: 20vh">
                <div v-if="status != 'not uploaded'" class="col  d-flex align-items-center">
                    <h5>File Uploaded:</h5>
                    <button class="btn btn-primary ms-1" @click="downloadUploadedFile">
                        <IconsDownload v-if="!downloading_uploaded" />
                        <UtilSpinner v-else />
                    </button>
                </div>
                <div class="col d-flex justify-content-center align-items-center ">
                    <div class="d-flex justify-content-center align-items-center flex-column">
                        <h5>{{ status == 'not uploaded' ? "Upload:" : "Upload new file:" }} </h5>
                        <div class="d-flex"><input type="file"  accept= ".pdf" class="mt-1 form-control"
                                @change="handleFileChange($event)" />
                            <button class="btn btn-primary mt-1" @click="handleFileUpload">
                                <IconsUpload v-if="!uploading" />
                                <UtilSpinner v-else />
                            </button>
                        </div>

                    </div>
                </div>
                <div class="col d-flex justify-content-center align-items-center flex-column ">
                    <div class="">
                        <h5>Status: </h5>
                        <h5 class="p-2 rounded"
                            :class="{ 'bg-warning': status == 'pending', 'bg-info': status == 'not uploaded', 'bg-danger': status == 'rejected', 'bg-success': status == 'accepted' }">
                            {{ status }}</h5>
                    </div>
                </div>
                <div v-if="status == 'accepted'"
                    class="col d-flex justify-content-center align-items-center flex-column ">
                    <div class="d-flex align-items-center">
                        <h5>Signed Form: </h5>
                        <button class="btn-primary btn" @click="downloadSignedDocument">
                            <IconsDownload v-if="!downloading_signed" />
                            <UtilSpinner v-else />
                        </button>

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