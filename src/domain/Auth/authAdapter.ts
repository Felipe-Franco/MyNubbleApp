import { AuthCredentials, AuthCredentialsAPI } from '@domain'

import { userAdapter } from '../User/userAdapter'

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentials {
  return {
    token: authCredentialsAPI.auth.token,
    user: userAdapter.toUser(authCredentialsAPI.user),
    refreshToken: authCredentialsAPI.auth.refreshToken,
    tokenExpiresAt: authCredentialsAPI.auth.expires_at,
  }
}

export const authAdapter = {
  toAuthCredentials,
}
