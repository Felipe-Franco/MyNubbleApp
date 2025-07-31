import { fireEvent, screen } from '@testing-library/react-native'

import { PostCommentScreen } from '@screens'
import { server } from '@test'

import { render } from 'test-utils'

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('integration: <PostCommentScreen />', () => {
  test('when adding a comment the list is automatically updated', async () => {
    render(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          key: 'PostCommentScreen',
          name: 'PostCommentScreen',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    )

    const comment = await screen.findByText(/comentário aleatório/i)
    let allComments = await screen.findAllByTestId('post-comment-item')

    expect(comment).toBeTruthy()
    expect(allComments.length).toBe(2)

    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i)
    fireEvent.changeText(inputText, 'novo comentário')
    fireEvent.press(screen.getByText(/enviar/i))

    const newComment = await screen.findByText(/novo comentário/i)
    expect(newComment).toBeTruthy()

    allComments = await screen.findAllByTestId('post-comment-item')
    expect(allComments.length).toBe(3)
  })
})
