import { userService } from '@domain'
import { AppQueryKeys, usePaginatedList } from '@infra'

export function useUserSearch(search: string) {
  return usePaginatedList(
    [AppQueryKeys.GetUserList, search],
    () => userService.searchUser(search),
    {
      enabled: search.length > 0,
      staleTime: 30000,
    },
  )
}
