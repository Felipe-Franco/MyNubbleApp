import * as React from 'react'
import { ReactNode } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import { RenderOptions, render } from '@testing-library/react-native'

import { theme } from '@theme'

function AllTheProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
