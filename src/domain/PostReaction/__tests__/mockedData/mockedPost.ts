import { Post, PostReactionBase } from '../../../index'

const postWithoutLike: Post = {
  id: 1,
  imageURL: 'fake-url',
  commentCount: 0,
  favoriteCount: 0,
  reactionCount: 0,
  text: 'Mocked Post Text',
  author: {
    id: 2,
    fullName: 'Maria Julia',
    profileUrl: 'https://example.com',
    username: 'mariajulia',
    email: 'mariajulia@coffstack.com',
    firstName: 'Maria',
    lastName: 'Julia',
    isOnline: false,
  },
  reactions: [],
}

const postWithLike: Post = {
  ...postWithoutLike,
  reactionCount: 1,
  reactions: [{ postId: postWithoutLike.id, emojiType: 'like' }],
}

const postWithoutLikeResponse: PostReactionBase = {
  id: 4,
  emojiType: 'like',
  postId: postWithoutLike.id,
  userId: 1,
  createdAt: '2025-09-26T00:11:57.217+00:00',
  updatedAt: '2025-09-26T00:11:57.217+00:00',
  isChecked: true,
}

const postWithLikeResponse: PostReactionBase = {
  ...postWithoutLikeResponse,
  isChecked: false,
}

export const mockedPostWithoutLike = {
  post: postWithoutLike,
  response: postWithoutLikeResponse,
}

export const mockedPostWithLike = {
  post: postWithLike,
  response: postWithLikeResponse,
}
