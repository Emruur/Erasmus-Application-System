<script setup lang="ts">
import { Drop } from "esbuild";
import {LinkType,Dropdown} from "ui-types/types"


const props = defineProps<{
  links: LinkType[]
  dropdowns?: Dropdown[]
}>()

</script>


<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Erasmus-Bilkent</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-for="link in props.links" class="nav-item">
          <a class="nav-link" :class="{ active: link.active }" aria-current="page" :href="link.link">{{link.name}}</a>
        </li>
        <li v-for="dropdown in dropdowns" class="nav-item dropdown" :class="{ active: dropdown.active }">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{dropdown.name}}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-for="dropdown_link in dropdown.links">
                <a class="dropdown-item" :href="dropdown_link.link" >{{dropdown_link.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <a class="nav-item m-2 nav-link btn btn-secondary p-2 text-light" href="/logout">Logout</a>
    </div>
  </div>
  
</nav>
</template>

