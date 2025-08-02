import { useCallback, useEffect } from 'react'
import { Animated, StyleSheet, useAnimatedValue } from 'react-native'

import { useToast, useToastService } from '@services'

import { ToastContent } from './components/ToastContent'

const DEFAULT_TOAST_DURATION = 3000
const FADE_ANIMATION_DURATION = 300

export function Toast() {
  const toast = useToast()
  const toastPosition = toast?.position ? toast.position : 'top'
  const { hideToast } = useToastService()
  const fadeAnim = useAnimatedValue(0)

  const runEnterAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const runExitAnimation = useCallback(
    (callBack: Animated.EndCallback) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: FADE_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(callBack)
    },
    [fadeAnim],
  )

  useEffect(() => {
    if (toast) {
      runEnterAnimation()

      setTimeout(() => {
        runExitAnimation(hideToast)
      }, toast.duration || DEFAULT_TOAST_DURATION)
    }
  }, [toast, hideToast, runEnterAnimation, runExitAnimation])

  if (!toast) {
    return null
  }

  return (
    <Animated.View
      testID='toast-message'
      style={[
        styles.animatedContainer,
        styles[toastPosition],
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <ToastContent toast={toast} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  top: {
    top: 50,
  },
  bottom: {
    bottom: 100,
  },
})
