import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAddFormStore = defineStore('add_form', () => {
  const displayAddForm = ref(false)
  function showAddForm() {
    displayAddForm.value = true
  }
  function hideAddForm() {
    displayAddForm.value = false
  }
  return {
    displayAddForm,
    showAddForm,
    hideAddForm
  }
})
