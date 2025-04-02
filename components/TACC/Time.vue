<template>
  <div class="flex">
    <input
      v-model="displayValue"
      type="text"
      class="w-full bg-lightgray rounded-l-lg px-3 py-2 outline-none"
      :class="{ 'bg-red/20': invalid }"
      maxlength="5"
      @input="formatTime"
    >
    <div
      class="font-semibold text-white px-3 py-2 cursor-pointer hover:brightness-110 duration-300"
      :class="amPm === 'am' ? 'bg-yellow' : 'bg-gray'"
      @click="amPm = 'am'"
    >
      AM
    </div>
    <div
      class="font-semibold text-white px-3 py-2 cursor-pointer hover:brightness-110 duration-300 rounded-r-lg"
      :class="amPm === 'pm' ? 'bg-yellow' : 'bg-gray'"
      @click="amPm = 'pm'"
    >
      PM
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
})

const amPm = ref('am')
const modelValue = defineModel<string>()
const displayValue = ref('')

function formatTime(event: Event) {
  let value = (event.target as HTMLInputElement).value.replace(/\D/g, '')

  if (value.length === 0) {
    displayValue.value = ''
    modelValue.value = ''
    return
  }

  const maxDigits = value.startsWith('1') ? 4 : 3
  value = value.slice(0, maxDigits)

  let formatted = ''
  if (value.length <= 2) {
    formatted = value
  }
  else {
    const hours = value.slice(0, value.length - 2)
    let minutes = value.slice(value.length - 2)

    if (Number.parseInt(minutes, 10) > 59) {
      minutes = '59'
    }

    formatted = `${hours}:${minutes}`
  }

  displayValue.value = formatted
  modelValue.value = timeTo24HourFormat(formatted, amPm.value)
}

function timeTo24HourFormat(time: string, amPm: string) {
  const [hours, minutes] = time.split(':').map(Number)
  let formattedHours = hours

  if (amPm === 'pm' && hours < 12) {
    formattedHours += 12
  }
  else if (amPm === 'am' && hours === 12) {
    formattedHours = 0
  }

  return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
</script>
