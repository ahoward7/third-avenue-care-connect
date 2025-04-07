<template>
  <div v-if="profile?.isCompleted">
    <ProfileSitter v-if="profile?.profileType === 'sitter'" :sitter-profile="profile" />
    <ProfileFamily v-else :family-profile="profile" />
  </div>
  <div v-else>
    <ProfileFamilyForm v-if="profile?.profileType === 'family'" :family-profile="profile" @update-profile="updateProfile" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const profile = computed(() => authStore.profile)

async function updateProfile(updatedProfile: SitterProfile | FamilyProfile) {
  try {
    await $fetch('/profile-user/', {
      method: 'PUT',
      body: { ...updatedProfile, id: profile.value?.id || -1 },
    })
  }
  catch (error) {
    console.error('Failed to update profile:', error)
  }
}
</script>
