import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const profile: Ref<null | FamilyProfile | SitterProfile> = ref(null)
  const admin: Ref<null | Admin> = ref(null)
  const isAdmin = ref(false)
  const accountType: Ref<AccountType> = ref('family')

  function adminLogin(adminInfo: Admin) {
    isLoggedIn.value = true
    isAdmin.value = true
    admin.value = adminInfo
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
    login,
    adminLogin,
    logout,
  }
})
