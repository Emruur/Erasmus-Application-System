<script setup lang="ts">
import { LinkType, Dropdown } from '~~/ui-types/types';

const props = defineProps<{
    active: string
}>()

const links: LinkType[] = [
    {
        name: "Profile",
        link: "/coordinator/department/profile",
        active: props.active == "Profile"
    },
    {
        name: "Messages",
        link: "https://slack.com",
        active: props.active == "Messages"
    },
    {
        name: "FAQ",
        link: "/coordinator/department/faq",
        active: props.active == "FAQ"
    },
    //{
      //  name: "Placements",
        //link: "/coordinator/department/placements",
        //active: props.active == "Placements"
    //},
    {
        name: "Check Courses",
        link: "/coordinator/department/checkCourses",
        active: props.active == "Check Courses"
    },

]

const drops: Dropdown[] = [{
    name: "Approve Documents",
    links: [
        {
            name: "Approve Pre-Approval Form",
            link: "/coordinator/department/approvePreApproval",
            active: true
        },
        {
            name: "Approve Learning Agreement",
            link: "/coordinator/department/approveLearningAgreements",
            active: true
        },
        {
            name: "Approve CTE Documents",
            link: "/coordinator/department/approveCTE",
            active: true
        }
    ],
    active: props.active == "Documents"
}]
</script>

<template>
    <navbar :links="links" :dropdowns="drops"/>
</template>