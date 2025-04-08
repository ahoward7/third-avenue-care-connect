<template>
  <button class="rounded-md w-fit h-fit text-center duration-200 hover:brightness-[1.07] cursor-pointer">
    <NuxtLink tabindex="-1" :to="to">
      <div class="text-white font-semibold outline-none" :class="sizeClass">
        <slot />
      </div>
    </NuxtLink>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
  },
  size: {
    type: String as () => keyof typeof sizeClasses,
    default: 'large',
    validator: (value: string) => ['small', 'large'].includes(value),
  },
})

const sizeClasses: { [key: string]: string } = {
  small: 'px-3 py-1 text-sm',
  large: 'px-4 py-3 text-base',
}

const sizeClass = sizeClasses[props.size] || sizeClasses.large
</script>
