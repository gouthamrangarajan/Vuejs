<script setup lang="ts">
import { useDraggedItemStore } from '@/stores/draggedItem'
import { Grocery_Item_Status, useGroceryItemsStore } from '@/stores/groceryItems'
import { useElementBounding } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import ItemCard from './ItemCard.vue'
const { itemsBought } = storeToRefs(useGroceryItemsStore())
const { draggedItem } = storeToRefs(useDraggedItemStore())
const { setDraggedItemInItemBoughtSection } = useDraggedItemStore()
const containerEl = ref<HTMLDivElement>()
const {
  x: containerElX,
  y: containerElY,
  width: containerElWidth,
  height: containerElHeight
} = useElementBounding(containerEl)
const isOverDropZone = computed(() => {
  if (draggedItem.value) {
    if (
      containerElX.value <= draggedItem.value.x &&
      containerElY.value <= draggedItem.value.y &&
      draggedItem.value.x <= containerElX.value + containerElWidth.value &&
      draggedItem.value.y <= containerElY.value + containerElHeight.value
    ) {
      return true
    }
  }
  return false
})
watch(isOverDropZone, (newVal) => {
  setDraggedItemInItemBoughtSection(newVal)
})
</script>
<template>
  <div
    :class="[
      'py-2 px-4 border-dashed border-2 rounded flex flex-col',
      isOverDropZone ? 'border-green-600' : 'border-transparent'
    ]"
    ref="containerEl"
  >
    <span class="text-xl text-red-600 font-semibold pl-5" :key="1">Item(s) Bought</span>
    <TransitionGroup
      name="list"
      tag="div"
      class="relative py-1 px-3 flex flex-col h-64 lg:h-96 overflow-y-auto w-[22rem] lg:w-96 overflow-x-hidden scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500"
    >
      <div class="mt-4" v-for="item in itemsBought" :key="item.name">
        <ItemCard :item="item" :type="Grocery_Item_Status.BOUGHT"></ItemCard>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
