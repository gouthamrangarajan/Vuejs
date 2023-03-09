<script setup lang="ts">
import useButtonTextStyle from '@/composables/useBtnTextStyle'
import useScaleMotion from '@/composables/useScaleMotion'
import { useGroceryItemsStore } from '@/stores/groceryItems'
import ArrowDownTrayIcon from '@heroicons/vue/24/solid/ArrowDownTrayIcon'
import { useObjectUrl } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'

const { items } = storeToRefs(useGroceryItemsStore())
const aEl = ref<HTMLAnchorElement>()
const btnEl = ref<HTMLButtonElement>()
useScaleMotion(btnEl)
const aElUrl = ref('')
const { style: btnTextStyle, onClick: btnClick } = useButtonTextStyle(() => {
  if (items.value.length > 0) {
    const content = JSON.stringify(items.value)
    const blob = new Blob([content], { type: 'application/json' })
    aElUrl.value = useObjectUrl(blob).value as string
    nextTick(() => {
      aEl.value?.click()
    })
  }
})
</script>
<template>
  <button
    class="appearance-none outline-none rounded-full shadow-2xl bg-purple-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-purple-50 p-1 font-semibold"
    ref="btnEl" @click="btnClick">
    <ArrowDownTrayIcon class="w-7 h-7" :style="btnTextStyle"></ArrowDownTrayIcon>
  </button>
  <a ref="aEl" :href="aElUrl" style="display: none" target="_blank" download="download.json"></a>
</template>

<style scoped></style>
