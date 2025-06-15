import { UseFormGetFieldState, UseFormWatch } from 'react-hook-form'

import { useAuthIsEmailAvailable, useAuthIsUsernameAvailable } from '@domain'

import { SignUpSchema } from './signUpSchema'

interface Params {
  watch: UseFormWatch<SignUpSchema>
  getFieldState: UseFormGetFieldState<SignUpSchema>
}

export function useAsyncValidation({ watch, getFieldState }: Params) {
  const username = watch('username')
  const userNameState = getFieldState('username')
  const userNameIsValid = !userNameState.invalid && userNameState.isDirty
  const userNameQuery = useAuthIsUsernameAvailable(username, userNameIsValid)

  const email = watch('email')
  const emailState = getFieldState('email')
  const emailIsValid = !emailState.invalid && emailState.isDirty
  const emailQuery = useAuthIsEmailAvailable(email, emailIsValid)

  return {
    usernameValidation: {
      isUnavailable: userNameQuery.isUnavailable,
      isFetching: userNameQuery.isFetching,
      notReady: userNameQuery.isFetching || userNameQuery.isUnavailable,
    },
    emailValidation: {
      isUnavailable: emailQuery.isUnavailable,
      isFetching: emailQuery.isFetching,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
    },
  }
}
