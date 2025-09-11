import { useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { Camera, useCameraDevice } from 'react-native-vision-camera'

import { Box, Icon, PermissionManager } from '@components'
import { useAppSafeArea, useAppState } from '@hooks'
import { AppScreenProps } from '@routes'

type CameraScreenProps = AppScreenProps<'CameraScreen'>

const CAMERA_SIZE = Dimensions.get('screen').width
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_SIZE) / 2
const CONTROL_DIFF = 30

export function CameraScreen({ navigation }: CameraScreenProps) {
  const [flashOn, setFlashOn] = useState(false)
  const { top } = useAppSafeArea()
  const device = useCameraDevice('back')

  const isFocused = useIsFocused()
  const appState = useAppState()
  const isCameraActive = isFocused && appState === 'active'

  function toggleFlash() {
    setFlashOn((prev) => !prev)
  }

  return (
    <PermissionManager
      permissionName='camera'
      description='Permita o Nubble acessar a câmera'
    >
      <Box flex={1}>
        {device != null && (
          <Camera
            device={device}
            isActive={isCameraActive}
            style={StyleSheet.absoluteFill}
          />
        )}

        <Box flex={1} justifyContent='space-between'>
          <Box
            flexDirection='row'
            backgroundColor='black60'
            paddingHorizontal='s24'
            justifyContent='space-between'
            height={CONTROL_HEIGHT - CONTROL_DIFF}
            style={{ paddingTop: top }}
          >
            <Icon
              name='arrowLeft'
              color='grayWhite'
              size={20}
              onPress={navigation.goBack}
            />
            <Icon
              name={flashOn ? 'flashOn' : 'flashOff'}
              color='grayWhite'
              size={20}
              onPress={toggleFlash}
            />
            <Box width={20} />
          </Box>
          <Box
            backgroundColor='black60'
            paddingHorizontal='s24'
            height={CONTROL_HEIGHT + CONTROL_DIFF}
            justifyContent='center'
            alignItems='center'
          >
            <Icon size={80} name='cameraClick' color='grayWhite' />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  )
}
