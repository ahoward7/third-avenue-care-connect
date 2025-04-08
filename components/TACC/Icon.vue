<template>
  <Icon class="shrink-0" :icon="icon" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>
