<template>
  <NuxtLink :to="to" class="rounded-md w-fit h-fit text-center px-4 py-3 duration-200 hover:brightness-[1.07] cursor-pointer">
    <button class="text-white font-semibold outline-none">
      <slot />
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
  },
})
</script>
