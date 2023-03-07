<script setup lang="ts">
import { Grocery_Item_Status, useGroceryItemsStore } from '@/stores/groceryItems'
import { storeToRefs } from 'pinia'
import ItemCard from './ItemCard.vue'

const { itemsToBuy } = storeToRefs(useGroceryItemsStore())
</script>
<template>
  <div class="py-2 px-4 border-dashed border-2 rounded border-transparent flex flex-col">
    <span class="text-xl text-fuchsia-600 font-semibold pl-5" :key="1">Item(s) To Buy</span>
    <TransitionGroup
      name="list"
      tag="div"
      class="relative py-1 px-3 flex flex-col w-96 h-96 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500"
    >
      <div class="mt-4" v-for="item in itemsToBuy" :key="item.name">
        <ItemCard :item="item" :type="Grocery_Item_Status.TO_BUY"></ItemCard>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
