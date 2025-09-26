import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postCommentService } from '@domain'
import { MutationOptions, QueryKeys } from '@infra'

export function usePostCommentRemove(
  postId: number,
  options?: MutationOptions<string>,
) {
  const queryClient = useQueryClient()

  const { mutate, error, isPending } = useMutation<
    string,
    Error,
    {
      postCommentId: number
    }
  >({
    mutationFn: ({ postCommentId }) => {
      return postCommentService.remove(postCommentId)
    },

    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetPostCommentList, postId],
      })

      if (options?.onSuccess) {
        options.onSuccess(result)
      }
    },

    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message)
      }
    },
  })

  return {
    removePostComment: mutate,
    isLoading: isPending,
    error,
  }
}
