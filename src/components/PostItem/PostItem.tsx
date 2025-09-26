import { Box } from '@components'
import { Post } from '@domain'

import { ProfileUser } from '../ProfileUser/ProfileUser'

import { PostActions } from './components/PostActions'
import { PostBottom } from './components/PostBottom'
import { PostImage } from './components/PostImage'

interface PostItemProps {
  post: Post
  hideCommentActions?: boolean
}

export function PostItem({ post, hideCommentActions = false }: PostItemProps) {
  return (
    <Box marginBottom='s24' paddingHorizontal='s24'>
      <ProfileUser user={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions post={post} hideCommentAction={hideCommentActions} />
      <PostBottom post={post} hideCommentActions={hideCommentActions} />
    </Box>
  )
}
