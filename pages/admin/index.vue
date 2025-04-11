<template>
  <div class="flex flex-col gap-16">
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
          <span class="flex gap-4">
            <TACCToggle v-model="profile.isApproved" color="purple" @change="updateProfile(profile)" />
            <TACCSpinner v-if="approvedProfile?.id === profile.id && loading" :size="20" />
            <ErrorText v-if="approvedProfile?.id === profile.id && authStore.errors.approve" class="text-xs">
              Could not approve profile.
            </ErrorText>
          </span>
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
          <span class="flex gap-4">
            <TACCToggle v-model="profile.isApproved" color="yellow" @change="updateProfile(profile)" />
            <TACCSpinner v-if="approvedProfile?.id === profile.id && loading" :size="20" />
            <ErrorText v-if="approvedProfile?.id === profile.id && authStore.errors.approve" class="text-xs">
              Could not approve profile.
            </ErrorText>
          </span>
        </AdminTableRow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const loading = ref(false)
const approvedProfile = ref<FamilyProfile | SitterProfile | null>(null)

const { data: profiles } = await useFetch('/profile-user', {
  method: 'GET',
  query: {
    all: true,
  },
})

const familyProfiles = computed(() => profiles.value.filter((profile): profile is FamilyProfile => profile.profileType === 'family'))
const sitterProfiles = computed(() => profiles.value.filter((profile): profile is SitterProfile => profile.profileType === 'sitter'))

async function updateProfile(profile: FamilyProfile | SitterProfile) {
  if (!profile.isApproved) {
    return
  }

  approvedProfile.value = profile
  loading.value = true

  try {
    await $fetch(`/profile-user/approve`, {
      method: 'POST',
      body: profile,
    })
  }
  catch (e) {
    console.error(e)
    authStore.errors.approve = true
    profile.isApproved = false
  }
  finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: 'admin',
})
</script>
