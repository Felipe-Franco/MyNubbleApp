import { User, UserAPI } from '@domain'

export interface AuthCredentials {
  token: string
  user: User
}

export interface AuthCredentialsAPI {
  auth: {
    type: string
    token: string
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

