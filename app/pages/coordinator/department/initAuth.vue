<script setup lang="ts">
const {initUserAuth}= useSignup()
 

onMounted(async ()=>{
    await initUserAuth()
})
</script>

<template></template>