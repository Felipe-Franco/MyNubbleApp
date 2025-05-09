import { create } from 'zustand/react'

import { Toast, ToastService } from '@services'

const useToastStore = create<ToastService>((set) => ({
  toast: null,
  showToast: (toast) => set({ toast }),
  hideToast: () => set({ toast: null }),
}))

export function useToastZustand(): Toast | null {
  return useToastStore((store) => store.toast)
}

export function useToastServiceZustand(): Pick<
  ToastService,
  'showToast' | 'hideToast'
> {
  const showToast = useToastStore((store) => store.showToast)
  const hideToast = useToastStore((store) => store.hideToast)

  return {
    showToast,
    hideToast,
  }
}
