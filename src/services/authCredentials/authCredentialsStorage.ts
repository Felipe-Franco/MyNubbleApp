import { AuthCredentials } from '@domain'

import { MMKVStorage } from '../storage/implementation/MMKVStorage'

const AUTH_KEY = '@Auth'

async function get() {
  return await MMKVStorage.getItem<AuthCredentials>(AUTH_KEY)
}

async function set(authCredentials: AuthCredentials) {
  await MMKVStorage.setItem(AUTH_KEY, authCredentials)
}

async function remove() {
  await MMKVStorage.removeItem(AUTH_KEY)
}

export const authCredentialsStorage = { get, set, remove }
