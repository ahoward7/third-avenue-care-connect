export default defineNuxtRouteMiddleware(async (to) => {
  const { isAdmin } = storeToRefs(useAuthStore())

  if (!isAdmin.value && !to.path.includes('/admin/login')) {
    return navigateTo('/admin/login')
  }
})
