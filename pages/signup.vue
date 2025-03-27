<template>
  <div class="w-inherit mt-16 font-inter">
    <div class="flex">
      <div class="flex flex-col gap-4 w-80">
        <AuthHeader class="border-green">
          Family Signup
        </AuthHeader>
        <AuthFamilySignup @signup="familySignup" />
      </div>
      <div class="shrink-0 flex justify-center mx-auto">
        <img src="~/assets/images/hands.png" class="h-[400px]" alt="Hands">
      </div>
      <div class="flex flex-col gap-4 w-80">
        <AuthHeader class="border-purple">
          Sitter Signup
        </AuthHeader>
        <AuthSitterSignup @signup="sitterSignup" />
      </div>
    </div>
    <div class="flex gap-2 mt-8 text-sm italic text-gray">
      * Once your account is approved, you will receive an email to create a password and your profile.
    </div>
  </div>
</template>

<script setup lang="ts">
async function familySignup(signupForm: FamilySignupForm) {
  const data = await $fetch('profile', { method: 'POST', body: signupForm })

  console.log(data)
}

async function sitterSignup(signupForm: SitterSignupForm) {
  const data = await $fetch('profile', { method: 'POST', body: signupForm })

  console.log(data)
}
</script>
