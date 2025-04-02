<template>
  <div class="flex flex-col gap-16 font-inter">
    <div class="flex flex-col gap-2">
      <HomeHeader>
        Family Profiles
      </HomeHeader>
      <div>
        <AdminTableHead class="bg-purple text-white" />
        <AdminTableRow v-for="profile, index in familyProfiles" :key="profile.id" class="grid grid-cols-4 gap-4 px-3 py-2" :class="index % 2 === 0 ? 'bg-purple/20' : 'bg-purple/50'">
          <span class="font-bold">{{ profile.displayName }}</span>
          <span>{{ profile.email }}</span>
          <span>{{ profile.phone }}</span>
          <TACCToggle v-model="profile.isApproved" color="purple" @change="updateProfile(profile)" />
        </AdminTableRow>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <HomeHeader>
        Sitter Profiles
      </HomeHeader>
      <div>
        <AdminTableHead class="bg-yellow text-white" />
        <AdminTableRow v-for="profile, index in sitterProfiles" :key="profile.id" class="grid grid-cols-4 gap-4 px-3 py-2" :class="index % 2 === 0 ? 'bg-yellow/20' : 'bg-yellow/50'">
          <span class="font-bold">{{ `${profile.firstName} ${profile.lastName}` }}</span>
          <span>{{ profile.email }}</span>
          <span>{{ profile.phone }}</span>
          <TACCToggle v-model="profile.isApproved" color="yellow" @change="updateProfile(profile)" />
        </AdminTableRow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const profiles = ref<(SitterProfile | FamilyProfile)[]>([])

try {
  profiles.value = await $fetch('/profile-user')
}
catch (error) {
  console.error(error)
}

const familyProfiles = computed(() => profiles.value.filter((profile): profile is FamilyProfile => profile.profileType === 'family'))
const sitterProfiles = computed(() => profiles.value.filter((profile): profile is SitterProfile => profile.profileType === 'sitter'))

async function updateProfile(profile: FamilyProfile | SitterProfile) {
  if (!profile.isApproved) {
    return
  }

  try {
    await $fetch(`/profile-user/approve`, {
      method: 'POST',
      body: profile,
    })
  }
  catch (error) {
    console.error(error)
  }
}

definePageMeta({
  middleware: 'admin',
})
</script>
