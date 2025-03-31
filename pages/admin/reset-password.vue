<template>
  <div class="w-inherit flex gap-16 mt-16 font-inter">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Set Password
      </AuthHeader>
      <AuthSetPassword v-if="isValidToken" :user="admin" @set-password="setPassword($event)" />
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

const admin = ref<Admin | null>(null)

const isValidToken = ref(false)

try {
  if (!token) {
    console.error('No token provided')
  }
  else {
    const { data } = await useFetch<Admin>('/admin-user/get-by-token', { method: 'GET', query: { token } })

    if (data.value?.id) {
      isValidToken.value = true
      admin.value = data.value as Admin
    }
    else {
      console.error('Invalid token or admin not found')
    }
  }
}
catch (error) {
  console.error('Error fetching admin:', error)
}

async function setPassword(password: string) {
  const newAdmin: Admin = {
    ...admin.value!,
    password,
  }

  await $fetch('/admin-user/set-password', { method: 'POST', body: newAdmin })
}
</script>
