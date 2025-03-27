<template>
  <div class="flex gap-2">
    <div class="shrink-0 w-3 h-3 rounded-full mt-[.4rem]" :class="index % 2 === 0 ? 'bg-green' : 'bg-purple'" />
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  index: {
    type: Number,
    default: 0,
  },
})
</script>
