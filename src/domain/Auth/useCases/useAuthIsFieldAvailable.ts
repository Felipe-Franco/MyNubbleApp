import { useQuery } from '@tanstack/react-query'

import { authService } from '@domain'
import { useDebounce } from '@hooks'
import { AppQueryKeys } from '@infra'

interface Params {
  value: string
  enabled: boolean
  queryKey: AppQueryKeys
  isAvailableFunc: (value: string) => Promise<boolean>
}

function useAuthIsFieldAvailable({
  value,
  enabled,
  queryKey,
  isAvailableFunc,
}: Params) {
  const debouncedValue = useDebounce(value, 1500)

  const { data, isFetching } = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isAvailableFunc(debouncedValue),
    staleTime: 1000 * 60,
    enabled: enabled && debouncedValue.length > 0,
    retry: false,
  })

  const isDebouncing = debouncedValue !== value

  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  }
}

export function useAuthIsUsernameAvailable(username: string, enabled: boolean) {
  return useAuthIsFieldAvailable({
    value: username,
    enabled: enabled,
    queryKey: AppQueryKeys.IsUsernameAvailable,
    isAvailableFunc: authService.isUserNameAvailable,
  })
}

export function useAuthIsEmailAvailable(email: string, enabled: boolean) {
  return useAuthIsFieldAvailable({
    value: email,
    enabled: enabled,
    queryKey: AppQueryKeys.IsEmailAvailable,
    isAvailableFunc: authService.isEmailAvailable,
  })
}
