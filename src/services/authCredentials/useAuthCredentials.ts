import { useContext } from 'react'

import { AuthCredentialsService } from './authCredentialsType'
import { AuthCredentialsContext } from './Providers/AuthCredentialsProvider'

export function useAuthCredentials(): AuthCredentialsService {
  const authContext = useContext(AuthCredentialsContext)

  if (!authContext) {
    throw new Error(
      'useAuthCredentials must be used within a AuthCredentialsProvider',
    )
  }

  return authContext
}

// const useAuthCredentialsZustand = create<AuthCredentialsService>()(
//   persist(
//     (set) => ({
//       authCredentials: null,
//       isLoading: false,
//       saveCredentials: async (authCredentials) => set({ authCredentials }),
//       removeCredentials: async () => set({ authCredentials: null }),
//     }),
//     {
//       name: '@Auth',
//       storage: storage,
//     },
//   ),
// )
