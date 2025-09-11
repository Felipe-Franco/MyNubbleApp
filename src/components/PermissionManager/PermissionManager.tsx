import { ReactElement } from 'react'
import { Linking, Platform } from 'react-native'

import { ActivityIndicator, Box, Button, Screen, Text } from '@components'
import { PermissionName, usePermission } from '@services'

interface PermissionManagerProps {
  permissionName: PermissionName
  description: string
  children: ReactElement
}

export function PermissionManager({
  permissionName,
  description,
  children,
}: PermissionManagerProps) {
  const { status, isLoading } = usePermission(permissionName)
  if (status === 'granted') return children

  return (
    <Screen canGoBack={true} flex={1}>
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text preset='headingSmall' textAlign='center'>
          {description}
        </Text>
        {isLoading && <ActivityIndicator color='primary' />}

        {status === 'unavailable' && (
          <Text
            preset='paragraphMedium'
            color='error'
            bold={true}
            marginVertical='s16'
            textAlign='center'
          >
            Este recurso não está disponível para este dispositivo
          </Text>
        )}

        {status === 'never_ask_again' && (
          <>
            {Platform.OS === 'android' && (
              <Text
                preset='paragraphMedium'
                color='error'
                bold={true}
                marginVertical='s16'
                textAlign='center'
              >
                É necessário abrir e fechar o App novamente após alterar as
                configurações
              </Text>
            )}
            <Button
              marginTop='s24'
              title='Abrir configurações'
              onPress={Linking.openSettings}
            />
          </>
        )}
      </Box>
    </Screen>
  )
}
