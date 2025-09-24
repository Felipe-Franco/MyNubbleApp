import { useAuthCredentials, useShowOnboarding } from '@services'

export type Stacks = 'Auth' | 'App' | 'Onboarding'

export function useRouter(): Stacks {
  const showOnboarding = useShowOnboarding()
  const { authCredentials } = useAuthCredentials()

  if (showOnboarding) {
    return 'Onboarding'
  }

  if (authCredentials) {
    return 'App'
  }

  return 'Auth'
}
