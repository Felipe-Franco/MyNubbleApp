import { api } from '@api'
import { AuthCredentialsAPI, SignUpDataApi, UserAPI } from '@domain'

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>('/login', {
    email,
    password,
  })

  return response.data
}

async function signOut(): Promise<string> {
  const response = await api.get<{ message: string }>('/profile/logout')
  return response.data.message
}

async function signUp(data: SignUpDataApi): Promise<UserAPI> {
  const response = await api.post<UserAPI>('/register', data)
  return response.data
}

export const authApi = {
  signIn,
  signOut,
  signUp,
}
