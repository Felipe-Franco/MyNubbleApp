import {
  ActivityIndicator,
  Box,
  ProfileAvatar,
  Screen,
  Text,
} from '@components'
import { useUserGetById } from '@domain'
import { AppScreenProps } from '@routes'

type ProfileScreenProps = AppScreenProps<'ProfileScreen'>

export function ProfileScreen({ route }: ProfileScreenProps) {
  const { userId } = route.params
  const { user, isLoading, isError } = useUserGetById(userId)

  return (
    <Screen canGoBack={true}>
      {isLoading && <ActivityIndicator />}
      {isError && <Text preset='paragraphMedium'>Erro ao obter usuário</Text>}
      {user && (
        <Box alignItems='center'>
          <ProfileAvatar
            profileURL={user.profileUrl}
            size={64}
            borderRadius={24}
          />
          <Text preset='headingMedium' bold={true}>
            {user.fullName}
          </Text>
          <Text>@{user.username}</Text>
        </Box>
      )}
    </Screen>
  )
}
