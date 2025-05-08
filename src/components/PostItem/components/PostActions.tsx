import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components'
import { Post } from '@domain'

type PostActionsProps = Pick<
  Post,
  'commentCount' | 'favoriteCount' | 'reactionCount'
>

export function PostActions({
  favoriteCount,
  reactionCount,
  commentCount,
}: PostActionsProps) {
  return (
    <Box flexDirection='row' marginTop='s16'>
      <ActionItem
        iconName='heartFill'
        iconColor='marked'
        onPress={() => {}}
        count={reactionCount}
      />
      <ActionItem
        iconName='comment'
        iconColor='backgroundContrast'
        onPress={() => {}}
        count={commentCount}
      />
      <ActionItem
        iconName='bookmark'
        iconColor='backgroundContrast'
        onPress={() => {}}
        count={favoriteCount}
      />
    </Box>
  )
}

interface ActionItemProps {
  iconName: IconProps['name']
  iconColor: IconProps['color']
  onPress: () => void
  count: number
}

function ActionItem({ iconName, count, iconColor, onPress }: ActionItemProps) {
  return (
    <TouchableOpacityBox
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
