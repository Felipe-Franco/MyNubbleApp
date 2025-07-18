import { User, UserAPI } from '@domain'

export interface AuthCredentials {
  token: string
  user: User
  tokenExpiresAt: string
  refreshToken: string
}

export interface AuthCredentialsAPI {
  auth: {
    type: string
    token: string
    refreshToken: string
    expires_at: string //'2025-07-17T06:28:44.380+00:00'
  }
  user: UserAPI

}

export interface SignInData {
  username?: string
  email?: string
  password: string
}

export interface SignUpDataApi {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface SignUpData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface FieldIsAvailableAPI {
  message: string
  isAvailable: boolean
}
