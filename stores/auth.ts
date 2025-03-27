import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const accountType: Ref<AccountType> = ref('family')

  return {
    isLoggedIn,
    accountType,
  }
})
