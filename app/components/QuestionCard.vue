<script setup lang="ts">
import FAQ from "~/models/FAQ"
import Question from "~~/models/Question";

const props = defineProps<{
    question: Question
}>()

</script>

<template>
    <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">{{props.question.getQuestion()}}</h5>
            <p class="card-text">{{props.question.getAnswer()}}</p>
        </div>
        <div class="card-footer text-muted">
            {{(props.question.getPublishedDate().toDateString())}}
        </div>
    </div>
</template>