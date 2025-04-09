<template>
  <div class="flex flex-col gap-4">
    <HomeHeader>
      My Jobs
    </HomeHeader>
    <template v-if="jobs.length === 0">
      <div class="w-fit text-lg border-b-2 border-purple">
        You have no assigned jobs. If you wish to take a job, you can browse the selection of jobs available.
      </div>
    </template>
    <template v-else>
      <Job v-for="job, index in jobs" :key="job.id" :job="job" :index="index" class="w-full" @give-up-job="giveUpJob(job)" />
    </template>
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
      profileType: authStore.profile?.profileType || 'sitter',
    },
  })

  if (data.value) {
    jobs.value = data.value
  }
}
catch (error) {
  console.error('Error fetching jobs:', error)
}

async function giveUpJob(job: Job) {
  const jobPut: JobPut = {
    id: job.id,
    sitter: null,
  }

  try {
    await $fetch('/job/take', {
      method: 'PUT',
      body: jobPut,
    })
  }
  catch (error) {
    console.error('Error giving up job:', error)
  }
}
</script>
