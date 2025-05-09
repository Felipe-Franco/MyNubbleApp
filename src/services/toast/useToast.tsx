import { ToastService } from './toastTypes'
import { useToastServiceZustand, useToastZustand } from './useToastZustand'

export const useToast = (): ToastService['toast'] => {
  // const {toast} = useToastContext();
  // return toast;
  return useToastZustand();
};

export const useToastService = (): Pick<
  ToastService,
  'showToast' | 'hideToast'
> => {
  return useToastServiceZustand();
};
