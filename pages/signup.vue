<template>
  <div class="w-inherit mt-16 font-inter">
    <div class="flex">
      <div class="flex flex-col gap-4 w-80">
        <AuthHeader class="border-green">
          Family Signup
        </AuthHeader>
        <AuthFamilySignup @signup="signup" />
      </div>
      <div class="shrink-0 flex justify-center mx-auto">
        <img src="~/assets/images/hands.png" class="h-[400px]" alt="Hands">
      </div>
      <div class="flex flex-col gap-4 w-80">
        <AuthHeader class="border-purple">
          Sitter Signup
        </AuthHeader>
        <AuthSitterSignup @signup="signup" />
      </div>
    </div>
    <div class="flex gap-2 mt-8 text-sm italic text-gray">
      * Once your account is approved, you will receive an email to create a password and your profile.
    </div>
  </div>
</template>

<script setup lang="ts">
async function signup(signupForm: FamilySignupForm | SitterSignupForm) {
  try {
    await $fetch('/profile-user', { method: 'POST', body: signupForm })
    navigateTo('/')
  }
  catch (e) {
    console.error('Error during signup:', e)
  }
}
</script>
