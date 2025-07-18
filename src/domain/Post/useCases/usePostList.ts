import { postService } from '@domain'
import { QueryKeys, usePaginatedList } from '@infra'

export function usePostList() {
  return usePaginatedList([QueryKeys.GetPostList], postService.getList)
}
