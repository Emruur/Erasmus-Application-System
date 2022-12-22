<template>
    <NavbarDepartmentCoordinator active="Documents" />
    <form enctype="multipart/form-data" action="http://127.0.0.1:5000" method="POST" class="h-20 d-flex p-5">
        <input id="file" type="file" name="file" class="form-control"/>
        <button class="btn btn-primary" type="submit" @click="authing= true"><IconsUpload v-if="!authing" /> <UtilSpinner v-else/></button>
    </form>
</template>

<script setup lang="ts">

const authing= ref(false)

</script>

<style scoped>
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
