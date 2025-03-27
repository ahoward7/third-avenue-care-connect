<template>
  <div class="flex gap-8">
    <img :src="sitterProfile.image" alt="Sitter Image" class="w-40 h-40">
    <div class="flex flex-col gap-2">
      <HomeHeader>
        {{ sitterProfile.firstName }} {{ sitterProfile.lastName }}
      </HomeHeader>
      <div class="flex flex-col gap-4">
        <ProfileField label="Bio" :text="sitterProfile.bio" />
        <ProfileField label="Email" :text="sitterProfile.email" />
        <ProfileField label="Phone" :text="sitterProfile.phone" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  sitterProfile: {
    type: Object as PropType<SitterProfile>,
    required: true,
  },
})
</script>
