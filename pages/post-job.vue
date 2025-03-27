<template>
  <div class="flex flex-col gap-2">
    <HomeHeader>
      Post New Job
    </HomeHeader>
    <div class="flex gap-32">
      <div class="grow flex flex-col gap-8">
        <div class="flex gap-8">
          <TACCCalendar v-model="jobInformation.date" label="Date" />
          <div class="grow flex flex-col gap-4">
            <TACCInput v-model="jobInformation.startTime" placeholder="Start Time" label="Start Time" />
            <TACCInput v-model="jobInformation.endTime" placeholder="End Time" label="End Time" />
            <div class="grow flex justify-center items-center">
              <img src="~/assets/images/hands.png" class="w-28" alt="Logo">
            </div>
          </div>
        </div>
        <TACCTextarea v-model="jobInformation.description" placeholder="Job Description" label="Description" class="min-h-40" />
        <TACCButton class="w-40 bg-yellow">
          Post Job
        </TACCButton>
      </div>
      <img src="~/assets/images/mother-daughter.png" class="h-[400px]" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
const jobInformation = ref({
  date: '',
  startTime: '',
  endTime: '',
  description: '',
})
</script>
