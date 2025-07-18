import axios from 'axios'

import { AuthCredentials, authService } from '@domain'

import { authApi } from '../domain/Auth/authApi'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
})

type InterceptorParams = {
  authCredentials: AuthCredentials | null
  removeCredentials: () => Promise<void>
  saveCredentials: (authCredentials: AuthCredentials) => Promise<void>
}

export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials,
}: InterceptorParams) {
  const interceptor = api.interceptors.response.use(
    (response) => response,
    async (responseError) => {
      if (responseError.status === 401) {
        const failedRequest = responseError.config
        const hasNotAuthCredentials = authCredentials === null
        const isRefreshTokenRequest =
          authApi.isRefreshTokenRequest(failedRequest)

        if (
          hasNotAuthCredentials ||
          isRefreshTokenRequest ||
          failedRequest.sent
        ) {
          await removeCredentials()
          return Promise.reject(responseError)
        }

        // Marks the request to indicate that it has already been sent.
        failedRequest.sent = true

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials.refreshToken,
        )
        await saveCredentials(newAuthCredentials)

        if (failedRequest && failedRequest.headers) {
          failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`
          return api(failedRequest)
        }

        return responseError
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptor)
  }
}
