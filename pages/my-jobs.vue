<template>
  <div class="flex flex-col gap-4">
    <HomeHeader>
      My Jobs
    </HomeHeader>
    <Job v-for="job, index in jobs" :key="job.id" :job="job" :index="index" class="w-full" />
  </div>
</template>

<script setup lang="ts">
const jobs: Ref<Job[]> = ref([
  {
    id: 1,
    name: 'The Miller Family',
    bullets: ['Isabella (5), Lucas (3)', '303 Birch Blvd, Parkside', 'Isabella has a bedtime of 8:30.'],
    image: 'https://cdn2.thecatapi.com/images/e10.jpg',
    timing: 'Sun, July 18, 6-9pm',
    sitter: '123939',
  },
  {
    id: 2,
    name: 'The Wilson Family',
    bullets: ['Charlotte (4), Henry (2)', '404 Spruce St, Hilltop', 'Charlotte has a bedtime of 8:00.'],
    image: 'https://cdn2.thecatapi.com/images/e11.jpg',
    timing: 'Mon, July 19, 5-7pm',
    sitter: '238979',
  },
])
</script>
