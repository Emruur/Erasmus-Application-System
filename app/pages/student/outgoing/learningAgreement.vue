<template>
  <NavbarOutgoing active="Documents" />
  <div class="container-sm d-flex flex-column">
    <DocEditCard cardType='Before Mobility' cardCode="la-bm" :user="user" class="mt-2" v-if="user" />
    <DocEditCard cardType="During Mobility" :user="user" cardCode="la-dm" class="mt-2" v-if="user" />
    <DocEditCard cardType="After Mobility" :user="user" cardCode="la-am" class="mt-2" v-if="user" />
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser()

</script>
