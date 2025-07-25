import { useMutation } from '@tanstack/react-query'

import { authService, SignUpData } from '@domain'
import { MutationOptions } from '@infra'

export function useAuthSignUp(options?: MutationOptions<void>) {
  const { mutate, isPending, error } = useMutation<void, Error, SignUpData>({
    mutationFn: authService.signUp,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess()
      }
    },
    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message)
      }
    },
  })

  function signUp(signUpData: SignUpData) {
    mutate(signUpData)
  }

  return {
    signUp,
    isLoading: isPending,
    error: error,
  }
}
