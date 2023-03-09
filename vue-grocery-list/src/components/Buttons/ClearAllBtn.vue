<script setup lang="ts">
import TrashIcon from '@heroicons/vue/24/solid/TrashIcon'
import { ref } from 'vue'
import { useGroceryItemsStore } from '@/stores/groceryItems'
import useScaleMotion from '@/composables/useScaleMotion'
import useButtonTextStyle from '@/composables/useBtnTextStyle'
const btnEl = ref<HTMLElement>()
const { clearAllItems } = useGroceryItemsStore()
useScaleMotion(btnEl)
const { onClick: btnClick, style: btnTextStyle } = useButtonTextStyle(clearAllItems)
</script>
<template>
  <button
    class="appearance-none outline-none rounded-full shadow-2xl bg-red-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-50 p-1 font-semibold"
    ref="btnEl" @click="btnClick">
    <TrashIcon class="w-6 h-6" :style="btnTextStyle"></TrashIcon>
  </button>
</template>

<style scoped></style>
