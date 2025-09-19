import { Box, Icon, PressableBox, Text } from '@components'

type BottomMenuProps = {
  onPressNext: () => void
  onPressSkip: () => void
}

export function BottomMenu({ onPressNext, onPressSkip }: BottomMenuProps) {
  return (
    <Box flexDirection='row' justifyContent='space-between'>
      <PressableBox hitSlop={10}>
        <Text onPress={onPressSkip}>Pular</Text>
      </PressableBox>
      <PressableBox
        hitSlop={10}
        flexDirection='row'
        alignItems='center'
        onPress={onPressNext}
      >
        <Text marginRight='s4'>Próximo</Text>
        <Icon name='arrowRight' />
      </PressableBox>
    </Box>
  )
}
