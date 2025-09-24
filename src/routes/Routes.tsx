import { ReactElement } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'
import { OnboardingStack } from './OnboardingStack'
import { Stacks, useRouter } from './useRouter'

const stacks: Record<Stacks, ReactElement> = {
  App: <AppStack />,
  Auth: <AuthStack />,
  Onboarding: <OnboardingStack />,
}

export function Router() {
  const stack = useRouter()
  const Stack = stacks[stack]

  return <NavigationContainer>{Stack}</NavigationContainer>
}
