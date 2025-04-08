<template>
  <div class="flex gap-2">
    <div class="flex flex-col grow">
      <ProfileLabel>Name</ProfileLabel>
      <TACCInput
        v-model="child.name"
        placeholder="Child's Name"
      />
    </div>
    <div class="flex flex-col w-48">
      <ProfileLabel>Age</ProfileLabel>
      <TACCInput
        v-model="child.age"
        type="number"
        placeholder="Age"
      />
    </div>
    <TACCIcon icon="radix-icons:trash" class="shrink-0 w-6 h-6 text-red cursor-pointer mt-8" @click="emit('remove')" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  index: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['remove'])

const child = defineModel<{ name: string, age: number }>() as Ref<{ name: string, age: number }>
</script>
