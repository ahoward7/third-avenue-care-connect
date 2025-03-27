<template>
  <div class="w-full max-w-[1000px] flex justify-between">
    <NuxtLink to="/" class="flex gap-4 items-center">
      <img src="~/assets/images/logo.png" class="h-14" alt="Logo">
      <AppTitle size="small" />
    </NuxtLink>
    <div class="flex items-center gap-4">
      <TACCButton v-if="navbarMode === 'loggedOut'" class="bg-green" to="/signup">
        Signup
      </TACCButton>
      <TACCButton v-if="navbarMode === 'loggedOut'" class="bg-yellow" to="/login">
        Login
      </TACCButton>
      <TACCButton v-if="navbarMode === 'sitter'" class="bg-green" to="/jobs">
        Browse Jobs
      </TACCButton>
      <TACCButton v-if="navbarMode === 'family'" class="bg-green" to="/post-job">
        Post a Job
      </TACCButton>
      <TACCButton v-if="navbarMode === 'sitter'" class="bg-purple" to="/my-jobs">
        My Jobs
      </TACCButton>
      <TACCButton v-if="navbarMode === 'family'" class="bg-purple" to="/my-jobs">
        Pending Jobs
      </TACCButton>
      <TACCButton v-if="navbarMode === 'sitter' || navbarMode === 'family'" class="bg-yellow" to="/my-profile">
        Profile
      </TACCButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const navbarMode = computed(() => {
  if (!authStore.isLoggedIn) {
    return 'loggedOut'
  }

  return authStore.accountType
})
</script>
