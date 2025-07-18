import { Button } from '@components'

import { render, screen, fireEvent } from 'test-utils'

describe('<Button />', () => {
  it('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn()
    render(<Button title='Title' onPress={mockedOnPress} />)

    const titleElement = screen.getByText('Title')
    fireEvent.press(titleElement)

    expect(mockedOnPress).toHaveBeenCalled()
  })
})
