import React, { ReactElement } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native'

import { AuthCredentialsProvider } from '@services'
import { theme } from '@theme'

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
    mutations: {
      retry: false,
      gcTime: Infinity,
    },
  },
}

function wrapAllProviders() {
  const queryClient = new QueryClient(queryClientConfig)

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children} </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

function wrapScreenProviders() {
  const queryClient = new QueryClient(queryClientConfig)

  return ({ children }: { children: React.ReactNode }) => (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>{children} </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  )
}

function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: wrapAllProviders(), ...options })
}

function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: wrapScreenProviders(), ...options })
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(renderCallback, {
    wrapper: wrapAllProviders(),
    ...options,
  })
}

// eslint-disable-next-line import/export
export * from '@testing-library/react-native'
// eslint-disable-next-line import/export
export { customRender as render }
// eslint-disable-next-line import/export
export { customRenderHook as renderHook }
export { renderScreen }
