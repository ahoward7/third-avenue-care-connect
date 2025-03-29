import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const profile: Ref<null | FamilyProfile | SitterProfile> = ref(null)
  const isAdmin = ref(false)
  const accountType: Ref<AccountType> = ref('family')

  function loginAdmin() {
    isLoggedIn.value = true
    isAdmin.value = true
  }

  function login(profileInfo: FamilyProfile | SitterProfile) {
    isLoggedIn.value = true
    accountType.value = profileInfo.profileType
    profile.value = profileInfo
  }

  function logout() {
    isLoggedIn.value = false
    isAdmin.value = false
    profile.value = null
  }

  return {
    isLoggedIn,
    isAdmin,
    accountType,
    loginAdmin,
    login,
    logout,
  }
})
