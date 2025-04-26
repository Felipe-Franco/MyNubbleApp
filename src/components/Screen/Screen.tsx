import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Box, Icon, Text, TouchableOpacityBox } from '@components'
import { useAppSafeArea, useAppTheme } from '@hooks'

import {
  ScrollViewContainer,
  ViewContainer,
} from './components/ScreenContainer'

interface ScreenProps {
  children?: React.ReactNode
  canGoBack?: boolean
  scrollable?: boolean
}

export function Screen({
  canGoBack = false,
  scrollable = false,
  children,
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea()
  const { colors } = useAppTheme()
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height'
  const Container = scrollable ? ScrollViewContainer : ViewContainer
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={styles.keyboardAvoidingView}
    >
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal='s24'
          style={{ paddingTop: top, paddingBottom: bottom }}
        >
          {canGoBack && (
            <TouchableOpacityBox
              onPress={navigation.goBack}
              marginBottom='s24'
              flexDirection='row'
              alignItems='center'
              alignSelf='flex-start'
            >
              <Icon name='arrowLeft' color='primary' />
              <Text preset='paragraphMedium' semiBold={true} marginLeft='s8'>
                Voltar
              </Text>
            </TouchableOpacityBox>
          )}
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
