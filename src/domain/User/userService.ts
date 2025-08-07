import { apiAdapter } from '@api'
import { User } from '@domain'
import { Page } from '@types'

import { userAdapter } from './userAdapter'
import { userApi } from './userApi'

async function getById(id: number): Promise<User> {
  const user = await userApi.getById(id)

  return userAdapter.toUser(user)
}

async function searchUser(search: string): Promise<Page<User>> {
  const userPageAPI = await userApi.getList(search)

  return apiAdapter.toPageModel(userPageAPI, userAdapter.toUser)
}

export const userService = {
  getById,
  searchUser,
}
