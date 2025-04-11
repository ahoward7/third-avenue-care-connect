import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  function addToast(toast: Partial<Toast>) {
    toast.id = Date.now()
    toast.type = toast.type || 'info'

    toasts.value.push(toast as Toast)

    setTimeout(() => {
      toasts.value.splice(toasts.value.findIndex(t => t.id === toast.id), 1)
    }, 8000)
  }

  return {
    toasts,
    addToast,
  }
})
