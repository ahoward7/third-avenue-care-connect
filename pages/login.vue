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
      <ErrorText v-if="authStore.errors.emailOrPassword" class="mt-4">
        Invalid email or password
      </ErrorText>
      <ErrorText v-if="authStore.errors.server" class="mt-4">
        Server error, please try again later
      </ErrorText>
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
    authStore.resetErrors()

    const profile = await $fetch('/auth/login', {
      method: 'POST',
      body: loginValues,
      headers: { 'Content-Type': 'application/json' },
    }) as FamilyProfile | SitterProfile

    authStore.login(profile)

    window.location.href = '/my-jobs'
  }
  catch (e: any) {
    const statusCode = e.response?.status

    switch (statusCode) {
      case 401:
        authStore.errors.emailOrPassword = true
        break
      case 500:
        authStore.errors.server = true
        break
      default:
        authStore.errors.server = true
        break
    }
  }
  finally {
    loading.value = false
  }
}
</script>
