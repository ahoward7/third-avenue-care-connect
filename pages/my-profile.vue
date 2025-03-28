<template>
  <div>
    <ProfileSitter v-if="authStore.accountType === 'sitter'" :sitter-profile="sitterProfile" />
    <ProfileFamily v-else :family-profile="familyProfile" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const sitterProfile: Ref<SitterProfile> = ref({
  image: 'https://cdn2.thecatapi.com/images/e12.jpg',
  firstName: 'Jane',
  lastName: 'Doe',
  bio: 'I love reading bedtime stories and playing with kids!',
  email: 'janedoe@gmail.com',
  password: '',
  phone: '555-555-5555',
  isApproved: false,
  profileType: 'sitter',
})

const familyProfile: Ref<FamilyProfile> = ref({
  image: 'https://cdn2.thecatapi.com/images/e13.jpg',
  name: 'The Doe Family',
  bio: 'We are a family of 4 looking for a sitter for our two kids.',
  email: 'doefamily@gmail.com',
  password: '',
  phone: '666-666-6666',
  address: '505 Maple St, Springfield',
  children: [
    {
      name: 'Emma',
      age: 4,
    },
    {
      name: 'Liam',
      age: 6,
    },
  ],
  profileType: 'family',
  isApproved: false,
})
</script>
