<script lang="ts" setup>
import { userInfo } from 'os';

const supabaseClient = useSupabaseClient();


const mail = ref("")
const password = ref("")
const loading = ref(false)
const errorMessage = ref("You should check in on some of those fields above.")
const user = useSupabaseUser()

const displayErrorMessage = ref(false)
const displaySuccessMessage = ref(false)

const dismissError = () => { displayErrorMessage.value = false; displaySuccessMessage.value = false }

onMounted(() => {
  if (user.value) {
    loading.value = true
    navigationCheck(user.value.user_metadata.role)
    loading.value = false
  }
})

function navigationCheck(role: string) {
  if (role == "DepartmentCoordinator")
    return window.location.replace("/coordinator/department/profile");
  else if (role == "ExchangeCoordinator")
    return window.location.replace("/coordinator/exchange/profile");
  else if (role == "Instructor")
    return window.location.replace("/instructor/profile");
  else if (role == "Advisor")
    return window.location.replace("/advisor/profile");
  else if (role == "IncomingStudent")
    return window.location.replace("/student/incoming/profile");
  else if (role == "OutgoingStudent") {
    console.log("navigating to outgoing student")
    return window.location.replace("/student/outgoing/profile");
  }
  else
    return window.location.replace("/login");
}
const signInEmail = async () => {

  loading.value = true

  displayErrorMessage.value = false
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: mail.value,
    password: password.value,
  });
  if (error) {
    displayErrorMessage.value = true
    console.log(error)
    loading.value = false
  }
  else {
    if (data && data.user && !error) {
      navigationCheck(data.user?.user_metadata.role)
      loading.value = false
    }
  }
  mail.value = ""
  password.value = ""


}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 flex-column ">
    <form class="bg-light p-5 rounded-4">
      <div class="mb3">
        <h2>Erasmus Bilkent</h2>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input v-model="mail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">Login with your Bilkent credentials</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button @click.prevent="signInEmail" v-if="!loading" type="submit" class="btn btn-primary">Login</button>
      <button v-else type="submit" class="btn btn-primary disabled">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>

    </form>
    <div v-if="displayErrorMessage" class="alert alert-warning mt-4" role="alert">
      <strong>Error!</strong> {{ errorMessage }}
      <button type="button" @click="dismissError" class="btn-close"></button>
    </div>
  </div>

</template>

<style>
html {
  padding: 0;
  margin: 0;
}
</style>