<template>
  <div v-if="mode === 'view'">
    <ProfileSitter v-if="profile?.profileType === 'sitter'" :sitter-profile="profile" @edit="mode = 'edit'" />
    <ProfileFamily v-else-if="profile?.profileType === 'family'" :family-profile="profile" @edit="mode = 'edit'" />
  </div>
  <div v-else>
    <ProfileFamilyForm v-if="profile?.profileType === 'family'" :family-profile="profile" @update-profile="updateProfile" @cancel="mode = 'view'" />
    <ProfileSitterForm v-else-if="profile?.profileType === 'sitter'" :sitter-profile="profile" @update-profile="updateProfile" @cancel="mode = 'view'" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const profile = computed(() => authStore.profile)
const mode = ref<'view' | 'edit'>(profile.value?.isCompleted ? 'view' : 'edit')

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
