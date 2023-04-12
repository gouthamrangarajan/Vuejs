import { computed, readonly, ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
export enum Grocery_Item_Status {
  TO_BUY,
  BOUGHT
}
export enum Grocery_Item_Order {
  NAME,
  DATE
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
  const itemsOrder = ref<Grocery_Item_Order>(Grocery_Item_Order.NAME)
  const itemsToBuy = computed(() =>
    items.value
      .filter((el) => el.status === Grocery_Item_Status.TO_BUY)
      .sort((a, b) => {
        let ret = a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        if (itemsOrder.value == Grocery_Item_Order.DATE)
          ret = a.add_date && b.add_date && a.add_date > b.add_date ? -1 : 1
        return ret
      })
  )
  const itemsBought = computed(() =>
    items.value
      .filter((el) => el.status === Grocery_Item_Status.BOUGHT)
      .sort((a, b) => {
        let ret = a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        if (itemsOrder.value == Grocery_Item_Order.DATE)
          ret = a.bought_date && b.bought_date && a.bought_date > b.bought_date ? -1 : 1
        return ret
      })
  )
  const moveItemToBuy = (item: Grocery_Item) => {
    if (item.status != Grocery_Item_Status.TO_BUY) {
      item.add_date = new Date().toISOString()
      item.bought_date = undefined
      item.status = Grocery_Item_Status.TO_BUY
    }
  }
  const moveItemToBought = (item: Grocery_Item) => {
    if (item.status != Grocery_Item_Status.BOUGHT) {
      item.bought_date = new Date().toISOString()
      item.status = Grocery_Item_Status.BOUGHT
    }
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
  const changeItemsOrder = (order: Grocery_Item_Order) => {
    itemsOrder.value = order
  }
  return {
    items: readonly(items),
    itemsToBuy,
    itemsBought,
    moveItemToBuy,
    moveItemToBought,
    addItem,
    removeItem,
    clearAllItems,
    resetItems,
    itemsOrder,
    changeItemsOrder
  }
})
