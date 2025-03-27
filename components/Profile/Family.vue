<template>
  <div class="flex gap-8">
    <img :src="familyProfile.image" alt="Parent Image" class="w-40 h-40">
    <div class="flex flex-col gap-2">
      <HomeHeader>
        {{ familyProfile.name }}
      </HomeHeader>
      <div class="flex flex-col gap-4">
        <ProfileField label="Bio" :text="familyProfile.bio" />
        <ProfileField label="Email" :text="familyProfile.email" />
        <ProfileField label="Phone" :text="familyProfile.phone" />
        <ProfileField label="Address" :text="familyProfile.address" />
        <ProfileField label="Notes" :text="familyProfile.notes" />
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
</script>
