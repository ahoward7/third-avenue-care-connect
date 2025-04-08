<template>
  <div class="w-[600px] flex pt-3 border-[3px] rounded-md bg-lightgray/20" :class="index % 2 === 0 ? 'border-green' : 'border-purple'">
    <div class="grow flex flex-col gap-4">
      <div class="flex gap-2 items-center text-gray font-bold text-sm px-4">
        <TACCIcon icon="heroicons-solid:clock" class="w-6 h-6 text-gray" />
        {{ `${dateToDayOfWeek(job.date)}, ${dateToMonthAndDay(job.date)}, ${timeTo12HourFormat(job.startTime)} - ${timeTo12HourFormat(job.endTime)}` }}
      </div>
      <div class="flex gap-8 px-4">
        <div class="shrink-0 flex flex-col gap-1">
          <img v-if="image" :src="image" alt="Job Image" class="w-40 h-40 rounded-md">
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <TACCIcon icon="heroicons-solid:home-modern" class="w-6 h-6 text-yellow" />
            <span class="font-semibold">
              {{ family.address }}
            </span>
          </div>
          <div class="flex gap-2">
            <TACCIcon icon="heroicons-solid:user" class="w-6 h-6 text-purple" />
            <div class="flex gap-1 items-center">
              <div v-for="(child, childIndex) in family.children" :key="childIndex">
                <span class="italic font-semibold">
                  {{ child.name }}
                </span>
                <span>
                  ({{ child.age }})
                </span>
                <span v-if="childIndex < family.children.length - 1">, </span>
              </div>
            </div>
          </div>
          <div class="border-t-2 pt-2 border-green">
            <div class="text-sm pl-2 text-balance">
              {{ job.description }}
            </div>
          </div>
          <div class="flex gap-4">
            <TACCButton size="small" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'">
              View Full Profile
            </TACCButton>
            <TACCButton v-if="!job.sitter" size="small" class="bg-yellow">
              Take Job
            </TACCButton>
          </div>
        </div>
      </div>
      <div class="w-fit text-white font-wedges tracking-widest px-3 pb-1 pt-2 rounded-tr-md mt-2 overflow-hidden" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'">
        {{ family.displayName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true,
  },
  family: {
    type: Object as PropType<FamilyProfile>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

function timeTo12HourFormat(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  const amPm = hours >= 12 ? 'pm' : 'am'
  const formattedHours = hours % 12 || 12

  return `${formattedHours}:${String(minutes).padStart(2, '0')}${amPm}`
}

function dateToDayOfWeek(date: string) {
  const day = new Date(date).toLocaleString('en-US', { weekday: 'long' })
  return day.charAt(0).toUpperCase() + day.slice(1)
}

function dateToMonthAndDay(date: string) {
  const month = new Date(date).toLocaleString('en-US', { month: 'long' })
  const day = new Date(date).getDate()
  return `${month} ${day}`
}

async function getImageUrl() {
  try {
    const s3Response = await $fetch<{ imageUrl: string }>('/profile-user/s3/get-image', {
      method: 'GET',
      query: { key: props.family.image || '' },
    })

    if (s3Response && s3Response.imageUrl) {
      return s3Response.imageUrl
    }
    else {
      console.error('No image URL found in response')
      return null
    }
  }
  catch (err) {
    console.error('Failed to fetch image URL:', err)
    return null
  }
}

const image = ref<string | null>(await getImageUrl())
</script>
