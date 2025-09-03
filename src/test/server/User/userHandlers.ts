import { HttpResponse, http } from 'msw'

import { BASE_API_URL, PageAPI } from '@api'
import { USER_PATH, UserAPI } from '@domain'

import { userMocks } from './userMocks'

const FULL_URL = `${BASE_API_URL}${USER_PATH}`

export const userHandlers = [
  http.get(FULL_URL, async () => {
    const response: PageAPI<UserAPI> = userMocks.mockedUserResponse

    return HttpResponse.json(response, { status: 200 })
  }),
  http.get<{ userId: string }>(`${FULL_URL}/:userId`, async ({ params }) => {
    const userApi = userMocks.userList.find(
      (user) => user.id.toString() === params.userId,
    )

    return HttpResponse.json(userApi, { status: 200 })
  }),
]
