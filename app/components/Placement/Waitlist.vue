<template>
    <div class="">
        <div class="container-sm">
            <label for="a" class="form-label">Choice: {{uniName}}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    uniName: string
}>()
</script>

<style scoped>
.form-label {
  color: rgb(85, 85, 85);
  font-weight:600 ;
}

</style>