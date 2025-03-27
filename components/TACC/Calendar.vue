<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    :default-value="calendarDate"
    class="font-inter rounded-xl bg-purple text-white p-4"
    fixed-weeks
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev
        class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          icon="radix-icons:chevron-left"
          class="w-4 h-4"
        />
      </CalendarPrev>
      <CalendarHeading class="text-sm text-black font-medium" />
      <CalendarNext
        class="inline-flex items-center cursor-pointer justify-center text-black rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          icon="radix-icons:chevron-right"
          class="w-4 h-4"
        />
      </CalendarNext>
    </CalendarHeader>
    <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none space-y-1"
      >
        <CalendarGridHead>
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="rounded-md text-xs text-green8"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="relative text-center text-sm"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center justify-center rounded-full whitespace-nowrap text-sm w-8 h-8 outline-none
                data-[outside-view]:text-black/30 data-[outside-view]:opacity-60
                transition-all duration-200 ease-in-out
                "
                :class="{
                  'bg-white text-purple font-bold': isSelected(weekDate),
                  'text-black hover:bg-stone-200': !isSelected(weekDate),
                }"
                @click="updateDate(weekDate)"
              >
                {{ weekDate.day }}
              </CalendarCellTrigger>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CalendarDate } from '@internationalized/date'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNext, CalendarPrev, CalendarRoot } from 'reka-ui'
import { ref, watch } from 'vue'

const model = defineModel<string>()

function formatDate(date: CalendarDate): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  return new Date(date.year, date.month - 1, date.day).toLocaleDateString('en-US', options)
}

const today = new Date()
const calendarDate = ref(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()))

watch(calendarDate, (newDate: any) => {
  model.value = formatDate(newDate)
}, { immediate: true })

function updateDate(date: CalendarDate) {
  calendarDate.value = date
}

function isSelected(date: CalendarDate) {
  return (
    date.day === calendarDate.value.day
    && date.month === calendarDate.value.month
    && date.year === calendarDate.value.year
  )
}
</script>
