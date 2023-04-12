<script setup lang="ts">
import { Grocery_Item_Status, useGroceryItemsStore } from '@/stores/groceryItems'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import ItemCard from './ItemCard.vue'
import { useDropZone } from '@vueuse/core'
import { useDraggedItemStore } from '@/stores/draggedItem'
const { itemsBought } = storeToRefs(useGroceryItemsStore())
const { setDraggedItemInItemBoughtSection } = useDraggedItemStore()
const containerEl = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(containerEl)
watch(isOverDropZone, (newVal) => {
  if (newVal)
    setDraggedItemInItemBoughtSection(newVal)
  else
    setTimeout(() => { setDraggedItemInItemBoughtSection(newVal) }, 300)
})
</script>
<template>
  <div :class="[
    'py-2 px-4 border-dashed border-2 rounded flex flex-col',
    isOverDropZone ? 'border-green-600' : 'border-transparent'
  ]" ref="containerEl">
    <span class="text-xl text-red-600 font-semibold pl-5" :key="1">Item(s) Bought</span>
    <TransitionGroup name="list" tag="div"
      class="relative py-1 px-3 flex flex-col h-64 lg:h-96 overflow-y-auto w-[22rem] lg:w-[26rem] overflow-x-hidden scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500">
      <div class="mt-4" v-for="item in itemsBought" :key="item.name">
        <ItemCard :item="item" :type="Grocery_Item_Status.BOUGHT"></ItemCard>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
