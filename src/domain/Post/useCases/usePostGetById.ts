import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@infra'

import { postService } from '../postService'

export function usePostGetById(postId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.GetPostById, postId],
    queryFn: () => postService.getById(postId),
    staleTime: 1000 * 30, // 30 seconds
  })

  return {
    post: data,
    isLoading,
    isError,
  }
}
