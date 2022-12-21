<script setup lang="ts">
import { propsToAttrMap } from '@vue/shared';
import { LinkType, Dropdown } from '~~/ui-types/types';

const props = defineProps<{
    active?: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/advisor/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messages"
    },
    {
        name: "FAQ",
        link: "/advisor/viewFaq",
        active: props.active == "FAQ"
    },
    {
        name: "Grant Information",
        link: "/advisor/grantInfo",
        active: props.active == "Grant Information"
    },
    
]



</script>

<template>
    <navbar :links="links"/>
</template>