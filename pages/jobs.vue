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
        <Job v-for="job, index in jobs" :key="job.id" :job="job" :index="index" class="w-full" @take-job="takeJob(job)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const jobs: Ref<Job[]> = ref([])

try {
  const { data } = await useFetch<Job[]>('/job', {
    method: 'GET',
  })

  if (data.value) {
    jobs.value = data.value
  }
}
catch (error) {
  console.error('Error fetching jobs:', error)
}

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
  const jobPut: JobPut = {
    id: job.id,
    sitter: authStore.profile?.id || '-1',
  }

  try {
    if (jobPut.sitter === '-1') {
      console.error('Sitter ID is not set')
      return
    }

    await $fetch('/job/take', {
      method: 'PUT',
      body: jobPut,
    })
  }
  catch (error) {
    console.error('Error taking job:', error)
  }
}
</script>
