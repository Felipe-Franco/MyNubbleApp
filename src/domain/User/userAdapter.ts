import { User, UserAPI } from '@domain'

function toUser(userApi: UserAPI): User {
  return {
    id: userApi.id,
    email: userApi.email,
    firstName: userApi.first_name,
    fullName: userApi.full_name,
    lastName: userApi.last_name,
    username: userApi.username,
    isOnline: userApi.is_online,
    profileUrl: userApi.profile_url,
  }
}

export const userAdapter = {
  toUser,
}
