import { Alert, Pressable } from 'react-native'

import { Box, ProfileAvatar, Text } from '@components'
import { PostComment, postCommentService, usePostCommentRemove } from '@domain'
import { useToastService } from '@services'
import { dateUtils } from '@utils'

interface PostCommentItemProps {
  postComment: PostComment
  postAuthorId: number
  userId: number
  onRemoveComment: () => void
}

export function PostCommentItem({
  postComment,
  postAuthorId,
  userId,
  onRemoveComment,
}: PostCommentItemProps) {
  const { showToast } = useToastService()
  const { removePostComment } = usePostCommentRemove({
    onSuccess: () => {
      onRemoveComment()
      showToast({
        message: 'Comentário removido ' + Math.random().toString(),
        type: 'success',
      })
    },
  })

  function openRemoveDialog() {
    if (
      postCommentService.isAllowedToDelete(
        postAuthorId,
        postComment.author.id,
        userId,
      )
    ) {
      Alert.alert('Deseja remover o comentário?', 'pressione confirmar', [
        {
          text: 'Confirmar',
          onPress: () => removePostComment({ postCommentId: postComment.id }),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ])
    }
  }

  return (
    <Pressable onLongPress={openRemoveDialog}>
      <Box flexDirection='row' alignItems='center' marginBottom='s16'>
        <ProfileAvatar profileURL={postComment.author.profileURL} />
        <Box marginLeft='s12' flex={1}>
          <Text preset='paragraphSmall' bold={true}>
            {postComment.author.userName}
          </Text>
          <Text preset='paragraphSmall' color='gray1'>
            {postComment.message} -{' '}
            {dateUtils.formatRelative(postComment.createdAt)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  )
}
