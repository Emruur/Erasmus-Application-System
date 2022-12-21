<script setup lang="ts">
import FAQ from "~/models/FAQ"

const {getFaqs} = useFaq()
let faq: FAQ = await getFaqs();

</script>

<template>
    <div class="container-sm">
        <h1 class="text-center">FAQ Page</h1>
        <QuestionCard v-for="q in faq.getQuestions()" :question="q" class="m-5"/>
        <p class="text-center">Can't find your question <a href="#">Contact Here</a></p>
    </div>
</template>
