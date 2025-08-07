import { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

import { Box, BoxProps } from '@components'
import { useAppSafeArea, useAppTheme } from '@hooks'

import {
  ScrollViewContainer,
  ViewContainer,
} from './components/ScreenContainer'
import { ScreenHeader } from './components/ScreenHeader'

export interface ScreenProps extends BoxProps {
  children?: ReactNode
  HeaderComponent?: ReactNode
  canGoBack?: boolean
  scrollable?: boolean
  title?: string
}

export function Screen({
  canGoBack = false,
  scrollable = false,
  children,
  title,
  style,
  HeaderComponent,
  ...boxProps
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea()
  const { colors } = useAppTheme()
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height'
  const Container = scrollable ? ScrollViewContainer : ViewContainer

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={styles.keyboardAvoidingView}
    >
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal='s24'
          style={[{ paddingTop: top, paddingBottom: bottom }, style]}
          {...boxProps}
        >
          <ScreenHeader
            canGoBack={canGoBack}
            title={title}
            HeaderComponent={HeaderComponent}
          />
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
})
