<template>
  <div>
    <div v-if="isValidToken" class="flex flex-col gap-4 w-full">
      <div>
        <TACCInput v-model="password" type="password" placeholder="Password" :invalid="submitted && errors.password !== undefined" />
        <p v-if="submitted && errors.password" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.password }}
        </p>
      </div>
      <div>
        <TACCInput v-model="confirmPassword" type="password" placeholder="Confirm Password" :invalid="submitted && errors.confirmPassword !== undefined" />
        <p v-if="submitted && errors.confirmPassword" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <TACCButton class="w-full bg-yellow" @click="submitForm">
        Set Password
      </TACCButton>
    </div>
    <div v-else class="bg-red/80 text-center text-white px-2 py-3 rounded-md">
      Looks like your password reset link is invalid or has expired. Please contact an admin to generate a new link.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['setPassword'])

const route = useRoute()
const query = route.query
const token = query.token as string | undefined

const profile = ref<FamilyProfile | SitterProfile | null>(null)

const isValidToken = ref(false)

try {
  const { data } = await useFetch('/profile', { method: 'GET', query: { token } })

  if (data.value) {
    isValidToken.value = true
    profile.value = data.value
  }
  else {
    console.error('Invalid token or profile not found')
  }
}
catch (error) {
  console.error('ERROR FETCHING PROFILE', error)
}

const submitted = ref(false)

const schema = yup.object({
  password: yup.string().min(6, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')

function submitForm() {
  submitted.value = true
  profile.value!.password = password.value

  handleSubmit(async () => {
    emit('setPassword', profile.value)
  })()
}
</script>
