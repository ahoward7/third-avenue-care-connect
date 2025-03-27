<template>
  <div class="flex gap-2">
    <div class="font-bold">
      {{ label }}:
    </div>
    <div>
      {{ text }}
      <div />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>
