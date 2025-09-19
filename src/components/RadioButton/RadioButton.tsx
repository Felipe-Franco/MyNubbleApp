import { Box, PressableBox } from '../Box/Box'

export type RadioButtonProps = {
  isSelected: boolean
  onPress: () => void
}

export function RadioButton({ isSelected, onPress }: RadioButtonProps) {
  return (
    <PressableBox
      onPress={onPress}
      hitSlop={10}
      width={20}
      height={20}
      borderWidth={2}
      borderColor={isSelected ? 'primary' : 'onBackgroundGray1'}
      borderRadius='s16'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        overflow='hidden'
        width={12}
        height={12}
        borderRadius='s8'
        backgroundColor={isSelected ? 'primary' : undefined}
      />
    </PressableBox>
  )
}
