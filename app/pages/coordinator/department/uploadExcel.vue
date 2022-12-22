<template>
    <NavbarDepartmentCoordinator active="Documents" />
    <form enctype="multipart/form-data" action="http://127.0.0.1:5000" method="POST">
        <input id="file" type="file" name="file" class="form-control"/>
        <button class="btn btn-primary" type="submit" ><IconsUpload/></button>
    </form>
    <button class="btn btn-primary" v-if="!authing" @click="authUsers">authenticate new users</button>
    <button class="btn btn-primary" v-else disabledcd >authenticate new users</button>
    

</template>

<script setup lang="ts">
const fileUploaded = ref()
const {initUserAuth}= useSignup()
const students = ref()
const universities = ref()

const authing= ref(false)

async function authUsers() {
    authing.value= true
    await initUserAuth()
    authing.value= false
    alert("All new users authenticated")
}


</script>

<style scoped>
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
