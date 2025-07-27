import { PostCommentScreen } from '@screens'

import { render } from 'test-utils'

describe('integration: <PostCommentScreen />', () => {
  test('when adding a comment the list is automatically updated', () => {
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
  })
})
