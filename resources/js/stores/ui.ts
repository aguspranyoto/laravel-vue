import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const mobileNavOpen = ref(false)

  function toggleNav(value?: boolean) {
    mobileNavOpen.value = value ?? !mobileNavOpen.value
  }

  return { mobileNavOpen, toggleNav }
})
