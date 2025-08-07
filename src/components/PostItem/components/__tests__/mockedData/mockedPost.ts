import { Post } from '@domain'

export const mockedPost: Post = {
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
}
