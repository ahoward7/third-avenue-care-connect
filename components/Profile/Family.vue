<template>
  <div class="flex gap-16 mt-8">
    <div class="shrink-0 fun-border w-60 h-60">
      <img :src="image" alt="Family Image" class="w-60 h-60">
    </div>
    <div class="flex flex-col gap-2">
      <HomeHeader>
        {{ familyProfile.displayName }}
      </HomeHeader>
      <div class="flex flex-col gap-4">
        <ProfileField label="Bio" :text="familyProfile.bio" />
        <ProfileField label="Email" :text="familyProfile.email" />
        <ProfileField label="Phone" :text="familyProfile.phone" />
        <ProfileField label="Address" :text="familyProfile.address" />
        <div class="flex flex-col gap-2 mt-8">
          <HomeHeader>
            Children
          </HomeHeader>
          <TACCBullet v-for="(child, index) in familyProfile.children" :key="index">
            <span class="font-bold">
              {{ child.name }}:
            </span>
            <span>
              {{ child.age }} years old
            </span>
          </TACCBullet>
        </div>
        <TACCButton v-if="familyProfile.isCompleted" class="bg-yellow mt-4" @click="emit('edit')">
          Edit Profile
        </TACCButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  familyProfile: {
    type: Object as PropType<FamilyProfile>,
    required: true,
  },
})

const emit = defineEmits(['edit'])

async function getImageUrl() {
  try {
    const s3Response = await $fetch<{ imageUrl: string }>('/profile-user/s3/get-image', {
      method: 'GET',
      query: { key: props.familyProfile.image || '' },
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
