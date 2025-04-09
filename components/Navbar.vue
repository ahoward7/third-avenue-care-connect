<template>
  <div class="w-full max-w-[1000px] flex justify-between">
    <NuxtLink to="/" class="flex gap-4 items-center">
      <img src="~/assets/images/logo.png" class="h-14" alt="Logo">
      <AppTitle size="small" />
    </NuxtLink>
    <div class="flex items-center gap-4">
      <template v-if="navbarMode === 'loggedOut'">
        <TACCButton class="bg-green" to="/signup">
          Signup
        </TACCButton>
        <TACCButton class="bg-yellow" to="/login">
          Login
        </TACCButton>
      </template>
      <template v-else-if="navbarMode === 'sitter' && profileComplete">
        <TACCButton class="bg-green" to="/jobs">
          Browse Jobs
        </TACCButton>
        <TACCButton class="bg-purple" to="/my-jobs">
          My Jobs
        </TACCButton>
      </template>
      <template v-else-if="navbarMode === 'family' && profileComplete">
        <TACCButton class="bg-green" to="/post-job">
          Post a Job
        </TACCButton>
        <TACCButton class="bg-purple" to="/my-jobs">
          Pending Jobs
        </TACCButton>
      </template>
      <TACCButton v-if="navbarMode === 'sitter' || navbarMode === 'family'" class="bg-yellow" to="/my-profile">
        Profile
      </TACCButton>
      <template v-else-if="navbarMode === 'admin'">
        <TACCButton class="bg-purple" to="/admin">
          Profile List
        </TACCButton>
      </template>
      <TACCButton v-if="authStore.isLoggedIn" class="bg-red/80" @click="logout">
        Logout
      </TACCButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { clear, user } = useUserSession()
const authStore = useAuthStore()

const navbarMode = computed(() => {
  if (!authStore.isLoggedIn && !user.value) {
    return 'loggedOut'
  }

  if (authStore.isAdmin) {
    return 'admin'
  }

  return authStore.accountType
})

const profileComplete = computed(() => {
  return authStore.profile?.isCompleted
})

async function logout() {
  await clear()
  authStore.logout()
  navigateTo('/')
}
</script>
