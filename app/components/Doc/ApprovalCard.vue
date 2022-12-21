<script setup lang="ts">
import { stat } from 'fs';
import { Ref } from 'vue';
import Document from '~~/models/Document';

const user= useSupabaseUser()

const props = defineProps<{
    document: Document
    type: string
}>()


const emit = defineEmits(['refresh'])
const { downloadFile, uploadDocument } = useStorage()
const { updateDocument, insertDocument } = useDocument()
const {getOutgoingStudentNameById}= useProfile()

const studentName= ref("")

const downloading= ref(false)
const uploading= ref(false)
const rejecting= ref(false)

onMounted(async()=>{
        studentName.value= await getOutgoingStudentNameById(props.document.getOwnerId())
})

const uploadedFile: Ref<File | undefined> = ref()

async function downloadDoc() {
    downloading.value= true
    await downloadFile("learningagreement", props.document.getOwnerId() + "/" + props.type)
    downloading.value= false
}

async function approveDoc() {
    if (!uploadedFile.value) {
        console.error("No signed file uploaded")
        return
    }
    //Insert new doc
    uploading.value= true
    const insertion_status = await insertDocument(props.document.getOwnerId(), props.document.getType() + "-s", props.document.getName())
    if (!insertion_status) {
        console.error("Failed inserting document for signed file")
        uploading.value= false
        return
    }
    
    const upload_status = await uploadDocument(uploadedFile.value, props.document.getOwnerId(), props.document.getType()+"-s", "learningagreement")
    if (!upload_status) {
        console.error("Error uploading signed file")
        uploading.value= false
        return
    }
    //Update students doc
    const status = await updateDocument(props.document.getId(), props.document.getOwnerId(), props.document.getType(), props.document.getName(), "accepted")
    if (status){
        uploading.value= false
        emit('refresh')
    }
        
}
async function rejectDoc() {
    rejecting.value= true
    const status = await updateDocument(props.document.getId(), props.document.getOwnerId(), props.document.getType(), props.document.getName(), "rejected")
    if (status)
        emit('refresh')
    rejecting.value= false
}
function handleFileChange(e: Event) {
    // Check if file is selected

    if (e.target) {
        const target = e.target as HTMLInputElement
        if (target.files) {
            if (target.files && target.files[0]) {
                uploadedFile.value = target.files[0];
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
    <div class="container border border-dark">
        <div class="row">
            <div class="col border border-secondary d-flex align-items-center">
                {{ studentName}}
            </div>
            <div class="col border border-secondary d-flex align-items-center justify-content-center">
                <button @click="downloadDoc" class="btn btn-secondary">Download
                    <IconsDownload v-if= "!downloading"/>
                    <UtilSpinner v-else/>
                </button>
            </div>
            <div class="col border border-secondary d-flex align-items-center">
                <input type="file" name="" id="" class="form-control" @change="handleFileChange">
            </div>
            <div class="col border border-secondary d-flex align-items-center justify-content-center p-1">
                <div class="d-flex">
                    <button class="btn btn-primary " @click="approveDoc">
                        <IconsApprove v-if="!uploading"/>
                        <UtilSpinner v-else/>
                    </button>
                    <button class="btn btn-danger ms-2" @click="rejectDoc">
                        <IconsReject v-if="!rejecting"/>
                        <UtilSpinner v-else/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>