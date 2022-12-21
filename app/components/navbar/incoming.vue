<script setup lang="ts">
import { LinkType, Dropdown } from '~~/ui-types/types';
const props = defineProps<{
    active: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/student/incoming/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messagess"
    },
    {
        name: "FAQ",
        link: "/student/incoming/faq",
        active: props.active == "FAQ"
    }
]

</script>

<template>
    <navbar :links="links"/>
</template>