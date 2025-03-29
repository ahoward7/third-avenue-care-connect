export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (to.path === '/' || to.path.startsWith('/admin') || to.path.startsWith('/login') || to.path.startsWith('/signup') || to.path.startsWith('/set-password')) {
    return
  }

  if (!isLoggedIn.value && !to.path.startsWith('/login')) {
    return navigateTo('/login')
  }
})
