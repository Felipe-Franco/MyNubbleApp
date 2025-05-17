import { User } from '@domain'

import { userAdapter } from './userAdapter'
import { userApi } from './userApi'

async function getById(id: number): Promise<User> {
  const user = await userApi.getById(id)

  return userAdapter.toUser(user)
}

export const userService = {
  getById,
}
