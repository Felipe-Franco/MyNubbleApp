import { http, HttpResponse } from 'msw'

import { BASE_API_URL, PageAPI } from '@api'
import { POST_COMMENT_PATH, PostCommentAPI } from '@domain'

import { postCommentMocks } from './postCommentMocks'

let inMemoryResponse = { ...postCommentMocks.mockedPostCommentResponse }

const URL = `${BASE_API_URL}${POST_COMMENT_PATH}`

export const postCommentHandlers = [
  http.get(URL, async () => {
    const response: PageAPI<PostCommentAPI> = inMemoryResponse

    return HttpResponse.json(response, { status: 200 })
  }),

  http.post<
    any,
    {
      postId: number
      message: string
    }
  >(URL, async ({ request }) => {
    const body = await request.json()

    const newPostComment: PostCommentAPI = {
      ...postCommentMocks.postCommentAPI,
      id: 999,
      message: body.message,
      post_id: body.postId,
    }

    inMemoryResponse.data = [newPostComment, ...inMemoryResponse.data]
    inMemoryResponse.meta = {
      ...inMemoryResponse.meta,
      total: inMemoryResponse.meta.total + 1,
    }

    return HttpResponse.json(newPostComment, { status: 201 })
  }),
]
