import { useState } from 'react'
import { Keyboard } from 'react-native'

import { TextMessage } from '@components'
import { usePostCommentCreate } from '@domain'

interface PostCommentTextMessageProps {
  postId: number
  onAddComment: () => void
}

export function PostCommentTextMessage({
  postId,
  onAddComment,
}: PostCommentTextMessageProps) {
  const [text, setText] = useState('')
  const { createPostComment } = usePostCommentCreate(postId, {
    onSuccess: onAddComment,
  })

  function onChangeText(newValue: string) {
    setText(newValue)
  }

  async function handlePressSend() {
    await createPostComment(text)
    setText('')
    Keyboard.dismiss()
  }

  return (
    <TextMessage
      value={text}
      onChangeText={onChangeText}
      onPressSend={handlePressSend}
      placeholder='Adicione um comentário'
    />
  )
}
