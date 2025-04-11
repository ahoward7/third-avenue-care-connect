<template>
  <div class="absolute z-50 top-0 left-0 right-0 h-screen flex justify-end p-4 pointer-events-none overflow-hidden">
    <transition-group name="toast" tag="div">
      <div
        v-for="(toast, index) in toasts"
        :key="toast.id || index"
        class="w-60 h-fit px-6 py-4 mb-2 bg-success/20 text-success rounded-md shadow-md"
      >
        <div class="text-sm font-bold mb-1">
          {{ getHeaderMessage(toast.type) }}
        </div>
        <div class="font-semibold">
          {{ toast.message }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
const toastStore = useToastStore()

const toasts = toastStore.toasts

function getHeaderMessage(type: string) {
  switch (type) {
    case 'success':
      return 'Success!'
    case 'error':
      return 'Error'
    default:
      return ''
  }
}
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.toast-leave-active {
  right: 20px;
  position: absolute;
}
</style>
