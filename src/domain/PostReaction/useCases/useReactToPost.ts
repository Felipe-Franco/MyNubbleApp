import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Post,
  PostReactionBase,
  postReactionService,
  PostReactionType,
} from '@domain'
import { AppQueryKeys, MutationOptions } from '@infra'

type UseReactToPostParams = {
  post: Post
  postReactionType: PostReactionType
  options?: MutationOptions<PostReactionBase>
  appQueryKey?: AppQueryKeys
}

export function useReactToPost({
  post,
  postReactionType,
  options,
  appQueryKey,
}: UseReactToPostParams) {
  const queryClient = useQueryClient()

  const initialHasReacted = postReactionService.hasReactedToPost(
    post.reactions,
    postReactionType,
  )

  const initialReactionCount =
    postReactionType === 'like' ? post.reactionCount : post.favoriteCount

  const [reactionState, setReactionState] = useState({
    reactionCount: initialReactionCount,
    hasReacted: initialHasReacted,
  })

  const { mutate } = useMutation<PostReactionBase, Error>({
    mutationFn: () =>
      postReactionService.reactToPost(post.id, postReactionType),

    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data)
      }

      if (appQueryKey) {
        queryClient.invalidateQueries({ queryKey: [appQueryKey] })
      }
    },

    onError: (error) => {
      toggleReactionState()

      if (options?.onError) {
        options.onError(error.message)
      }
    },
  })

  function reactToPost() {
    toggleReactionState()

    mutate()
  }

  function toggleReactionState() {
    setReactionState((prevState) => ({
      hasReacted: !prevState.hasReacted,
      reactionCount: prevState.hasReacted
        ? prevState.reactionCount - 1
        : prevState.reactionCount + 1,
    }))
  }

  return {
    hasReacted: reactionState.hasReacted,
    reactionCount: reactionState.reactionCount,
    reactToPost,
  }
}
