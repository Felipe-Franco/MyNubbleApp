import { api } from '@api'

import { authAdapter } from './authAdapter'
import { authApi } from './authApi'
import { SignUpDataApi } from './authTypes'

async function signIn(email: string, password: string) {
  try {
    const result = await authApi.signIn(email, password)
    return authAdapter.toAuthCredentials(result)
  } catch (error) {
    throw new Error('email ou senha inválidos')
  }
}

async function signOut() {
  return await authApi.signOut()
}

async function signUp(signUpData: SignUpDataApi) {
  await authApi.signUp(signUpData)
}

async function isUserNameAvailable(username: string) {
  const result = await authApi.isUserNameAvailable({ username })
  return result.isAvailable
}

async function isEmailAvailable(email: string) {
  const result = await authApi.isEmailAvailable({ email })
  return result.isAvailable
}

async function requestNewPassword(email: string) {
  const result = await authApi.forgotPassword({ email })
  return result.message
}

async function authenticateByRefreshToken(refreshToken: string) {
  const result = await authApi.refreshToken(refreshToken)
  return authAdapter.toAuthCredentials(result)
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

function removeToken() {
  api.defaults.headers.common.Authorization = null
}

export const authService = {
  signIn,
  signOut,
  signUp,
  updateToken,
  removeToken,
  isUserNameAvailable,
  isEmailAvailable,
  requestNewPassword,
  authenticateByRefreshToken,
}
