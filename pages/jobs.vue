<template>
  <div class="w-inherit">
    <div class="flex flex-col gap-16">
      <div class="flex gap-40">
        <div class="flex flex-col gap-4">
          <div class="sticky top-4 flex flex-col gap-4">
            <HomeHeader>
              Job Filters
            </HomeHeader>
            <div class="flex flex-col gap-4">
              <TACCCheckbox v-for="filter in filters" :key="filter.id" v-model="filter.checked" class="w-40">
                {{ filter.name }}
              </TACCCheckbox>
            </div>
          </div>
        </div>
        <div class="grow flex flex-col gap-4">
          <HomeHeader>
            Open Jobs
          </HomeHeader>
          <Job v-for="job, index in jobs" :key="job.id" :job="job" :index="index" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  {
    id: 7,
    name: 'Repeating Jobs',
    checked: false,
  },
])
</script>
