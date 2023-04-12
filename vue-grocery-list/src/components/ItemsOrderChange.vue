<script setup lang="ts">
import { Grocery_Item_Order, useGroceryItemsStore } from '@/stores/groceryItems'
import { storeToRefs } from 'pinia'
import ChevronUpDownIcon from "@heroicons/vue/24/solid/ChevronUpDownIcon"
import { ref } from 'vue'

const { itemsOrder } = storeToRefs(useGroceryItemsStore())
const { changeItemsOrder } = useGroceryItemsStore()

const changeOrder = (ev: Event) => {
    changeItemsOrder((((ev.target) as HTMLSelectElement).value) as unknown as Grocery_Item_Order)
}

const selectElRef = ref<HTMLSelectElement>()
</script>
<template>
    <div class="flex flex-row items-center gap-2">
        <label class="text-gray-700">Item(s) display order</label>
        <div
            class="relative cursor-pointer rounded w-24 shadow border-2 border-green-600 focus-within:ring-1 focus-within:ring-green-600 focus-within:ring-offset-2 focus-within:ring-offset-green-50 transition-all duration-300">
            <select class="appearance-none outline-none w-full cursor-pointer py-1 px-3 bg-transparent"
                @change="changeOrder" ref="selectElRef">
                <option :selected="itemsOrder == Grocery_Item_Order.NAME" :value="Grocery_Item_Order.NAME">
                    Name</option>
                <option :selected="itemsOrder == Grocery_Item_Order.DATE" :value="Grocery_Item_Order.DATE">
                    Date</option>
            </select>
            <ChevronUpDownIcon class="w-5 h-5 absolute top-[0.4rem] right-1 text-gray-500 -z-10"></ChevronUpDownIcon>
        </div>
    </div>
</template>



<style scoped></style>