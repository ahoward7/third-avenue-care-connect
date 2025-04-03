<template>
  <div class="w-inherit flex gap-16 mt-16 font-inter">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Login
      </AuthHeader>
      <AuthLogin @login="login" />
    </div>
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/mother-daughter.png" class="shrink-0 h-96" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

async function login(loginValues: LoginForm) {
  try {
    const profile = await $fetch('/auth/login', {
      method: 'POST',
      body: loginValues,
    }) as FamilyProfile | SitterProfile

    authStore.login(profile)

    window.location.href = '/my-jobs'
  }
  catch (e) {
    console.error('Login failed:', e)
  }
}
</script>
