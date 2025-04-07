<template>
  <div class="flex gap-16 mt-8">
    <div class="h-fit fun-border">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  familyProfile: {
    type: Object as PropType<FamilyProfile>,
    required: true,
  },
})

const image = 'https://fakeimg.pl/300/?text=Profile'
</script>
