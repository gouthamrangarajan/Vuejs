<script setup lang="ts">
import useButtonTextStyle from '@/composables/useBtnTextStyle'
import useScaleMotion from '@/composables/useScaleMotion'
import { useGroceryItemsStore, type Grocery_Item } from '@/stores/groceryItems'

import ArrowUpTrayIcon from '@heroicons/vue/24/solid/ArrowUpTrayIcon'
import { useFileDialog, useFileSystemAccess } from '@vueuse/core'
import { ref, watch } from 'vue'

const { resetItems } = useGroceryItemsStore()
const { files: fileDialogFiles, open: openFileDialog, reset: resetFileDialog } = useFileDialog()
const {
  file: fileSystemAccessFile,
  data: fileData,
  updateData: refreshFileData
} = useFileSystemAccess({ dataType: 'Text' })
const btnEl = ref<HTMLButtonElement>()
useScaleMotion(btnEl)
const { style: btnTextStyle, onClick: btnClick } = useButtonTextStyle(() => {
  openFileDialog({ multiple: false, accept: 'application/json' })
})
watch(fileDialogFiles, async (newVal) => {
  if (newVal && newVal.length == 1) {
    try {
      const fl = newVal[0]
      if (fl.type == 'application/json') {
        fileSystemAccessFile.value = fl
        await refreshFileData()
        const dt = JSON.parse(fileData.value as string) as Array<Grocery_Item>
        if (dt.length > 0) {
          resetItems(dt)
          resetFileDialog()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
})
</script>
<template>
  <button
    class="appearance-none outline-none rounded-full shadow-2xl bg-purple-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-purple-50 p-1 font-semibold"
    ref="btnEl" @click="btnClick">
    <ArrowUpTrayIcon class="w-7 h-7" :style="btnTextStyle"></ArrowUpTrayIcon>
  </button>
</template>

<style scoped></style>
