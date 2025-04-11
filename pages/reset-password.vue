<template>
  <div class="w-inherit flex gap-16 mt-16">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Set Password
      </AuthHeader>
      <AuthSetPassword v-if="isValidToken" :user="profile" @set-password="setPassword($event)" />
      <ErrorText v-else>
        Looks like your password reset link is invalid or has expired. Please contact an admin to generate a new link.
      </ErrorText>
      <ErrorText v-if="authStore.errors.setPassword">
        There was an error setting your password. Please try again.
      </ErrorText>
    </div>
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/mother-daughter.png" class="shrink-0 h-96" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const query = route.query
const token = query.token as string | undefined

const authStore = useAuthStore()
const loading = ref(false)

const isValidToken = ref(false)

const { data: profile } = await useFetch<FamilyProfile | SitterProfile | null>('/profile-user', { method: 'GET', query: { token } })

if (profile.value?.id) {
  isValidToken.value = true
}
else {
  console.error('Invalid token or profile not found')
}

async function setPassword(password: string) {
  loading.value = true

  const newProfile = {
    ...profile.value!,
    password,
  }

  try {
    await $fetch('/profile-user/set-password', { method: 'POST', body: newProfile })
    navigateTo('/login')
  }
  catch (error) {
    console.error('Error setting password:', error)
    authStore.errors.setPassword = true
  }
  finally {
    loading.value = false
  }
}
</script>
