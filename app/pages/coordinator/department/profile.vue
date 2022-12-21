<script setup lang="ts">
import {LinkType,Dropdown} from "ui-types/types"
import { Ref } from "vue";
import DepartmentCoordinator from "~~/models/DepartmentCoordinator";
import OutgoingStudent from "~~/models/OutgoingStudent";
 

const { getProfileById } = useProfile()
const client = useSupabaseClient()

let user: Ref<DepartmentCoordinator | undefined> = ref()
    let auth = useSupabaseUser()

onMounted(async () => {
    if (auth.value) {
        let id = auth.value.user_metadata.userId
        let role = auth.value.user_metadata.role

        user.value = (await getProfileById(id, role)) as DepartmentCoordinator
    }
    else {
        console.log("Auth null", auth.value)
    }
})

watch(auth, async (newAuth, oldAuth) => {
    if (newAuth) {
        let id = newAuth.user_metadata.userId
        let role = newAuth.user_metadata.role

        user.value = (await getProfileById(id, role)) as DepartmentCoordinator
    }
    else {
        console.log("Auth null", auth.value)
    }
})



</script>

<template>
    <NavbarDepartmentCoordinator active="Profile"/>
    <profile-card :user="user" v-if="user != undefined"/>
</template>