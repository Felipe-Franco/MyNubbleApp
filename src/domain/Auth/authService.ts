import { api } from '@api'

import { authAdapter } from './authAdapter'
import { authApi } from './authApi'
import { SignUpDataApi } from './authTypes'

async function signIn(email: string, password: string) {
  try {
    const response = await authApi.signIn(email, password)
    return authAdapter.toAuthCredentials(response)
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
}
