<template>
  <label class="flex items-center gap-4 text-sm text-gray px-1">
    <div class="h-5 w-5 shrink-0 flex justify-center items-center rounded-[3px] border border-gray-400 cursor-pointer" :class="isChecked ? 'bg-gray' : ''" @click="isChecked = !isChecked">
      <TACCIcon icon="heroicons:check" class="h-5 w-5 text-white" />
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
const isChecked = defineModel()
</script>
