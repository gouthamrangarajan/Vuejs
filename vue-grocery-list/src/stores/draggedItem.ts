import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGroceryItemsStore, type Grocery_Item } from './groceryItems'

export const useDraggedItemStore = defineStore('dragged_item', () => {
  const draggedItem = ref<Grocery_Item>()
  const { moveItemToBought, moveItemToBuy } = useGroceryItemsStore()
  const setDraggedItem = (item: Grocery_Item) => {
    draggedItem.value = item
  }
  const clearDraggedItem = () => {
    if (draggedItem.value) {
      if (draggedItemInItemBoughtSection.value)
        moveItemToBought(draggedItem.value)
      else if (draggedItemInItemToBuySection.value)
        moveItemToBuy(draggedItem.value)
    }
    draggedItem.value = undefined
  }
  const draggedItemInItemToBuySection = ref(false)
  const setDraggedItemInItemToBuySection = (val: boolean) => {
    draggedItemInItemToBuySection.value = val
  }
  const draggedItemInItemBoughtSection = ref(false)
  const setDraggedItemInItemBoughtSection = (val: boolean) => {
    draggedItemInItemBoughtSection.value = val
  }
  return { draggedItem, setDraggedItem, clearDraggedItem, setDraggedItemInItemBoughtSection, setDraggedItemInItemToBuySection }
})
