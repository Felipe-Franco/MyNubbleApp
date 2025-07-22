import { fireEvent, screen } from '@testing-library/react-native'

import { IconProps, PasswordInput } from '@components'

import { render } from 'test-utils'

describe('<PasswordInput />', () => {
  it('starts with hidden password', () => {
    render(<PasswordInput label='password' placeholder='password' />)

    const inputText = screen.getByPlaceholderText('password')
    expect(inputText.props.secureTextEntry).toBeTruthy()
  })

  test('when pressing the eye-icon, it should show the password and change to the eye-off icon', () => {
    render(<PasswordInput label='password' placeholder='password' />)

    const eyeOnIcon: IconProps['name'] = 'eyeOn'
    fireEvent.press(screen.getByTestId(eyeOnIcon))

    const inputText = screen.getByPlaceholderText('password')
    expect(inputText.props.secureTextEntry).toBeFalsy()

    const eyeOffIcon: IconProps['name'] = 'eyeOff'
    expect(screen.getByTestId(eyeOffIcon)).toBeTruthy()
  })
})
