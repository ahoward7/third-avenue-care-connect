<template>
  <div class="flex flex-col gap-4">
    <HomeHeader>
      My Jobs
    </HomeHeader>
    <template v-if="jobs?.length === 0">
      <div class="w-fit text-lg border-b-2 border-purple">
        You have no assigned jobs. If you wish to take a job, you can browse the selection of jobs available.
      </div>
      <TACCSpinner v-if="loading && !selectedJob" />
    </template>
    <template v-else>
      <Job
        v-for="job, index in jobs" :key="job.id" :job="job" :index="index" :loading="loading && selectedJob?.id === job.id" class="w-full"
        @give-up-job="giveUpJob(job)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const toastStore = useToastStore()

const selectedJob: Ref<Job | null> = ref(null)

const loading = ref(true)

const { data: jobs, refresh } = await useFetch<Job[]>('/job', {
  method: 'GET',
  query: {
    profileId: authStore.profile?.id || '-1',
    profileType: authStore.profile?.profileType || 'sitter',
  },
})

loading.value = false

async function giveUpJob(job: Job) {
  selectedJob.value = job
  loading.value = true

  const jobPut: JobPut = {
    id: job.id,
    sitter: null,
  }

  try {
    await $fetch('/job/give-or-take', {
      method: 'PUT',
      body: jobPut,
    })

    toastStore.addToast({
      message: 'Job given up successfully.',
      type: 'success',
    })

    refresh()
  }
  catch (error) {
    console.error('Error giving up job:', error)
    authStore.errors.job = true
  }
  finally {
    loading.value = false
  }
}
</script>
