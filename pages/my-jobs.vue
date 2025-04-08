<template>
  <div class="flex flex-col gap-4">
    <HomeHeader>
      My Jobs
    </HomeHeader>
    <Job v-for="job, index in jobs" :key="job.id" :job="job" :index="index" class="w-full" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const jobs: Ref<Job[]> = ref([])

try {
  const { data } = await useFetch<Job[]>('/job/by-profile-id', {
    method: 'GET',
    query: {
      profileId: authStore.profile?.id || '-1',
    },
  })

  if (data.value) {
    jobs.value = data.value
  }
}
catch (error) {
  console.error('Error fetching jobs:', error)
}
</script>
