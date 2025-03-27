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
const jobs: Ref<Job[]> = ref([
  {
    id: 1,
    name: 'The James Family',
    address: '123 Maple St, Springfield',
    description: 'Loves bedtime stories, allergic to peanuts.',
    image: 'https://cdn2.thecatapi.com/images/e05.jpg',
    kids: [
      { name: 'Emma', age: 4 },
      { name: 'Liam', age: 6 },
    ],
    timing: 'Thurs, July 15, 5-7pm',
    sitter: null,
  },
  {
    id: 2,
    name: 'The Smith Family',
    address: '456 Oak Ave, Rivertown',
    description: 'Takes a nap at 2 PM, enjoys singing nursery rhymes.',
    image: 'https://cdn2.thecatapi.com/images/e06.jpg',
    kids: [
      { name: 'Sophia', age: 3 },
    ],
    timing: 'Sat, July 17, 10am-12pm',
    sitter: null,
  },
  {
    id: 3,
    name: 'The Johnson Family',
    address: '789 Pine Rd, Lakeside',
    description: 'Olivia in bed by 8:00, Noah 9:00.',
    image: 'https://cdn2.thecatapi.com/images/e07.jpg',
    kids: [
      { name: 'Noah', age: 5 },
      { name: 'Olivia', age: 2 },
    ],
    timing: 'Every Tuesday, 5-7pm',
    sitter: null,
  },
  {
    id: 4,
    name: 'The Brown Family',
    address: '101 Elm St, Hillside',
    description: 'Aiden has soccer practice at 6:30.',
    image: 'https://cdn2.thecatapi.com/images/e08.jpg',
    kids: [
      { name: 'Aiden', age: 7 },
      { name: 'Mia', age: 4 },
      { name: 'Ethan', age: 2 },
    ],
    timing: 'Fri, July 16, 6-9pm',
    sitter: null,
  },
  {
    id: 5,
    name: 'The Davis Family',
    address: '202 Cedar Ave, Woodland',
    description: 'Ava has a peanut allergy.',
    image: 'https://cdn2.thecatapi.com/images/e09.jpg',
    kids: [
      { name: 'Ava', age: 6 },
      { name: 'Oliver', age: 3 },
    ],
    timing: 'Sat, July 17, 2-5pm',
    sitter: null,
  },
])

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
