<script setup lang="ts">
    import User from "~/models/User"

    const props = defineProps<{
        user: User
    }>()
</script>

<template>
  <div class="row">
    <div class="col d-flex justify-content-center align-items-center p-5">
        <IconsAvatar style="width:15rem;height:15rem"/>
    </div>
    <div class="col p-5">
      <div class="bg-dark rounded p-3 ps-4">
        <h2 class="text-light mb-0">{{props.user.getName() + " " + props.user.getSurname()}}</h2>
        <p class="text-secondary ">{{props.user.getRole()}}</p>
      </div>
      <div class="mt-3">
        <h4 class="d-inline">E-mail: </h4> <p class="d-inline ms-3">{{props.user.getEmail()}}</p>
      </div>
      <div class="mt-1">
        <h4 class="d-inline">Bilkent ID: </h4> <p class="d-inline ms-3">{{props.user.getId()}}</p>
      </div>
      <div class="mt-1">
        <h4 class="d-inline">Phone Number: </h4> <p class="d-inline ms-3">{{props.user.getPhone()}}</p>
      </div>
    </div>
  </div>
</template>