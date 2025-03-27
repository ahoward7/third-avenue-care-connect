<template>
  <div class="flex flex-col gap-4 w-full">
    <div>
      <TACCInput v-model="email" placeholder="Email" :invalid="errors.email !== undefined" />
      <p v-if="submitted && errors.email" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <TACCInput v-model="password" type="password" placeholder="Password" :invalid="errors.password !== undefined" />
      <p v-if="submitted && errors.password" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.password }}
      </p>
    </div>
    <TACCButton class="w-full bg-yellow" @click="submitForm">
      Login
    </TACCButton>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['login'])

const submitted = ref(false)

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 8 characters').required('Password is required'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const [email] = defineField('email')
const [password] = defineField('password')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    emit('login', values)
  })()
}
</script>
