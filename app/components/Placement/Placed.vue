<template>
    <div class="p-5 text-center">
        <h3 class="bg-light p-5 text-center">
            Placement: <strong class="ms-5">{{ props.user.getPlaced_university() }}</strong>
        </h3>
        <button class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#modal">Reject
            Placement</button>

        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Rejecting Placement</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure? This can not be undone!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="reject" data-bs-dismiss="modal">Yes go on</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OutgoingStudent from '~~/models/OutgoingStudent';

const { rejectStudent } = useUser()
const { updateQuota } = useUniversity()

const props = defineProps<{
    user: OutgoingStudent
}>()

async function reject(){
    console.log("rejecting")
    var uni_name:string = props.user.getPlaced_university() as string
    console.log(await rejectStudent(props.user.getId()))
    console.log(await updateQuota(uni_name))
    window.location.reload()
}
</script>