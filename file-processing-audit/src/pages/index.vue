<script setup lang="ts">
import SearchBox from "@/components/SearchBox.vue"
import SearchResults from "@/components/SearchResults.vue"
</script>
<template>
    <main class="py-2 px-4 flex flex-col  w-full max-w-7xl mx-auto">
        <div class="w-full text-center pt-2">
            <span class="text-2xl font-semibold text-indigo-600">Review File(s) Processed</span>
        </div>
        <div class="mt-8 w-full">
            <SearchBox></SearchBox>
        </div>
        <div class="mt-8 w-full">
            <SearchResults></SearchResults>
        </div>
    </main>
</template>



<style scoped></style>