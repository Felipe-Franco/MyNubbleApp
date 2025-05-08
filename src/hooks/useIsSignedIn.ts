import { createContext, useContext } from 'react'

export const SignInContext = createContext({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
})

export function useIsSignedIn() {
  return useContext(SignInContext).isSignedIn
}

export function useIsSignedOut() {
  return !useIsSignedIn()
}
