import { Alert, AlertButton } from 'react-native'

import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'

import { PostCommentScreen } from '@screens'
import { authCredentialsStorage } from '@services'
import { postCommentMocks, resetInMemoryResponse, server } from '@test'

import { renderScreen } from 'test-utils'

beforeAll(() => server.listen())
beforeEach(() => {
  server.resetHandlers()
  resetInMemoryResponse()
})
afterAll(() => {
  server.close()
  jest.resetAllMocks()
})

describe('integration: <PostCommentScreen />', () => {
  test('when ADDING a comment the list is automatically updated', async () => {
    renderScreen(
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

  test('when DELETING a comment, the list is automatically updated and a toast message is displayed', async () => {
    const { mateusAuthCredentials, mateusPostCommentAPI } = postCommentMocks
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mateusAuthCredentials)

    let mockedConfirm: AlertButton['onPress']
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons && buttons[0]) {
        mockedConfirm = buttons[0].onPress
      }
    })

    renderScreen(
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

    let allComments = await screen.findAllByTestId('post-comment-item')

    expect(allComments.length).toBe(2)

    const comment = await screen.findByText(mateusPostCommentAPI.message, {
      exact: false,
    })

    fireEvent(comment, 'longPress')

    if (mockedConfirm) {
      mockedConfirm()
    }

    await waitForElementToBeRemoved(() =>
      screen.queryByText(mateusPostCommentAPI.message, { exact: false }),
    )

    allComments = await screen.findAllByTestId('post-comment-item')
    expect(allComments.length).toBe(1)
  })
})
