import { useState } from 'react'

import { postCommentService } from '@domain'

export function usePostCommentCreate(postId: number) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function createPostComment(message: string) {
    try {
      setLoading(true)
      setError(null)
      await postCommentService.create(postId, message)
    } catch (e) {
      setError('Erro ao criar post')
    } finally {
      setLoading(false)
    }
  }

  return {
    createPostComment,
    loading,
    error,
  }
}
