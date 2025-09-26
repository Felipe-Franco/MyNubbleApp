import { Image } from 'react-native'

import { PressableBox, Text } from '@components'
import { PostReaction } from '@domain'

interface FavoriteItemProps {
  postReaction: PostReaction
  itemWidth: number
  onPress: () => void
}

export function FavoriteItem({
  postReaction,
  itemWidth,
  onPress,
}: FavoriteItemProps) {
  return (
    <PressableBox maxWidth={itemWidth} onPress={onPress} flex={1}>
      <Image
        source={{ uri: postReaction.post.imageURL }}
        style={{ width: itemWidth, height: itemWidth }}
      />
      <Text semiBold={true} marginTop='s4'>
        {postReaction.author.username}
      </Text>
    </PressableBox>
  )
}
