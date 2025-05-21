import { useMutation } from '@tanstack/react-query'

import { authService } from '@domain'
import { MutationOptions } from '@infra'
import { useAuthCredentials } from '@services'

export function useAuthSignOut(options?: MutationOptions<void>) {
  const { removeCredentials } = useAuthCredentials()
  const { mutate, error, isPending } = useMutation<string, Error, void>({
    mutationFn: authService.signOut,
    onSuccess: removeCredentials,
    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message || 'Erro ao reliazar Logout')
      }
    },
  })

  function signOut() {
    mutate()
  }

  return {
    signOut,
    error,
    isPending,
  }
}
