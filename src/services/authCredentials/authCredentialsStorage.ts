import { AuthCredentials } from '@domain'

import { storage } from '../storage/storage'

const AUTH_KEY = '@Auth'

async function get() {
  return await storage.getItem<AuthCredentials>(AUTH_KEY)
}

async function set(authCredentials: AuthCredentials) {
  await storage.setItem(AUTH_KEY, authCredentials)
}

async function remove() {
  await storage.removeItem(AUTH_KEY)
}

export const authCredentialsStorage = { get, set, remove }
