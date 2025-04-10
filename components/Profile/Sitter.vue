<template>
  <div class="flex gap-16 mt-8">
    <div class="shrink-0 fun-border w-60 h-60">
      <img :src="image" alt="Sitter Image" class="w-60 h-60">
    </div>
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
const props = defineProps({
  sitterProfile: {
    type: Object as PropType<SitterProfile>,
    required: true,
  },
})

const emit = defineEmits(['edit'])

async function getImageUrl() {
  try {
    const s3Response = await $fetch<{ imageUrl: string }>('/profile-user/s3/get-image', {
      method: 'GET',
      query: { key: props.sitterProfile.image || '' },
    })

    if (s3Response && s3Response.imageUrl) {
      return s3Response.imageUrl
    }
    else {
      console.error('No image URL found in response')
      return null
    }
  }
  catch (err) {
    console.error('Failed to fetch image URL:', err)
    return null
  }
}

const image = ref<string>(await getImageUrl() || '')
</script>
