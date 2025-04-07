<template>
  <div class="flex gap-16 mt-8">
    <img :src="sitterProfile.image" alt="Sitter Image" class="fun-border w-60 h-60">
    <div class="flex flex-col gap-2">
      <HomeHeader>
        {{ sitterProfile.firstName }} {{ sitterProfile.lastName }}
      </HomeHeader>
      <div class="flex flex-col gap-4">
        <ProfileField label="Bio" :text="sitterProfile.bio" />
        <ProfileField label="Email" :text="sitterProfile.email" />
        <ProfileField label="Phone" :text="sitterProfile.phone" />
      </div>
      <TACCButton v-if="sitterProfile.isCompleted" class="bg-yellow mt-4" @click="emit('edit')">
        Edit Profile
      </TACCButton>
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

const emit = defineEmits(['edit'])
</script>
