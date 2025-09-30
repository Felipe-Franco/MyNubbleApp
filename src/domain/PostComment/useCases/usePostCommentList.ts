import { postCommentService } from '@domain'
import { AppQueryKeys, usePaginatedList } from '@infra'

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommentService.getList(postId, page)
  }

  return usePaginatedList([AppQueryKeys.GetPostCommentList, postId], getList)
}
