import { Box, Icon, PressableBox, Text } from '@components'

type BottomMenuProps = {
  isLast: boolean
  onPressNext: () => void
  onPressSkip: () => void
}

export function BottomMenu({
  isLast,
  onPressNext,
  onPressSkip,
}: BottomMenuProps) {
  return (
    <Box flexDirection='row' justifyContent='space-between'>
      <PressableBox hitSlop={10}>
        <Text onPress={onPressSkip} semiBold={true} color='gray2'>
          Pular
        </Text>
      </PressableBox>
      <PressableBox
        hitSlop={10}
        flexDirection='row'
        alignItems='center'
        onPress={onPressNext}
      >
        <Text marginRight='s4' bold={true}>
          {isLast ? 'Começar' : 'Próximo'}
        </Text>
        <Icon name='arrowRight' color='carrotSecondary' />
      </PressableBox>
    </Box>
  )
}
