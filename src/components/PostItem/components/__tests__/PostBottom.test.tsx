import { fireEvent, screen } from '@testing-library/react-native'

import { Post } from '@domain'

import { render } from 'test-utils'

import { PostBottom } from '../PostBottom'

import { mockedPost } from './mockedData/mockedPost'

function renderComponent(post: Post) {
  render(<PostBottom {...post} hideCommentActions={false} />)
}

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native')

  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  }
})

describe('<PostBottom>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows comment link if it has comments', () => {
    renderComponent({ ...mockedPost, commentCount: 10 })

    const commentElement = screen.queryByText(/comentário/)
    expect(commentElement).toBeTruthy()
  })

  it('shows comment link with `ver comentário` if it has one comment only', () => {
    renderComponent({ ...mockedPost, commentCount: 1 })

    const commentElement = screen.queryByText('ver comentário')
    expect(commentElement).toBeTruthy()
  })

  it('does not show comment link if it has no comment', () => {
    renderComponent({ ...mockedPost, commentCount: 0 })

    const commentElement = screen.queryByText(/comentário/)
    expect(commentElement).toBeFalsy()
  })

  it('navigates to PostCommentScreen when pressing the comment link', () => {
    renderComponent({ ...mockedPost, commentCount: 10 })

    const commentElement = screen.getByText(/comentário/)
    fireEvent.press(commentElement)
    expect(mockedNavigate).toHaveBeenCalledWith('PostCommentScreen', {
      postId: mockedPost.id,
      postAuthorId: mockedPost.author.id,
      title: 'Comentários',
    })
  })
})
