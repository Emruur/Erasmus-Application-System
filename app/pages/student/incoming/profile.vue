<script setup lang="ts">
import { LinkType, Dropdown } from "ui-types/types"
import { Ref } from "vue";
import IncomingStudent from "~/models/IncomingStudent"


const { getProfileById } = useProfile()
const client = useSupabaseClient()

let user: Ref<IncomingStudent | undefined> = ref()
    let auth = useSupabaseUser()

onMounted(async () => {
    if (auth.value) {
        let id = auth.value.user_metadata.userId
        let role = auth.value.user_metadata.role

        user.value = (await getProfileById(id, role)) as IncomingStudent
    }
    else {
        console.log("Auth null", auth.value)
    }
})

watch(auth, async (newAuth, oldAuth) => {
    if (newAuth) {
        let id = newAuth.user_metadata.userId
        let role = newAuth.user_metadata.role

        user.value = (await getProfileById(id, role)) as IncomingStudent
    }
    else {
        console.log("Auth null", auth.value)
    }
})

</script>

<template>
    <NavbarIncoming active="Profile" />
    <profile-card :user="user" v-if="user != undefined"/>
</template>

