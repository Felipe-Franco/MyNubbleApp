import { AuthCredentials } from '@domain'
import { asyncStorage } from '@services'

const AUTH_KEY = '@Auth'

async function get() {
  return await asyncStorage.getItem<AuthCredentials>(AUTH_KEY)
}

async function set(authCredentials: AuthCredentials) {
  await asyncStorage.setItem(AUTH_KEY, authCredentials)
}

async function remove() {
  await asyncStorage.removeItem(AUTH_KEY)
}

export const authCredentialsStorage = { get, set, remove }
