<template>
  <div class="flex flex-col gap-2">
    <HomeHeader>
      Post New Job
    </HomeHeader>
    <div class="flex gap-32">
      <div class="grow flex flex-col gap-8">
        <div class="flex gap-8">
          <TACCCalendar v-model="date" :invalid="submitted && errors.date !== undefined" />
          <div class="grow flex flex-col gap-4">
            <TACCTime v-model="startTime" placeholder="Start Time" :invalid="submitted && errors.startTime !== undefined" />
            <TACCTime v-model="endTime" placeholder="End Time" :invalid="submitted && errors.endTime !== undefined" />
            <div class="grow flex justify-center items-center">
              <img src="~/assets/images/hands.png" class="w-28" alt="Logo">
            </div>
          </div>
        </div>
        <TACCTextarea v-model="description" placeholder="Job Description" class="min-h-40" :invalid="submitted && errors.description !== undefined" />
        <p v-if="submitted && errors.description" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.description }}
        </p>
        <TACCButton class="w-40 bg-yellow" @click="submitForm">
          Post Job
        </TACCButton>
      </div>
      <img src="~/assets/images/mother-daughter.png" class="h-[400px]" alt="Logo">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const authStore = useAuthStore()

const submitted = ref(false)

const schema = yup.object({
  date: yup.string().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  },
})

const [date] = defineField('date')
const [startTime] = defineField('startTime')
const [endTime] = defineField('endTime')
const [description] = defineField('description')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    postJob(values as JobPost)
  })()
}

async function postJob(values: JobPost) {
  try {
    await $fetch('/job', {
      method: 'POST',
      body: {
        family: authStore.profile?.id || '-1',
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        description: values.description,
      },
    })

    navigateTo('/pending-jobs')
  }
  catch (error) {
    console.error('Error posting job:', error)
  }
}
</script>
