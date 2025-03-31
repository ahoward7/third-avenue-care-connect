export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore())
  const { login, adminLogin } = useAuthStore()
  const { user } = useUserSession()

  if (user.value) {
    try {
      const { data: userFromDb } = await useFetch<SitterProfile | FamilyProfile | Admin>('/auth/get-user-by-id', { query: user.value })

      if ((userFromDb.value as SitterProfile | FamilyProfile)?.profileType) {
        login(userFromDb.value as FamilyProfile | SitterProfile)
      }
      else {
        adminLogin(userFromDb.value as Admin)
      }
    }
    catch (e) {
      void e
    }
  }

  if (to.path === '/' || to.path.startsWith('/admin') || to.path.startsWith('/login') || to.path.startsWith('/signup') || to.path.startsWith('/reset-password')) {
    return
  }

  if (!isLoggedIn.value && !to.path.startsWith('/login')) {
    return navigateTo('/login')
  }
})
