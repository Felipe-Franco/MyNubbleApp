import { PageAPI, PageParams, api } from '@api'
import { PostAPI } from '@domain'

async function getList(params?: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await api.get<PageAPI<PostAPI>>('user/post', {
    params: params,
  })
  return response.data
}

export const postApi = {
  getList,
}
