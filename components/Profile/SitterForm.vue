<template>
  <div class="flex gap-16 mt-8">
    <div>
      <ProfileLabel>Profile Image</ProfileLabel>
      <TACCImage v-model="image" type="url" placeholder="Image URL" :invalid="submitted && errors.image !== undefined" />
      <p v-if="submitted && errors.image" class="h-3 mt-1 pl-3 text-red text-sm">
        {{ errors.image }}
      </p>
    </div>
    <div class="grow flex flex-col gap-4">
      <div>
        <ProfileLabel>First Name</ProfileLabel>
        <TACCInput v-model="firstName" placeholder="Display Name" :invalid="submitted && errors.firstName !== undefined" />
        <p v-if="submitted && errors.firstName" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.firstName }}
        </p>
      </div>
      <div>
        <ProfileLabel>Last Name</ProfileLabel>
        <TACCInput v-model="lastName" placeholder="Last Name" :invalid="submitted && errors.lastName !== undefined" />
        <p v-if="submitted && errors.lastName" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.lastName }}
        </p>
      </div>
      <div>
        <ProfileLabel>Bio</ProfileLabel>
        <TACCTextarea v-model="bio" placeholder="Tell us about yourself" class="min-h-40" :invalid="submitted && errors.bio !== undefined" />
        <p v-if="submitted && errors.bio" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.bio }}
        </p>
      </div>
      <div>
        <ProfileLabel>Email</ProfileLabel>
        <TACCInput v-model="email" type="email" placeholder="Email Address" :invalid="submitted && errors.email !== undefined" />
        <p v-if="submitted && errors.email" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.email }}
        </p>
      </div>
      <div>
        <ProfileLabel>Phone</ProfileLabel>
        <TACCInput v-model="phone" type="tel" placeholder="Phone Number" :invalid="submitted && errors.phone !== undefined" />
        <p v-if="submitted && errors.phone" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.phone }}
        </p>
      </div>
      <div class="flex gap-4 mt-2 border-t-2 border-purple pt-4">
        <TACCButton class="bg-yellow" @click="submitForm">
          Update Profile
        </TACCButton>
        <TACCButton v-if="sitterProfile.isCompleted" class="bg-red/80" @click="emit('cancel')">
          Cancel
        </TACCButton>
      </div>
      <ErrorText v-if="authStore.errors.profileUpdate">
        Error updating profile. Please try again later.
      </ErrorText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  sitterProfile: {
    type: Object as PropType<SitterProfile>,
    required: true,
  },
})

const emit = defineEmits(['updateProfile', 'cancel'])

const authStore = useAuthStore()

const { sitterProfile } = toRefs(props)

const submitted = ref(false)

const schema = yup.object().shape({
  image: yup.string().required('Image is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  bio: yup.string().required('Bio is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{7,15}$/, 'Phone number must be valid').required('Phone number is required'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    image: sitterProfile.value.image || '',
    firstName: sitterProfile.value.firstName || '',
    lastName: sitterProfile.value.lastName || '',
    bio: sitterProfile.value.bio || '',
    email: sitterProfile.value.email || '',
    phone: sitterProfile.value.phone || '',
    profileType: sitterProfile.value.profileType || 'sitter',
  },
})

const [image] = defineField('image')
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [bio] = defineField('bio')
const [email] = defineField('email')
const [phone] = defineField('phone')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    emit('updateProfile', values)
  })()
}
</script>
