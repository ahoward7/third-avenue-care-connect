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
        <ProfileLabel>Display Name</ProfileLabel>
        <TACCInput v-model="displayName" placeholder="Display Name" :invalid="submitted && errors.email !== undefined" />
        <p v-if="submitted && errors.displayName" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.displayName }}
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
      <div>
        <ProfileLabel>Address</ProfileLabel>
        <TACCInput v-model="address" placeholder="Your Address" :invalid="submitted && errors.address !== undefined" />
        <p v-if="submitted && errors.address" class="h-3 mt-1 pl-3 text-red text-sm">
          {{ errors.address }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <ProfileLabel>Children</ProfileLabel>
        <div class="pl-8 flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <ProfileChildForm
              v-for="(_, index) in children"
              :key="index"
              v-model="children[index]"
              :index="index"
              @remove="children.splice(index, 1)"
            />
            <p v-if="submitted && errors.children" class="h-3 mt-1 pl-3 text-red text-sm">
              {{ errors.children }}
            </p>
          </div>
          <TACCButton class="bg-green text-white" @click="children.push({ name: '', age: 0 })">
            Add Child
          </TACCButton>
        </div>
      </div>
      <div class="flex gap-4 mt-2 border-t-2 border-purple pt-4">
        <TACCButton class="bg-yellow" @click="submitForm">
          Update Profile
        </TACCButton>
        <TACCButton v-if="familyProfile.isCompleted" class="bg-red/80" @click="emit('cancel')">
          Cancel
        </TACCButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  familyProfile: {
    type: Object as PropType<FamilyProfile>,
    required: true,
  },
})

const emit = defineEmits(['updateProfile', 'cancel'])

const { familyProfile } = toRefs(props)

const submitted = ref(false)

const childProfileSchema = yup.object().shape({
  name: yup.string().required('All child names are required').trim(),
  age: yup.number().integer().min(0, 'Age must be a non-negative integer').required('Child age is required'),
})

const schema = yup.object().shape({
  image: yup.string().required('Image is required'),
  displayName: yup.string().required('Display name is required'),
  bio: yup.string().required('Bio is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{7,15}$/, 'Phone number must be valid').required('Phone number is required'),
  address: yup.string().required('Address is required'),
  children: yup.array().of(childProfileSchema).min(1, 'At least one child is required').required('Children field is required'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    image: familyProfile.value.image || '',
    displayName: familyProfile.value.displayName || '',
    bio: familyProfile.value.bio || '',
    email: familyProfile.value.email || '',
    phone: familyProfile.value.phone || '',
    address: familyProfile.value.address || '',
    children: familyProfile.value.children || [],
    profileType: familyProfile.value.profileType || 'family',
  },
})

const [image] = defineField('image')
const [displayName] = defineField('displayName')
const [bio] = defineField('bio')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [address] = defineField('address')
const [children] = defineField('children')

function submitForm() {
  submitted.value = true

  handleSubmit((values) => {
    emit('updateProfile', values)
  })()
}
</script>
