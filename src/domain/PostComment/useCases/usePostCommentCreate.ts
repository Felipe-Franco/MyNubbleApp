import { PostComment, postCommentService } from '@domain'
import { MutationOptions, useMutation } from '@infra'

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const { mutate, loading, error } = useMutation<
    {
      message: string
    },
    PostComment
  >(({ message }) => {
    return postCommentService.create(postId, message)
  }, options)

  async function createPostComment(message: string) {
    await mutate({ message })
  }

  return {
    createPostComment,
    loading,
    error,
  }
}
