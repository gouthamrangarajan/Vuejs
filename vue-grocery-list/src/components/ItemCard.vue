<script setup lang="ts">
import { type Grocery_Item, Grocery_Item_Status, useGroceryItemsStore } from '@/stores/groceryItems'
import { computed, ref, watch } from 'vue'
import { useMousePressed, useTimeAgo } from '@vueuse/core'
import { useMotion, type MotionVariants } from '@vueuse/motion'
import MinusCircleIcon from '@heroicons/vue/24/solid/MinusCircleIcon'
import PaperAirplaneIcon from '@heroicons/vue/24/solid/PaperAirplaneIcon'
import { useDraggedItemStore } from '@/stores/draggedItem'

const props = defineProps<{ item: Grocery_Item; type: Grocery_Item_Status }>()
const timeAgoLabelText = computed(() =>
  props.type === Grocery_Item_Status.TO_BUY ? 'Added' : 'Bought'
)
const timeAgoText = computed(() =>
  props.type == Grocery_Item_Status.TO_BUY
    ? useTimeAgo(props.item.add_date as string)
    : useTimeAgo(props.item.bought_date as string)
)
const cardEl = ref<HTMLElement>()
const variants = computed<MotionVariants>(() => ({
  initial: {
    opacity: 0,
    x: props.type == Grocery_Item_Status.TO_BUY ? -10 : 10
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 300,
      type: 'spring',
      damping: 7
    }
  }
}))
useMotion(cardEl, variants)
const { removeItem, moveItemToBought } = useGroceryItemsStore()
const dragEl = ref<HTMLElement>()
const { pressed: allowDrag } = useMousePressed({ target: dragEl })
const { setDraggedItem, clearDraggedItem } = useDraggedItemStore()
watch(allowDrag, (newVal) => {
  if (newVal)
    setDraggedItem(props.item)
  else
    clearDraggedItem()
})
</script>

<template>
  <div :class="[
    'shadow rounded-lg py-2 px-4 w-96 bg-white flex items-stretch gap-3'
  ]" ref="cardEl" :draggable="allowDrag">
    <div :class="['border-2 border-dashed border-emerald-600 w-1.5', allowDrag ? 'cursor-grabbing' : 'cursor-grab']"
      ref="dragEl">
    </div>
    <div class="flex flex-col items-start gap-2 flex-1">
      <div class="flex justify-between w-full items-center">
        <span class="font-semibold underline underline-offset-[6px] text-lg text-gray-600">{{
          item.name
        }}</span>
        <button
          class="outline-none appearance-none text-gray-600 p-1 hover:opacity-90 rounded-full focus:ring-1 focus:ring-gray-600 cursor-pointer transition-all duration-300"
          @click="removeItem(item.name, type)">
          <MinusCircleIcon class="w-5 h-5"></MinusCircleIcon>
        </button>
      </div>
      <div class="flex gap-3 text-sm text-gray-500 items-center">
        <div>
          <span class="italic">Quantity: </span><span class="font-semibold"> {{ item.quantity }}</span>
        </div>
        <div>
          <span class="italic">{{ timeAgoLabelText }}: </span><span class="font-semibold"> {{ timeAgoText }}</span>
        </div>
        <button v-if="item.status == Grocery_Item_Status.TO_BUY"
          class="outline-none appearance-none text-gray-600 p-1 hover:opacity-90 rounded-full focus:ring-1 focus:ring-gray-600 cursor-pointer transition-all duration-300"
          @click="moveItemToBought(item)">
          <PaperAirplaneIcon class="w-5 h-5"></PaperAirplaneIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
