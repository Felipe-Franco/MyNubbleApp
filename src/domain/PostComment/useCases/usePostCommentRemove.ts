import { postCommentService } from '@domain'
import { MutationOptions, useMutation } from '@infra'

export function usePostCommentRemove(options?: MutationOptions<string>) {
  const { mutate, loading, error } = useMutation<
    { postCommentId: number },
    string
  >(({ postCommentId }) => postCommentService.remove(postCommentId), options)

  return {
    removePostComment: mutate,
    loading,
    error,
  }
}
