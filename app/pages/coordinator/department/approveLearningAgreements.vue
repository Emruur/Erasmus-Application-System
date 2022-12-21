<script setup lang="ts">
import { LinkType } from '~~/ui-types/types';


const subPage= ref("bm")


</script>


<template>
<NavbarDepartmentCoordinator active="Documents"/>
    <div class="d-flex justify-content-center">
        <ul class="nav nav-tabs m-2">
            <li class="nav-item">
                <a class="nav-link" :class="{active: subPage=='bm'}" aria-current="page" href="#" @click="subPage='bm'" >Before Mobility</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{active: subPage=='dm'}" href="#" @click="subPage='dm'" >During Mobility</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  :class="{active: subPage=='am'}" href="#" @click="subPage='am'" >After Mobility</a>
            </li>
        </ul>
    </div>
    <DocListCard type='la-bm' v-if="subPage=='bm'"/>
    <DocListCard type='la-dm' v-if="subPage=='dm'"/>
    <DocListCard type='la-am' v-if="subPage=='am'"/>
</template>