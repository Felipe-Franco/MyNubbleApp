import { ReactElement } from 'react'
import { Linking } from 'react-native'

import { ActivityIndicator, Button, Screen, Text } from '@components'
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
  console.log({ status })

  if (status === 'granted') return children

  return (
    <Screen flex={1} justifyContent='center' alignItems='center'>
      <Text preset='headingSmall' textAlign='center'>
        {description}
      </Text>
      {isLoading && <ActivityIndicator color='primary' />}
      {status === 'never_ask_again' && (
        <Button
          marginTop='s24'
          title='Abrir configurações'
          onPress={Linking.openSettings}
        />
      )}
    </Screen>
  )
}
