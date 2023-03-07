<script setup lang="ts">
import useSlideUpMotion from '@/composables/useSlideUpMotion'
import { ref } from 'vue'

const firstEl = ref<HTMLElement>()
useSlideUpMotion(firstEl, 0)
const secondEl = ref<HTMLElement>()
useSlideUpMotion(secondEl, 100)
const thirdEl = ref<HTMLElement>()
useSlideUpMotion(thirdEl, 200)
const forthEl = ref<HTMLElement>()
useSlideUpMotion(forthEl, 300)
const fifthEl = ref<HTMLElement>()
useSlideUpMotion(fifthEl, 400)
const sixthEl = ref<HTMLElement>()
useSlideUpMotion(sixthEl, 500)
const seventhEl = ref<HTMLElement>()
useSlideUpMotion(seventhEl, 600)
</script>
<template>
  <main class="grid w-full h-full items-center justify-center py-1 px-3">
    <div class="flex flex-col items-start justify-center">
      <span class="text-xl text-gray-700 font-semibold" ref="firstEl">Simple Grocery List</span>
      <ul class="list-disc mt-2 py-4 px-6">
        <li ref="secondEl">Ability to Add/Remove item</li>
        <li ref="thirdEl">Ability to move item from "To Buy" to "Bought Section"</li>
        <li ref="forthEl">Ability to clear all items</li>
        <li ref="fifthEl">Ability to download grocery data so that it can shared across devices</li>
        <li ref="sixthEl">Ability to upload grocery data</li>
      </ul>
      <RouterLink
        ref="seventhEl"
        to="/"
        class="appearance-none outline-none mt-2 text-gray-700 text-lg hover:opacity-90 border-b-2 border-transparent focus:border-green-700 transition-colors duration-300"
        >Home</RouterLink
      >
    </div>
  </main>
</template>

<style></style>
