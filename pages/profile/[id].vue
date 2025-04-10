<template>
  <div v-if="profile">
    <ProfileSitter v-if="profile?.profileType === 'sitter'" :sitter-profile="profile" />
    <ProfileFamily v-else-if="profile?.profileType === 'family'" :family-profile="profile" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const profile = ref<SitterProfile | FamilyProfile | null>(null)

try {
  const { data: profileFromDb } = await useFetch('/profile-user', {
    method: 'GET',
    query: {
      id,
    },
  })

  if (!profileFromDb.value) {
    throw new Error('Profile not found')
  }

  profile.value = profileFromDb.value
}
catch (error) {
  console.error('Failed to update profile:', error)
}
</script>
