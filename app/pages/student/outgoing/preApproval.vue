<template>
  <NavbarOutgoing active="Documents"/>
  <div class="container-md">
    <DocEditCard card-code="pa" card-type="Pre Approval" class="mt-4" :user="user" v-if="user"/>
  </div>

</template>

<script setup lang="ts">
import { LinkType } from "~/ui-types/types"

const user= useSupabaseUser()
</script>