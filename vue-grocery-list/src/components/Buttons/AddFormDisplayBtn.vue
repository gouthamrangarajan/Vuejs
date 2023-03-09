<script setup lang="ts">
import PlusIcon from '@heroicons/vue/24/solid/PlusIcon'
import { ref } from 'vue'

import useScaleMotion from '@/composables/useScaleMotion'
import { useAddFormStore } from '@/stores/addForm'
const btnEl = ref<HTMLElement>()
const { showAddForm } = useAddFormStore()
useScaleMotion(btnEl)
</script>
<template>
  <button
    class="appearance-none outline-none rounded-full shadow-2xl bg-fuchsia-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-fuchsia-600 focus:ring-offset-fuchsia-50 p-1 font-semibold"
    ref="btnEl" @click="showAddForm">
    <PlusIcon class="w-8 h-8"></PlusIcon>
  </button>
</template>

<style scoped></style>
