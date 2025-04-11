export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, profile } = storeToRefs(useAuthStore())
  const { login, adminLogin } = useAuthStore()
  const { session } = useUserSession()

  const { user } = session.value

  if (user && !isLoggedIn.value) {
    try {
      const { data: userFromDb } = await useFetch<SitterProfile | FamilyProfile | Admin>('/auth/get-user-by-id', { query: user })

      if ((userFromDb.value as SitterProfile | FamilyProfile)?.profileType) {
        login(userFromDb.value as FamilyProfile | SitterProfile)
      }
      else {
        adminLogin(userFromDb.value as Admin)
      }
    }
    catch (e) {
      console.error('Failed to fetch user profile:', e)
    }
  }

  if (['/', '/login', '/signup', '/reset-password'].includes(to.path) || to.path.startsWith('/admin')) {
    return
  }

  if (!user) {
    return navigateTo('/login')
  }

  if (isLoggedIn.value && profile.value && !profile.value.isCompleted && to.path !== '/my-profile') {
    return navigateTo('/my-profile')
  }
})
