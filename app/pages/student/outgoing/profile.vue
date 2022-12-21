<script setup lang="ts">
import { User } from "@supabase/gotrue-js";
import { LinkType, Dropdown } from "ui-types/types"
import { Ref } from "vue";
import OutgoingStudent from "~/models/OutgoingStudent"


const { getProfileById } = useProfile()
const client = useSupabaseClient()

let user: Ref<OutgoingStudent | undefined> = ref()
let auth = useSupabaseUser()

onMounted(async () => {
    if (auth.value) {
        let id = auth.value.user_metadata.userId
        let role = auth.value.user_metadata.role

        user.value = (await getProfileById(id, role)) as OutgoingStudent
    }
    else {
        console.log("Auth null", auth.value)
    }
})

watch(auth, async (newAuth, oldAuth) => {
    if (newAuth) {
        let id = newAuth.user_metadata.userId
        let role = newAuth.user_metadata.role

        user.value = (await getProfileById(id, role)) as OutgoingStudent
    }
    else {
        console.log("Auth null", auth.value)
    }
})

</script>

<template>
    <NavbarOutgoing active="Profile" />
    <profile-card :user="user" v-if="user != undefined" />
    <div class="justify-content-center d-flex align-items-center" style="height: 80vh;" v-else>
        <UtilSpinner/>
    </div>
    
</template>