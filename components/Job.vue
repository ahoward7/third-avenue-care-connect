<template>
  <div class="w-[600px] flex pt-3 border-[3px] rounded-md bg-lightgray/20" :class="index % 2 === 0 ? 'border-green' : 'border-purple'">
    <div class="grow flex flex-col gap-2">
      <div class="text-gray font-bold text-sm px-4">
        {{ job.timing }}
      </div>
      <div class="flex gap-8 px-4">
        <div class="shrink-0 flex flex-col gap-1">
          <img :src="job.image" alt="Job Image" class="w-20 h-20">
        </div>
        <div>
          <TACCBullet v-for="bullet in job.bullets" :key="bullet" :index="index">
            {{ bullet }}
          </TACCBullet>
        </div>
      </div>
      <div class="w-fit text-white font-wedges tracking-wider px-2 py-1 text-sm rounded-tr-md mt-2 overflow-hidden" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'">
        {{ job.name }}
      </div>
    </div>
    <div v-if="!job.taken" class="shrink-0 ml-16 flex items-center pr-8">
      <TACCButton class="bg-yellow">
        Take Job
      </TACCButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
