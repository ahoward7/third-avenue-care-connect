<template>
  <div v-if="size === 'large'" class="font-wedges flex flex-col gap-2 tracking-[.5rem]">
    <div class="flex gap-4 justify-start">
      <span class="text-yellow text-shadow text-5half-xl">Third</span>
      <span class="text-6xl">Avenue</span>
    </div>
    <div class="flex gap-4">
      <span class="text-6xl">Care</span>
      <span class="text-purple text-shadow text-5half-xl">Connect</span>
    </div>
  </div>
  <div v-if="size === 'small'" class="font-wedges flex flex-col tracking-[.2rem]">
    <div class="flex gap-1 justify-start">
      <span class="text-yellow text-shadow">Third</span>
      <span>Avenue</span>
    </div>
    <div class="flex gap-1">
      <span>Care</span>
      <span class="text-purple text-shadow">Connect</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'large',
  },
})
</script>
