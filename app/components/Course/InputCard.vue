

<template>
    <div class="bg-light">
        <h3 class="bg-secondary text-light p-2 text-center">Request Course</h3>
        <div class="p-5">
            <form>
                <div class="row">
                    <div class="col">
                        <label for="bilkentCode" class="form-label">Bilkent Code:</label>
                        <input type="text" id="bilkentCode" v-model="bilkentCode" class="form-control" @input="bilkentCode=bilkentCode.toUpperCase()"/>
                    </div>
                    <div class="col">
                        <label for="bilkentCode" class="form-label">Bilkent Course Name:</label>
                        <input type="text" id="bilkentName" v-model="bilkentName" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="" class="form-label">Select Instructor: </label>
                        <select v-model="instructor" class="form-select" v-if="!loading_instructors">
                            <option v-for="i in instructors" :value="i.getId()">{{ i.getName() }} {{ i.getSurname() }}
                            </option>
                        </select>
                        <UtilSpinner v-else />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="hostUniCode" class="form-label">Host Course Code:</label>
                        <input type="text" id="hostUniCode" v-model="hostCourseCode" class="form-control"  @input="hostCourseCode=hostCourseCode.toUpperCase()"/>
                    </div>
                    <div class="col">
                        <label for="hostName" class="form-label">Host Course Name:</label>
                        <input type="text" id="hostName" v-model="hostCourseName" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="syllabus" class="form-label"> Syllabus:</label>
                        <input type="file" name="" id="syllabus" accept= ".pdf" class="form-control" @change="handleFileChange">
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="bilkentECTS" class="form-label">Bilkent ECTS:</label>
                        <input type="number" id="bilkentECTS" v-model.number="bilkentECTS" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="hostECTS" class="form-label">Host ECTS:</label>
                        <input type="number" id="hostECTS" v-model.number="hostECTS" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="" class="form-label">Host University: </label>
                        <select v-model="hostUniId" class="form-select" v-if="!loading_universities">
                            <option v-for="uni in universities" :value="uni.getId()">{{ uni.getName() }}</option>
                        </select>
                        <UtilSpinner v-else/>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-4">
                        <label for="" class="form-label">Designation</label>
                        <select name="" id="" class="form-select" v-model="designation">
                            <option>required course</option>
                            <option>technical elective</option>
                            <option>general elective</option>
                            <option>arts core elective</option>
                            <option>social science core elective</option>
                            <option>project elective</option>
                        </select>
                    </div>

                    <div class="col">
                        <button type="button" class="btn btn-success m-2" @click="submitForm">

                            <div class="" v-if="!uploading">SUBMIT</div>
                            <UtilSpinner v-else />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>
<script setup lang="ts">

import { Ref } from 'vue';
import Course from '~~/models/Course';
import Document from '~~/models/Document';
import Instructor from '~~/models/Instructor';
import University from '~~/models/University';

const user = useSupabaseUser()
const emit = defineEmits(['refresh'])

const { getDocumentsByOwnerAndType, updateDocument, insertDocument } = useDocument()
const { uploadDocument } = useStorage()
const { insertCourse } = useCourses()
const { getInstructors } = useProfile()
const { getUniversities } = useUniversity()

const uploading = ref(false)
const loading_instructors = ref(false)
const loading_universities = ref(false)

const bilkentCode = ref("")
const bilkentName = ref("")
const instructor = ref()
const hostCourseCode = ref("")
const hostCourseName = ref("")
const bilkentECTS = ref(1)
const hostUniId = ref()
const hostECTS = ref(1)
const designation = ref("")
const fileUploaded: Ref<File | undefined> = ref()

const instructors: Ref<Instructor[]> = ref([])
const universities: Ref<University[]> = ref([])

async function fetchInstructors() {
    loading_instructors.value = true
    instructors.value = await getInstructors()
    loading_instructors.value = false
}

async function fetchUniversities() {
    loading_universities.value = true
    universities.value = await getUniversities()
    loading_universities.value = false
}

onMounted(async () => {
    await fetchInstructors()
    await fetchUniversities()
})

async function submitForm(this: { uploading: Ref<boolean>; loading_instructors: Ref<boolean>; loading_universities: Ref<boolean>; bilkentCode: Ref<string>; bilkentName: Ref<string>; instructor: Ref<any>; hostCourseCode: Ref<string>; hostCourseName: Ref<string>; bilkentECTS: Ref<number>; hostUniId: Ref<any>; hostECTS: Ref<number>; designation: Ref<string>; instructors: Ref<Instructor[]>; universities: Ref<University[]>; submitForm: () => Promise<void>; handleFileChange: (e: Event) => void; }) {
    console.log("Instructor", instructor.value)

    if (user.value && fileUploaded.value) {
        const courseObj = {
            hostUniId: hostUniId.value,
            hostCourseCode: hostCourseCode.value,
            hostCourseName: hostCourseName.value,
            creditEcts: hostECTS.value,
            bilkentCode: bilkentCode.value,
            bilkentCourseName: bilkentName.value,
            bilkentCredit: bilkentECTS.value,
            designation: designation.value,
            status: "pending",
            syllabusId: "",
            ownerId: user.value.id,
            instructor: instructor.value
        }
        uploading.value = true
        let response = await insertCourse(courseObj);
        console.log("RES: ", response)

        if (response != undefined) {
            let file_status: boolean = await uploadDocument(fileUploaded.value as File, user.value.id as string, "course/" + response.toString(), "learningagreement")
            if (file_status) {
                emit('refresh')
            }
        }
        uploading.value = false;
        
    }
      
}

async function handleFileUpload() {
    // debugger;
    if (fileUploaded.value) {
        //upsert a new document for file
        const docs: Document[] = await getDocumentsByOwnerAndType(user.value?.id as string, "syl")
        let doc = Document.instantiateDocumentArray(docs)
        console.log("Found doc: ", doc)

        let doc_status_g: boolean
        if (doc.length != 0) {
            //upsert doc
            let doc_id = doc[0].getId()
            console.log("Updating doc at id", doc_id)
            const doc_status: boolean = await updateDocument(doc_id, user.value?.id as string, "syl", "Syllabus", "pending")
            doc_status_g = doc_status

        }
        else {
            console.log("Inserting doc")
            const doc_status: boolean = await insertDocument(user.value?.id as string, "syl", "Syllabus")
            doc_status_g = doc_status
        }

        if (doc_status_g) {
            const file_status: boolean = await uploadDocument(fileUploaded.value as File, user.value?.id as string, "syl", "learningagreement")
            if (file_status) {
                console.log("Succesfully added document!!!!!")

            }
        }
    }
}

function handleFileChange(e: Event) {
    // Check if file is selected

    if (e.target) {
        const target = e.target as HTMLInputElement
        if (target.files) {
            if (target.files && target.files[0]) {
                if (target.files[0].name.split(".").pop() != 'pdf'){
                    alert('INVALID DOCUMENT PLEASE UPLOAD A PDF FILE' )
                    return
                }
                else{
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
}
</script>

<style scoped>
.col {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>