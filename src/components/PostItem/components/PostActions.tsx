import { useNavigation } from '@react-navigation/native'

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components'
import { Post, useReactToPost } from '@domain'
import { AppQueryKeys } from '@infra'

type PostActionsProps = {
  post: Post
  hideCommentAction: boolean
}

export function PostActions({ post, hideCommentAction }: PostActionsProps) {
  const navigation = useNavigation()

  const likeReaction = useReactToPost({
    post,
    postReactionType: 'like',
  })

  const favoriteReaction = useReactToPost({
    post,
    postReactionType: 'favorite',
    appQueryKey: AppQueryKeys.GetFavoriteList,
  })

  function navigateToPostCommentScreen() {
    navigation.navigate('PostCommentScreen', {
      postId: post.id,
      postAuthorId: post.author.id,
    })
  }

  return (
    <Box flexDirection='row' marginTop='s16'>
      <ActionItem
        marked={likeReaction.hasReacted}
        icon={{ default: 'heart', marked: 'heartFill' }}
        onPress={likeReaction.reactToPost}
        reactionCount={likeReaction.reactionCount}
      />

      <ActionItem
        marked={false}
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        onPress={navigateToPostCommentScreen}
        reactionCount={post.commentCount}
        disabled={hideCommentAction}
      />

      <ActionItem
        marked={favoriteReaction.hasReacted}
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
        onPress={favoriteReaction.reactToPost}
        reactionCount={favoriteReaction.reactionCount}
      />
    </Box>
  )
}

interface ActionItemProps {
  marked: boolean
  icon: {
    default: IconProps['name']
    marked: IconProps['name']
  }
  onPress?: () => void
  reactionCount: number
  disabled?: boolean
}

function ActionItem({
  reactionCount,
  onPress,
  disabled,
  icon,
  marked,
}: ActionItemProps) {
  return (
    <TouchableOpacityBox
      disabled={disabled}
      flexDirection='row'
      alignItems='center'
      marginRight='s24'
      onPress={onPress}
    >
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'marked' : 'backgroundContrast'}
      />
      {reactionCount > 0 && (
        <Text preset='paragraphSmall' marginLeft='s4' bold={true}>
          {reactionCount}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
