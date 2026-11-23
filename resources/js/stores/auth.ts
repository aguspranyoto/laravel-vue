import type { AuthUser } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)

  function setUser(value: AuthUser | null) {
    user.value = value
  }

  return { user, setUser }
})
