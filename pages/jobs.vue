<template>
  <div class="w-inherit">
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-4">
        <div class="sticky top-4 flex flex-col gap-4">
          <HomeHeader>
            Job Filters
          </HomeHeader>
          <div class="h-8 flex justify-between">
            <template v-for="filter, index in filters" :key="filter.id">
              <TACCCheckbox v-model="filter.checked">
                <span class="select-none">
                  {{ filter.name }}
                </span>
              </TACCCheckbox>
              <div v-if="index < filters.length - 1" class="h-full border border-purple" />
            </template>
          </div>
        </div>
      </div>
      <div class="grow flex flex-col gap-4">
        <HomeHeader>
          Open Jobs
        </HomeHeader>
        <Job
          v-for="job, index in jobs" :key="job.id" :job="job" :index="index" :loading="loading && selectedJob?.id === job.id" class="w-full"
          @take-job="takeJob(job)"
        />
        <TACCSpinner v-if="loading && !selectedJob" />
      </div>
    </div>
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
    availableOnly: true,
  },
})

loading.value = false

const filters = ref([
  {
    id: 1,
    name: '1 Child',
    checked: false,
  },
  {
    id: 2,
    name: '2 Children',
    checked: false,
  },
  {
    id: 3,
    name: '3 Children',
    checked: false,
  },
  {
    id: 4,
    name: '4+ Children',
    checked: false,
  },
  {
    id: 5,
    name: 'Weekdays',
    checked: false,
  },
  {
    id: 6,
    name: 'Weekends',
    checked: false,
  },
])

async function takeJob(job: Job) {
  selectedJob.value = job
  loading.value = true

  const jobPut: JobPut = {
    id: job.id,
    sitter: authStore.profile?.id || '-1',
  }

  try {
    if (jobPut.sitter === '-1') {
      console.error('Sitter ID is not set')
      return
    }

    await $fetch('/job/give-or-take', {
      method: 'PUT',
      body: jobPut,
    })

    toastStore.addToast({
      message: 'Job taken successfully.',
      type: 'success',
    })

    refresh()
  }
  catch (e) {
    console.error('Error taking job:', e)
    authStore.errors.job = true
  }
  finally {
    loading.value = false
  }
}
</script>
