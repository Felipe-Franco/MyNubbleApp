import { useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import {
  Camera,
  DeviceFilter,
  Templates,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera'

import { Box, Icon, PermissionManager } from '@components'
import { useAppSafeArea, useAppState } from '@hooks'
import { AppScreenProps } from '@routes'

type CameraScreenProps = AppScreenProps<'CameraScreen'>

const CAMERA_SIZE = Dimensions.get('screen').width
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_SIZE) / 2
const CONTROL_DIFF = 30

const deviceFilter: DeviceFilter = {
  physicalDevices: [
    'ultra-wide-angle-camera',
    'wide-angle-camera',
    'telephoto-camera',
  ],
}

export function CameraScreen({ navigation }: CameraScreenProps) {
  const [flashOn, setFlashOn] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const { top } = useAppSafeArea()

  const cameraRef = useRef<Camera>(null)
  const cameraDevice = useCameraDevice('back', deviceFilter)
  const cameraFormat = useCameraFormat(cameraDevice, Templates.Instagram)

  const isFocused = useIsFocused()
  const appState = useAppState()
  const isCameraActive = isFocused && appState === 'active'

  function toggleFlash() {
    setFlashOn((prev) => !prev)
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePhoto({
        flash: flashOn ? 'on' : 'off',
      })

      navigation.navigate('PublishPostScreen', {
        imageUri: `file://${photo?.path}`,
      })
    }
  }

  return (
    <PermissionManager
      permissionName='camera'
      description='Permita o Nubble acessar a câmera'
    >
      <Box flex={1}>
        {cameraDevice != null && (
          <Camera
            ref={cameraRef}
            device={cameraDevice}
            format={cameraFormat}
            photo={true}
            isActive={isCameraActive}
            style={StyleSheet.absoluteFill}
            onInitialized={() => setIsCameraReady(true)}
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
            {isCameraReady && (
              <Icon
                size={80}
                name='cameraClick'
                color='grayWhite'
                onPress={takePhoto}
              />
            )}
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  )
}
