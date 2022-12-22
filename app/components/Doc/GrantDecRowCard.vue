<script setup lang="ts">
import { Ref } from 'vue';
import { GrantDocumentRow } from '~~/ui-types/types';
import Document from '~~/models/Document';
import { emit } from 'process';

const {getOutgoingStudentNameById}= useProfile()
const { getDocumentsByOwnerAndType, updateDocument, insertDocument } = useDocument()
const { uploadDocument, downloadFile } = useStorage()

const props = defineProps<{
    gd_row: GrantDocumentRow
}>()

let uploading = ref(false)

let downloading_la = ref(false)
let downloading_al = ref(false)
let downloading_id = ref(false)
let downloading_ai = ref(false)

let signedLa = ref(
    false
)
let acceptance = ref(
    false
)
let insurance = ref(
    false
)
let account = ref(
    false
)

async function downloadUploadedFile(type: string) {
    if (type == "hs-la")
        downloading_la.value = true
    if (type == "ha-l")
        downloading_al.value = true
    if (type == "id")
        downloading_id.value = true
    if (type == "ea-i")
        downloading_ai.value = true

    const status = await downloadFile("learningagreement", props.gd_row.user_id + "/" + type)

    if (type == "hs-la")
        downloading_la.value = false
    if (type == "ha-l")
        downloading_al.value = false
    if (type == "id")
        downloading_id.value = false
    if (type == "ea-i")
        downloading_ai.value = false
}

const studentName= ref("")

const uploaded_doc: Ref<File | undefined> = ref()

async function handleFileUpload() {
    // debugger;
    if (uploaded_doc.value) {
        //upsert a new document for file
        uploading.value = true
        const docs: Document[] = await getDocumentsByOwnerAndType(props.gd_row.user_id as string, "egd")
        let doc = Document.instantiateDocumentArray(docs)
        console.log("Found doc: ", doc)

        let doc_status_g: boolean
        if (doc.length != 0) {
            //upsert doc
            let doc_id = doc[0].getId()
            console.log("Updating doc at id", doc_id)
            const doc_status: boolean = await updateDocument(doc_id, props.gd_row.user_id as string, "egd", "Grant Declaration", "pending")
            doc_status_g = doc_status

        }
        else {
            console.log("Inserting doc")
            const doc_status: boolean = await insertDocument(props.gd_row.user_id as string, "egd", "Grant Agreement ")
            doc_status_g = doc_status
        }

        if (doc_status_g) {
            const file_status: boolean = await uploadDocument(uploaded_doc.value as File, props.gd_row.user_id as string, "egd", "learningagreement")
            if (file_status) {
                console.log("Succesfully added document!!!!!")
                uploading.value = false
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
                uploaded_doc.value = target.files[0];
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

watchEffect(() => {
    console.log(uploaded_doc.value)
})


onMounted(async () => {
    console.log("Grant ROW", props.gd_row)
    signedLa.value = props.gd_row.documents.has("hs-la")
    acceptance.value = props.gd_row.documents.has("ha-l")
    insurance.value = props.gd_row.documents.has("id")
    account.value = props.gd_row.documents.has("ea-i")
    studentName.value= await getOutgoingStudentNameById(props.gd_row.user_id)
})

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-flex align-items-center">
                {{ studentName }}
            </div>
            <div class="col d-flex align-items-center justify-content-center">
                <button class="btn btn-primary" :class="{ disabled: !signedLa }" @click="downloadUploadedFile('hs-la')">
                    <IconsDownload v-if="!downloading_la" />
                    <UtilSpinner v-else/>
                </button>
            </div>
            <div class="col d-flex align-items-center justify-content-center">
                <button class="btn btn-primary" :class="{ disabled: !acceptance }"
                    @click="downloadUploadedFile('ha-l')">
                    <IconsDownload v-if="!downloading_al"/>
                    <UtilSpinner v-else/>
                </button>
            </div>
            <div class="col d-flex align-items-center justify-content-center">
                <button class="btn btn-primary" :class="{ disabled: !insurance }" @click="downloadUploadedFile('id')">
                    <IconsDownload v-if="!downloading_id"/>
                    <UtilSpinner v-else/>
                </button>
            </div>
            <div class="col d-flex align-items-center justify-content-center">
                <button class="btn btn-primary" :class="{ disabled: !account }" @click="downloadUploadedFile('ea-i')">
                    <IconsDownload v-if="!downloading_ai"/>
                    <UtilSpinner v-else/>
                </button>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center">
                <input type="file" name="" id="" class="form-control" accept= ".pdf" @change="handleFileChange($event)">
                <button class="btn btn-primary" :class="{ disabled: uploaded_doc == undefined }">
                    <IconsUpload v-if="!uploading" @click="handleFileUpload" />
                    <UtilSpinner v-else />
                </button>
            </div>

        </div>
    </div>

</template>