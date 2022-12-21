<script setup lang="ts">
import { LinkType, Dropdown } from '~~/ui-types/types';

const props = defineProps<{
    active: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/student/outgoing/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messages"
    },
    {
        name: "FAQ",
        link: "/student/outgoing/faq",
        active: props.active == "FAQ"
    },
    {
        name: "Placement",
        link: "/student/outgoing/editPlacement",
        active: props.active == "Placement"
    },
    {
        name: "Request Courses",
        link: "/student/outgoing/reguestCourses",
        active: props.active == "Request Courses"
    },

]

const drops: Dropdown[] = [{
    name: "Documents",
    active: props.active == "Documents",
    links: [
        {
            name: "Pre-Approval Form",
            link: "/student/outgoing/preApproval",
            active: true
        },
        {
            name: "Learning Agreement",
            link: "/student/outgoing/LearningAgreement",
            active: true
        },
        {
            name: "Grant Document",
            link: "/student/outgoing/grantDocument",
            active: false
        },
        {
            name: "After Mobility Documents",
            link: "/student/outgoing/cteDocument",
            active: false
        }
    ]
}]
</script>

<template>
    <navbar :links="links" :dropdowns="drops"/>
</template>