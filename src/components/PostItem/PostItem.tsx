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
      <PostActions
        commentCount={post.commentCount}
        favoriteCount={post.favoriteCount}
        reactionCount={post.reactionCount}
        hideCommentAction={hideCommentActions}
      />
      <PostBottom
        author={post.author}
        commentCount={post.commentCount}
        text={post.text}
        id={post.id}
        hideCommentActions={hideCommentActions}
      />
    </Box>
  )
}
