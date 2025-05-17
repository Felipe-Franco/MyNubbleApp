import { api } from '@api'
import { UserAPI } from '@domain'

async function getById(userId: number): Promise<UserAPI> {
  const response = await api.get<UserAPI>(`users/${userId}`)

  return response.data
}

export const userApi = {
  getById,
}
