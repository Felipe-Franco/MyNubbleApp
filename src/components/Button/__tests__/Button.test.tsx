import { StyleSheet } from 'react-native'

import { Button, ButtonProps } from '@components'
import { lightTheme } from '@theme'

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
    fireEvent.press(screen.getByTestId('touchable-opacity'))
    expect(mockedOnPress).toHaveBeenCalled()
  })

  it('does not call onPress when it is disabled and it pressed', () => {
    const mockedOnPress = jest.fn()

    renderComponent({ onPress: mockedOnPress, disabled: true })
    fireEvent.press(screen.getByTestId('touchable-opacity'))
    expect(mockedOnPress).not.toHaveBeenCalled()
  })

  test('the title should be gray if button is disabled', () => {
    renderComponent({ disabled: true })
    const buttonTitle = screen.getByText(BUTTON_TITLE)
    const titleStyle = StyleSheet.flatten(buttonTitle.props.style)
    expect(titleStyle.color).toEqual(lightTheme.colors.gray2)
  })

  describe('when button is loading', () => {
    it('shows activity indicator', () => {
      renderComponent({ loading: true })
      const activityIndicator = screen.getByTestId('activity-indicator')

      expect(activityIndicator).toBeTruthy()
    })

    it('hides button title', () => {
      renderComponent({ loading: true })
      const buttonTitle = screen.queryByText(BUTTON_TITLE)

      expect(buttonTitle).toBeFalsy()
    })

    it('does not call onPress', () => {
      const mockedOnPress = jest.fn()
      renderComponent({ loading: true, onPress: mockedOnPress })
      fireEvent.press(screen.getByTestId('touchable-opacity'))
      expect(mockedOnPress).not.toHaveBeenCalled()
    })
  })
})
