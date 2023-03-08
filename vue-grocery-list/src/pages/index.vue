<script setup lang="ts">
import AddForm from '@/components/AddForm.vue'
import AddFormDisplayBtn from '@/components/Buttons/AddFormDisplayBtn.vue'
import ItemsToBuy from '@/components/ItemsToBuy.vue'
import ItemsBought from '@/components/ItemsBought.vue'

import { storeToRefs } from 'pinia'
import ClearAllBtn from '@/components/Buttons/ClearAllBtn.vue'
import { useAddFormStore } from '@/stores/addForm'
import DownloadBtn from '@/components/Buttons/DownloadBtn.vue'
import UploadBtn from '@/components/Buttons/UploadBtn.vue'

const { displayAddForm } = storeToRefs(useAddFormStore())
</script>

<template>
  <main
    class="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center items-center w-full h-full py-1 px-3"
  >
    <div class="w-full flex justify-start lg:justify-end">
      <ItemsToBuy></ItemsToBuy>
    </div>
    <div class="w-full flex justify-start">
      <ItemsBought></ItemsBought>
    </div>

    <div class="lg:col-span-2 pb-14 lg:pb-4 flex justify-center">
      <RouterLink
        to="/about"
        class="appearance-none outline-none mr-14 text-gray-700 text-lg hover:opacity-90 border-b-2 border-transparent focus:border-green-700 transition-all duration-300"
        >About</RouterLink
      >
    </div>
    <transition-group
      tag="div"
      name="list"
      class="fixed bottom-0 w-full left-0 flex items-end justify-around py-1 px-3 lg:py-0 lg:px-0"
    >
      <div class="mb-2 lg:mb-4" :key="1">
        <ClearAllBtn></ClearAllBtn>
      </div>
      <div class="flex pl-1 lg:pl-0 w-80 lg:w-96 justify-end gap-1 lg:gap-3 mb-2 lg:mb-4" :key="2">
        <DownloadBtn></DownloadBtn>
        <UploadBtn></UploadBtn>
      </div>
      <div class="w-80 lg:w-96 flex justify-end pr-2 lg:pr-0" :key="3">
        <transition name="fade" mode="out-in">
          <div v-if="displayAddForm" class="w-full">
            <AddForm></AddForm>
          </div>
          <div v-else class="mb-2 lg:mb-4">
            <AddFormDisplayBtn></AddFormDisplayBtn>
          </div>
        </transition>
      </div>
    </transition-group>
  </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
