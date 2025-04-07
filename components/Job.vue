<template>
  <div class="w-[600px] flex pt-3 border-[3px] rounded-md bg-lightgray/20" :class="index % 2 === 0 ? 'border-green' : 'border-purple'">
    <div class="grow flex flex-col gap-2">
      <div class="flex gap-4 text-gray font-bold text-sm px-4">
        {{ `${timeTo12HourFormat(job.startTime)} - ${timeTo12HourFormat(job.endTime)}` }}
      </div>
      <div class="flex gap-8 px-4">
        <div class="shrink-0 flex flex-col gap-1">
          <img v-if="image" :src="image" alt="Job Image" class="w-40 h-40 rounded-md">
        </div>
        <div class="flex flex-col gap-2">
          <ProfileField label="Address" :text="family.address" />
          <div class="flex flex-col gap-1">
            <ProfileField label="Children" text="" />
            <TACCBullet v-for="(child, childIndex) in family.children" :key="childIndex" :index="childIndex" class="pl-4 text-sm">
              <span class="font-bold">
                {{ child.name }}:
              </span>
              <span>
                {{ child.age }} years old
              </span>
            </TACCBullet>
          </div>
          <ProfileField label="Job Description" :text="job.description" />
          <TACCButton size="small" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'">
            View Full Profile
          </TACCButton>
        </div>
      </div>
      <div class="w-fit text-white font-wedges tracking-widest px-2 py-1 text-sm rounded-tr-md mt-2 overflow-hidden" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'">
        {{ family.displayName }}
      </div>
    </div>
    <div v-if="!job.sitter" class="shrink-0 ml-16 flex items-center pr-8">
      <TACCButton class="bg-yellow">
        Take Job
      </TACCButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Family from './Profile/Family.vue'

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
