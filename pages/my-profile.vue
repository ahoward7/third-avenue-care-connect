<template>
  <div v-if="profile?.isCompleted">
    <ProfileSitter v-if="profile?.profileType === 'sitter'" :sitter-profile="profile" />
    <ProfileFamily v-else :family-profile="profile" />
  </div>
  <div v-else>
    <ProfileFamilyForm v-if="profile?.profileType === 'family'" :family-profile="profile" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const profile = computed(() => authStore.profile)
</script>
