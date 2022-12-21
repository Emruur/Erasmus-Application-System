<template>
  <NavbarOutgoing active="Placement" />
  <div class="" v-if="!loading && isPlaced != undefined">
    <PlacementNotPlaced v-if="!isPlaced" :student="db_user as OutgoingStudent" />
    <PlacementPlaced v-else :user="db_user as OutgoingStudent" />
  </div>
  <div class="text-center" v-else>
    <UtilSpinner />
  </div>

</template>
<script setup lang="ts">import { ComputedRef, Ref } from 'vue';
import OutgoingStudent from '~~/models/OutgoingStudent';
const { getProfileById } = useProfile()
 
const isPlaced: Ref<boolean | undefined> = ref(undefined)

const user = useSupabaseUser()
const loading = ref(false)

const db_user: Ref<OutgoingStudent | undefined> = ref()

onMounted(async () => {
  await fetchUser()
})

async function fetchUser() {
  loading.value = true
  db_user.value = (await getProfileById(user.value?.user_metadata.userId, "OutgoingStudent")) as OutgoingStudent
  isPlaced.value= db_user.value?.getPlaced_university() != null
  console.log(isPlaced.value)
  loading.value = false
}
</script>