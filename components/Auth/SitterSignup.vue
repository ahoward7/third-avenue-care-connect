<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <TACCInput v-model="firstName" placeholder="First Name" :invalid="submitted && errors.firstName !== undefined" />
        <p v-if="submitted && errors.firstName" class="h-8 mt-1 pl-3 text-red text-sm">
          {{ errors.firstName }}
        </p>
      </div>
      <div>
        <TACCInput v-model="lastName" placeholder="Last Name" :invalid="submitted && errors.lastName !== undefined" />
        <p v-if="submitted && errors.lastName" class="h-8 mt-1 pl-3 text-red text-sm">
          {{ errors.lastName }}
        </p>
      </div>
    </div>
    <div>
      <TACCInput v-model="email" placeholder="Email" :invalid="submitted && errors.email !== undefined" />
      <p v-if="submitted && errors.email" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <TACCInput v-model="phone" placeholder="Phone" :invalid="submitted && errors.phone !== undefined" />
      <p v-if="submitted && errors.phone" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.phone }}
      </p>
    </div>
    <div>
      <TACCCheckbox v-model="isConfirmed">
        I confirm that I am a nursery-approved member of Third Avenue
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
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{10,15}$/, 'Invalid phone number').required('Phone is required'),
  isConfirmed: yup.boolean().oneOf([true], 'You must confirm membership'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isConfirmed: false,
  },
})

const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [isConfirmed] = defineField('isConfirmed')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    emit('signup', { ...values, type: 'sitter' })
  })()
}
</script>
