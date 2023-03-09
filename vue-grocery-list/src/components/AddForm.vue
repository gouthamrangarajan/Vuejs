<script setup lang="ts">
import { onMounted, ref } from 'vue'
import XMarkIcon from '@heroicons/vue/24/solid/XMarkIcon'
import { useAddFormStore } from '@/stores/addForm'
import { useGroceryItemsStore } from '@/stores/groceryItems'
import useButtonTextStyle from '@/composables/useBtnTextStyle'
import { onClickOutside } from '@vueuse/core'
import useSlideUpMotion from '@/composables/useSlideUpMotion'

const formEl = ref<HTMLElement>()
const { hideAddForm } = useAddFormStore()
onClickOutside(formEl, hideAddForm)
useSlideUpMotion(formEl, 0)
const { addItem } = useGroceryItemsStore()
const itemName = ref<string>('')
const elToFocus = ref<HTMLElement>()
onMounted(() => {
  elToFocus.value?.focus()
})
const itemQuantity = ref<number>()
const addItemToStore = () => {
  if (itemName.value && itemQuantity.value && itemQuantity.value > 0) {
    addItem({ name: itemName.value, quantity: itemQuantity.value })
    itemName.value = ''
    itemQuantity.value = undefined
  }
}
const { style: btnTextStyle, onClick: submit } = useButtonTextStyle(addItemToStore)
</script>
<template>
  <div class="shadow-2xl rounded-t-lg bg-white py-2 lg:py-4 px-4 lg:px-6 flex flex-col w-full z-10" ref="formEl">
    <div class="flex justify-between items-start border-b-2 border-gray-300">
      <span class="text-green-600 text-lg font-semibold">Add Item</span>
      <button
        class="appearance-none outline-none -mr-3 -mt-1 lg:-mt-3 rounded-full bg-gray-600 text-white hover:bg-opacity-90 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-gray-600 focus:ring-offset-gray-50 p-1"
        @click="hideAddForm">
        <XMarkIcon class="w-4 h-4"></XMarkIcon>
      </button>
    </div>
    <div class="flex flex-col mt-6 gap-6">
      <input type="text" placeholder="Item e.g Apple"
        class="outline-none appearance-none py-1 border-b-2 border-gray-300 focus:border-green-600 transition-colors duration-300 placeholder:italic placeholder:text-gray-600"
        v-model.trim="itemName" @keyup.enter="addItemToStore" ref="elToFocus" />
      <input type="number" placeholder="Quantity e.g 2"
        class="outline-none appearance-none py-1 border-b-2 border-gray-300 focus:border-green-600 transition-colors duration-300 placeholder:italic placeholder:text-gray-600"
        v-model.number="itemQuantity" min="1" @keyup.enter="addItemToStore" />
      <button
        class="appearance-none outline-none uppercase flex justify-center rounded bg-green-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-green-600 focus:ring-offset-green-50 py-1 px-3"
        @click="submit">
        <span :style="btnTextStyle">Submit</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
