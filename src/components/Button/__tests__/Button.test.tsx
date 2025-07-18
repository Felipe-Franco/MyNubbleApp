import { ButtonProps, StyleSheet } from 'react-native'

import { Button } from '@components'
import { theme } from '@theme'

import { fireEvent, render, screen } from 'test-utils'

const BUTTON_TITLE = 'Button Title'

function renderComponent(props?: Partial<ButtonProps>) {
  const title = props?.title || BUTTON_TITLE
  render(<Button title={title} {...props} />)
}

describe('<Button />', () => {
  it('calls the onPress function when it is pressed', () => {
    const mockedOnPress = jest.fn()

    renderComponent({ onPress: mockedOnPress })
    fireEvent.press(screen.getByText(BUTTON_TITLE))
    expect(mockedOnPress).toHaveBeenCalled()
  })

  it('does not call onPress when it is disabled and it pressed', () => {
    const mockedOnPress = jest.fn()

    renderComponent({ onPress: mockedOnPress, disabled: true })
    fireEvent.press(screen.getByText(BUTTON_TITLE))
    expect(mockedOnPress).not.toHaveBeenCalled()
  })

  test('the title should be gray if button is disabled', () => {
    renderComponent({ disabled: true })
    const view = screen.getByText(BUTTON_TITLE)
    const titleStyle = StyleSheet.flatten(view.props.style)
    expect(titleStyle.color).toEqual(theme.colors.gray2)
  })
})
