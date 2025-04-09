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
      <div v-else class="bg-red/80 text-center text-white px-2 py-3 rounded-md">
        Looks like your password reset link is invalid or has expired. Please contact an admin to generate a new link.
      </div>
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

const profile = ref<FamilyProfile | SitterProfile | null>(null)

const isValidToken = ref(false)

try {
  const { data } = await useFetch('/profile-user/get-by-token', { method: 'GET', query: { token } })

  if (data.value?.id) {
    isValidToken.value = true
    profile.value = data.value
  }
  else {
    console.error('Invalid token or profile not found')
  }
}
catch (error) {
  console.error('Error fetching profile:', error)
}

async function setPassword(password: string) {
  const newProfile = {
    ...profile.value!,
    password,
  }

  await $fetch('/profile-user/set-password', { method: 'POST', body: newProfile })

  navigateTo('/login')
}
</script>
