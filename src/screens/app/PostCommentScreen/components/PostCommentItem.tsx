import { Box, ProfileAvatar, Text } from '@components'
import { PostComment } from '@domain'
import { dateUtils } from '@utils'

interface PostCommentItemProps {
  comment: PostComment
}

export function PostCommentItem({ comment }: PostCommentItemProps) {
  return (
    <Box flexDirection='row' alignItems='center' marginBottom='s16'>
      <ProfileAvatar profileURL={comment.author.profileURL} />
      <Box marginLeft='s12' flex={1}>
        <Text preset='paragraphSmall' bold={true}>
          {comment.author.userName}
        </Text>
        <Text preset='paragraphSmall' color='gray1'>
          {comment.message} - {dateUtils.formatRelative(comment.createdAt)}
        </Text>
      </Box>
    </Box>
  )
}
