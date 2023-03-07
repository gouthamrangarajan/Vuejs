import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGroceryItemsStore, type Grocery_Item } from './groceryItems'
export interface Dragged_Item {
  item: Grocery_Item
  x: number
  y: number
}
export const useDraggedItemStore = defineStore('dragged_item', () => {
  const draggedItem = ref<Dragged_Item>()
  const { moveItemToBought } = useGroceryItemsStore()
  const setDraggedItem = (item: Dragged_Item) => {
    draggedItem.value = item
  }
  const clearDraggedItem = () => {
    if (draggedItemInItemBoughtSection.value && draggedItem.value)
      moveItemToBought(draggedItem.value.item)

    draggedItem.value = undefined
  }
  const draggedItemInItemBoughtSection = ref(false)
  const setDraggedItemInItemBoughtSection = (val: boolean) => {
    draggedItemInItemBoughtSection.value = val
  }
  return { draggedItem, setDraggedItem, clearDraggedItem, setDraggedItemInItemBoughtSection }
})
