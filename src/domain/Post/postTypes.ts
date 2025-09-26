import { PostReaction, PostReactionAPI, User, UserAPI } from '@domain'

export interface Post {
  id: number
  text: string
  author: User
  imageURL: string
  reactionCount: number
  commentCount: number
  favoriteCount: number
  reactions: Array<Pick<PostReaction, 'emojiType' | 'postId'>>
}

export interface PostAPI {
  id: number
  text: string
  user_id: number
  image_url: string
  is_fixed: boolean
  is_activated: boolean
  created_at: string
  updated_at: string
  user: UserAPI
  status?: string
  meta: {
    like_count: string
    favorite_count: string
    comments_count: string
  }
  reactions: Array<Pick<PostReactionAPI, 'emoji_type' | 'post_id'>>
}
