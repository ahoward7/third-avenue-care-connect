<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="w-full">
      <TACCInput v-model="displayName" placeholder="Display Name" :invalid="complteted && errors.displayName !== undefined" />
      <p v-if="submitted && errors.displayName" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.displayName }}
      </p>
    </div>
    <div class="w-full">
      <TACCInput v-model="email" placeholder="Email" :invalid="complteted && errors.email !== undefined" />
      <p v-if="submitted && errors.email" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.email }}
      </p>
    </div>
    <div class="w-full">
      <TACCInput v-model="phone" placeholder="Phone" :invalid="complteted && errors.phone !== undefined" />
      <p v-if="submitted && errors.phone" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.phone }}
      </p>
    </div>
    <div class="w-full">
      <TACCCheckbox v-model="isConfirmed">
        I confirm that I am a member of Third Avenue
      </TACCCheckbox>
      <p v-if="submitted && errors.isConfirmed" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.isConfirmed }}
      </p>
    </div>
    <TACCButton class="w-full bg-yellow" @click="submitForm">
      Signup
    </TACCButton>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['signup'])

const submitted = ref(false)

const schema = yup.object({
  displayName: yup.string().required('Display Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{10,15}$/, 'Invalid phone number').required('Phone is required'),
  isConfirmed: yup.boolean().oneOf([true], 'You must confirm membership'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    displayName: '',
    email: '',
    phone: '',
    isConfirmed: false,
  },
})

const [displayName] = defineField('displayName')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [isConfirmed] = defineField('isConfirmed')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    emit('signup', values)
  })()
}
</script>
