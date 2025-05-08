import { api, PageAPI, PageParams } from '@api'
import { PostCommentAPI } from '@domain'

async function getList(
  post_id: number,
  pageParams: PageParams,
): Promise<PageAPI<PostCommentAPI>> {
  const response = await api.get<PageAPI<PostCommentAPI>>('user/post_comment', {
    params: {
      post_id,
      ...pageParams,
    },
  })

  return response.data
}

async function create(
  postId: number,
  message: string,
): Promise<PostCommentAPI> {
  const response = await api.post<PostCommentAPI>('user/post_comment', {
    post_id: postId,
    message,
  })

  return response.data
}

export const postCommentApi = {
  getList,
  create,
}
