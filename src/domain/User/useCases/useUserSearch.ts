import { userService } from '@domain'
import { QueryKeys, usePaginatedList } from '@infra'

export function useUserSearch(search: string) {
  return usePaginatedList(
    [QueryKeys.GetUserList, search],
    () => userService.searchUser(search),
    {
      enabled: search.length > 0,
      staleTime: 30000,
    },
  )
}
