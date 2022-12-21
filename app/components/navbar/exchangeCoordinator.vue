<script setup lang="ts">
import { LinkType, Dropdown } from '~~/ui-types/types';

const props = defineProps<{
    active: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/coordinator/exchange/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messages"
    },
    {
        name: "FAQ",
        link: "/coordinator/exchange/faq",
        active: props.active == "FAQ"
    },
    {
        name: "Grant Document",
        link: "/coordinator/exchange/grantDocument",
        active: props.active == "Grant Document"
    }

]


</script>

<template>
    <navbar :links="links"/>
</template>