import { useQuery } from '@tanstack/react-query'

import { userService } from '@domain'
import { QueryKeys } from '@infra'

export function useUserGetById(userId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.GetUserById, userId],
    queryFn: () => userService.getById(userId),
  })

  return {
    user: data,
    isLoading,
    isError,
  }
}
