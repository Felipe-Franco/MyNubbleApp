import { Box } from '@components'
import { Post } from '@domain'

import { ProfileUser } from '../ProfileUser/ProfileUser'

import { PostActions } from './components/PostActions'
import { PostBottom } from './components/PostBottom'
import { PostImage } from './components/PostImage'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box marginBottom='s24' paddingHorizontal='s24'>
      <ProfileUser user={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        favoriteCount={post.favoriteCount}
        reactionCount={post.reactionCount}
      />
      <PostBottom
        author={post.author}
        commentCount={post.commentCount}
        text={post.text}
        id={post.id}
      />
    </Box>
  )
}
