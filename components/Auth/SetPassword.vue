<template>
  <div>
    <div class="flex flex-col gap-4 w-full">
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
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['setPassword'])

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

  handleSubmit(async () => {
    emit('setPassword', password.value)
  })()
}
</script>
