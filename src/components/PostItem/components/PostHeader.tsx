import { useNavigation } from '@react-navigation/native'

import { PressableBox, ProfileAvatar, Text } from '@components'
import { Post } from '@domain'

type PostHeaderProps = Pick<Post, 'author'>

export function PostHeader({ author }: PostHeaderProps) {
  const navigation = useNavigation()

  function navigateToProfile() {
    navigation.navigate('ProfileScreen', {
      userId: author.id,
    })
  }

  return (
    <PressableBox
      flexDirection='row'
      alignItems='center'
      onPress={navigateToProfile}
      alignSelf='flex-start'
    >
      <ProfileAvatar profileURL={author.profileUrl} />
      <Text preset='paragraphMedium' semiBold={true} marginLeft='s12'>
        {author.name}
      </Text>
    </PressableBox>
  )
}
