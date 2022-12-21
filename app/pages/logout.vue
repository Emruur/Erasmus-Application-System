<template>
    <div class="vh-100 d-flex justify-content-center align-items-center"><UtilSpinner/></div>
    
</template>

<script setup>
const client= useSupabaseClient()

onMounted(()=>{
    logout()
})
async function logout(){
  await client.auth.signOut()
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href= "/login"
}

</script>