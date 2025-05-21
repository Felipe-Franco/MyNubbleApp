import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { AuthCredentials, authService } from '@domain'
import { AuthCredentialsService, authCredentialsStorage } from '@services'

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: false,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
})

export function AuthCredentialsProvider({ children }: PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeAuthCredentials()
  }, [])

  async function initializeAuthCredentials() {
    try {
      const tempAuthCredentials = await authCredentialsStorage.get()

      if (tempAuthCredentials) {
        authService.updateToken(tempAuthCredentials.token)
        setAuthCredentials(tempAuthCredentials)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  async function saveCredentials(
    newCredentials: AuthCredentials,
  ): Promise<void> {
    await authCredentialsStorage.set(newCredentials)
    authService.updateToken(newCredentials.token)
    setAuthCredentials(newCredentials)
  }

  async function removeCredentials() {
    await authCredentialsStorage.remove()
    authService.removeToken()
    setAuthCredentials(null)
  }

  return (
    <AuthCredentialsContext
      value={{ authCredentials, isLoading, saveCredentials, removeCredentials }}
    >
      {children}
    </AuthCredentialsContext>
  )
}
