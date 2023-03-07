import { computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
export enum Grocery_Item_Status {
  TO_BUY,
  BOUGHT
}
export interface Grocery_Item {
  name: string
  quantity: number
  add_date?: string
  status?: Grocery_Item_Status
  bought_date?: string
}

export const useGroceryItemsStore = defineStore('grocery_items', () => {
  const items = useLocalStorage<Array<Grocery_Item>>('grocery_items', [])
  const itemsToBuy = computed(() =>
    items.value
      .filter((el) => el.status === Grocery_Item_Status.TO_BUY)
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
  )
  const itemsBought = computed(() =>
    items.value
      .filter((el) => el.status === Grocery_Item_Status.BOUGHT)
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
  )
  const moveItemToBought = (item: Grocery_Item) => {
    item.bought_date = new Date().toISOString()
    item.status = Grocery_Item_Status.BOUGHT
  }
  const addItem = (item: Grocery_Item) => {
    item.add_date = new Date().toISOString()
    item.status = Grocery_Item_Status.TO_BUY
    const ft = items.value.filter(
      (el) =>
        el.name.toLowerCase() === item.name.toLowerCase() &&
        el.status === Grocery_Item_Status.TO_BUY
    )[0]
    if (ft) {
      ft.quantity += item.quantity
      ft.add_date = item.add_date
    } else {
      items.value.push(item)
    }
  }
  const removeItem = (name: string, status: Grocery_Item_Status) => {
    const ft = items.value.filter(
      (el) => el.name.toLowerCase() === name.toLowerCase() && el.status === status
    )[0]
    if (ft) {
      const ind = items.value.findIndex((el) => el.name === ft.name && el.status === ft.status)
      items.value.splice(ind, 1)
    }
  }
  const clearAllItems = () => {
    items.value = []
  }
  const resetItems = (initItems: Array<Grocery_Item>) => {
    items.value = initItems
  }
  return {
    items: readonly(items),
    itemsToBuy,
    itemsBought,
    moveItemToBought,
    addItem,
    removeItem,
    clearAllItems,
    resetItems
  }
})
