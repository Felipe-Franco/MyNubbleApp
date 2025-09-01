import { useMutation } from '@tanstack/react-query'

import { authService } from '@domain'
import { MutationOptions } from '@infra'
import { useAuthCredentials, useSearchHistoryService } from '@services'

export function useAuthSignOut(options?: MutationOptions<void>) {
  const { removeCredentials } = useAuthCredentials()
  const { clearUserList } = useSearchHistoryService()

  const { mutate, error, isPending } = useMutation<string, Error, void>({
    mutationFn: authService.signOut,
    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message)
      }
    },
    onSettled: () => {
      removeCredentials()
      clearUserList()
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
