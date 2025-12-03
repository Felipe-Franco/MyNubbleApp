import { Post, PostAPI, userAdapter } from '@domain'

const toPost = (postAPI: PostAPI): Post => {
  return {
    id: postAPI.id,
    text: postAPI.text,
    author: userAdapter.toUser(postAPI.user),
    imageURL: postAPI.image_url,
    reactionCount: parseInt(postAPI.meta.like_count, 10),
    favoriteCount: parseInt(postAPI.meta.favorite_count, 10),
    commentCount: parseInt(postAPI.meta.comments_count, 10),
    reactions:
      postAPI.reactions?.map((reaction) => ({
        postId: reaction.post_id,
        emojiType: reaction.emoji_type,
      })) || [],
  }
}

export const postAdapter = {
  toPost,
}
