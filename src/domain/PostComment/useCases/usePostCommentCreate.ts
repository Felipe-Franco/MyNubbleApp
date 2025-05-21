import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PostComment, postCommentService } from '@domain'
import { MutationOptions, QueryKeys } from '@infra'

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const queryClient = useQueryClient()

  const { mutate, error, isPending } = useMutation<
    PostComment,
    Error,
    {
      message: string
    }
  >({
    mutationFn: ({ message }) => {
      return postCommentService.create(postId, message)
    },

    onSuccess: (postComment) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetPostCommentList, postId],
      })

      if (options?.onSuccess) {
        options.onSuccess(postComment)
      }
    },

    onError: (e) => {
      if (options?.onError) {
        options.onError(e.message || 'Erro ao criar post')
      }
    },
  })

  async function createPostComment(message: string) {
    mutate({ message })
  }

  return {
    createPostComment,
    isPending,
    error,
  }
}
