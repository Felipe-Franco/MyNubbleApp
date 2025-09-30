import { useQuery } from '@tanstack/react-query'

import { userService } from '@domain'
import { AppQueryKeys } from '@infra'

export function useUserGetById(userId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [AppQueryKeys.GetUserById, userId],
    queryFn: () => userService.getById(userId),
    staleTime: 1000 * 30, // 30 seconds
  })

  return {
    user: data,
    isLoading,
    isError,
  }
}
