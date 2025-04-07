<template>
  <div class="flex flex-col gap-4 w-64">
    <div v-if="previewImageUrl" class="max-w-64 max-h-64 flex justify-center items-center rounded-lg">
      <img :src="previewImageUrl" alt="Profile Image" class="max-h-64 max-w-64 h-auto rounded-lg">
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
const imageUrl = defineModel<string>()
const previewImageUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function handleButtonClick() {
  fileInput.value?.click()
}

async function getImageUrl() {
  try {
    const s3Response = await $fetch<{ imageUrl: string }>('/profile-user/s3/get-image', {
      method: 'GET',
      query: { key: imageUrl.value || '' },
    })

    if (s3Response && s3Response.imageUrl) {
      previewImageUrl.value = s3Response.imageUrl
    }
  }
  catch (err) {
    console.error('Failed to fetch image URL:', err)
    return null
  }
}

async function handleFileUpload() {
  const file = (fileInput.value?.files as FileList)[0]
  if (!file)
    return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('filename', file.name)

  try {
    const s3Response = await $fetch<{ imageUrl: string, signedUrl: string }>('/profile-user/s3/post-image', {
      method: 'POST',
      body: formData,
    })

    imageUrl.value = s3Response.imageUrl
    previewImageUrl.value = s3Response.signedUrl
  }
  catch (err) {
    console.error('Upload failed:', err)
  }
}

getImageUrl()
</script>
