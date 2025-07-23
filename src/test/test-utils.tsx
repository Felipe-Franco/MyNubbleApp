import * as React from 'react'
import { ReactNode } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { RenderOptions, render } from '@testing-library/react-native'

import { theme } from '@theme'

function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: AllTheProviders, ...options })
}

// eslint-disable-next-line import/export
export * from '@testing-library/react-native'
// eslint-disable-next-line import/export
export { customRender as render }
