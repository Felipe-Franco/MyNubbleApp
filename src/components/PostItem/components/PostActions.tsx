import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components'
import { Post } from '@domain'

type PostActionsProps = {
  post: Post
  hideCommentAction: boolean
}

export function PostActions({ post, hideCommentAction }: PostActionsProps) {
  return (
    <Box flexDirection='row' marginTop='s16'>
      <ActionItem
        iconName='heartFill'
        iconColor='marked'
        onPress={() => {}}
        count={post.reactionCount}
      />

      <ActionItem
        iconName='comment'
        iconColor='backgroundContrast'
        onPress={() => {}}
        count={post.commentCount}
        disabled={hideCommentAction}
      />

      <ActionItem
        iconName='bookmark'
        iconColor='backgroundContrast'
        onPress={() => {}}
        count={post.favoriteCount}
      />
    </Box>
  )
}

interface ActionItemProps {
  iconName: IconProps['name']
  iconColor: IconProps['color']
  onPress: () => void
  count: number
  disabled?: boolean
}

function ActionItem({
  iconName,
  count,
  iconColor,
  onPress,
  disabled,
}: ActionItemProps) {
  return (
    <TouchableOpacityBox
      disabled={disabled}
      flexDirection='row'
      alignItems='center'
      marginRight='s24'
      onPress={onPress}
    >
      <Icon name={iconName} color={iconColor} />
      {count > 0 && (
        <Text preset='paragraphSmall' marginLeft='s4' bold={true}>
          {count}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
