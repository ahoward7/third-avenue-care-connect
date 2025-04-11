<template>
  <div class="w-inherit flex gap-16 mt-16">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Add New Admin
      </AuthHeader>
      <TACCInput v-model="email" placeholder="Email" />
      <TACCButton class="w-full bg-yellow" @click="addAdmin">
        Add Admin
      </TACCButton>
      <ErrorText v-if="authStore.errors.addAdmin">
        There was an error adding the admin. Please try again.
      </ErrorText>
    </div>
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/mother-daughter.png" class="shrink-0 h-96" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const toastStore = useToastStore()

const email = ref('')

async function addAdmin() {
  if (!email.value) {
    return
  }

  try {
    const user = await $fetch<Admin>('/admin-user/new', {
      method: 'POST',
      body: JSON.stringify({ email: email.value }),
    })

    if (user) {
      authStore.adminLogin(user)
      navigateTo('/')
    }

    toastStore.addToast({
      type: 'success',
      message: 'Admin added successfully',
    })
  }
  catch (error) {
    console.error('Error adding admin:', error)
    authStore.errors.addAdmin = true
  }
  finally {
    email.value = ''
  }
}
</script>
