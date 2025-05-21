import { AuthCredentials, AuthCredentialsAPI } from '@domain'

import { userAdapter } from '../User/userAdapter'

function toAuthCredentials(authApi: AuthCredentialsAPI): AuthCredentials {
  return {
    token: authApi.auth.token,
    user: userAdapter.toUser(authApi.user),
  }
}

export const authAdapter = {
  toAuthCredentials,
}
