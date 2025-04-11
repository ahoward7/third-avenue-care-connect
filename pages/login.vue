<template>
  <div class="w-inherit flex gap-16 mt-16">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Login
      </AuthHeader>
      <AuthLogin @login="login" />
      <TACCSpinner v-if="loading" class="mt-8 mx-auto" />
    </div>
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/mother-daughter.png" class="shrink-0 h-96" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const loading = ref(false)

async function login(loginValues: LoginForm) {
  loading.value = true

  try {
    const profile = await $fetch('/auth/login', {
      method: 'POST',
      body: loginValues,
      headers: { 'Content-Type': 'application/json' },
    }) as FamilyProfile | SitterProfile

    authStore.login(profile)

    window.location.href = '/my-jobs'
  }
  catch (e) {
    console.error('Login failed:', e)
  }
  finally {
    loading.value = false
  }
}
</script>
