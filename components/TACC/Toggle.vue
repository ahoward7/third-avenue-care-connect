<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :checked="modelValue"
      class="appearance-none w-10 h-6 rounded-full bg-gray-300 cursor-pointer bg-lightgray after:translate-x-[1px] checked:after:translate-x-[18px] after:content-[''] after:block after:w-5 after:h-5 after:mt-[1px] after:rounded-full after:bg-white after:transition-transform border"
      :class="inputClasses"
      @change="updateValue"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'gray',
  },
})

const emit = defineEmits(['change'])

const inputClasses = computed(() => {
  if (props.color === 'yellow') {
    return 'checked:bg-yellow border-yellow'
  }
  if (props.color === 'purple') {
    return 'checked:bg-purple border-purple'
  }
  return 'checked:bg-gray border-gray'
})

const toggleValue = defineModel()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  toggleValue.value = target.checked
  emit('change', toggleValue.value)
}
</script>
