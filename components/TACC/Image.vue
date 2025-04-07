<template>
  <div class="flex flex-col gap-4 w-64">
    <div v-if="previewUrl" class="max-w-64 max-h-64 flex justify-center items-center rounded-lg">
      <img :src="previewUrl" alt="Profile Image" class="max-h-64 max-w-64 h-auto rounded-lg">
    </div>
    <div v-else class="text-gray italic">
      No image selected
    </div>
    <TACCButton class="bg-purple" @click="handleButtonClick">
      Choose Image
    </TACCButton>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileUpload"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
})

const imageUrl = defineModel<Blob>()
const previewUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function handleButtonClick() {
  fileInput.value?.click()
}

function handleFileUpload() {
  const file = (fileInput.value?.files as FileList)[0]
  if (file) {
    const reader = new FileReader()
    // Fix later
  }
}
</script>
