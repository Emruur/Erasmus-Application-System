<script setup lang="ts">
import { LinkType, Dropdown } from '~~/ui-types/types';
const props = defineProps<{
    active: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/instructor/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messages"
    },
    {
        name: "FAQ",
        link: "/instructor/faq",
        active: props.active == "FAQ"
    },
    {
        name: "Approve Courses",
        link: "/instructor/approveCourses",
        active: props.active == "Approve Courses"
    },
    
]

</script>

<template>
    <navbar :links="links"/>
</template>