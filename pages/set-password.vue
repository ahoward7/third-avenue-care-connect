<template>
  <div class="w-inherit flex gap-16 mt-16 font-inter">
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/hands.png" class="shrink-0 h-96" alt="Hands">
    </div>
    <div class="grow flex flex-col gap-4">
      <AuthHeader class="border-green">
        Set Password
      </AuthHeader>
      <AuthSetPassword @set-password="setPassword($event)" />
    </div>
    <div class="w-72 flex justify-center">
      <img src="~/assets/images/mother-daughter.png" class="shrink-0 h-96" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
async function setPassword(profile: FamilyProfile | SitterProfile) {
  await $fetch('/profile/set-password', { method: 'POST', body: profile })
}
</script>
