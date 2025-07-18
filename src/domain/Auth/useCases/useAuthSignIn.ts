import { useMutation } from '@tanstack/react-query'

import { MutationOptions } from '@infra'
import { useAuthCredentials } from '@services'

import { authService } from '../authService'
import { AuthCredentials } from '../authTypes'

type Variables = {
  email: string
  password: string
}

export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const { saveCredentials } = useAuthCredentials()
  const { mutate, error, isPending } = useMutation<
    AuthCredentials,
    //TODO: Mapear erros corretamente da api
    Error,
    Variables
  >({
    mutationFn: ({ email, password }) => {
      return authService.signIn(email, password)
    },
    onSuccess: (data) => {
      saveCredentials(data)

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message || 'Erro ao realizar Login')
      }
    },
  })

  function signIn(variables: Variables) {
    mutate(variables)
  }

  return {
    signIn,
    isLoading: isPending,
    error,
  }
}
