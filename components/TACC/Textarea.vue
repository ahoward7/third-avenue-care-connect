<template>
  <textarea v-model="modelValue" type="text" class="w-full bg-lightgray rounded-lg px-3 py-2 outline-none" :class="{ 'bg-red/20': invalid }" />
</template>

<script setup lang="ts">
defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel<string>()
</script>
