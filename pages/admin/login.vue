<template>
  <div class="w-inherit flex gap-16 mt-16">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Admin Login
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

async function login(loginInfo: LoginForm) {
  loading.value = true

  try {
    const user = await $fetch<Admin>('/admin-user/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
    })

    if (user.id) {
      authStore.adminLogin(user)
      navigateTo('/admin')
    }
  }
  catch (error) {
    console.error('Login failed:', error)
  }
  finally {
    loading.value = false
  }
}
</script>
