import { SimpleLogo } from '@assets'
import { Box, Icon } from '@components'
import { useAppSafeArea } from '@hooks'

export function HomeHeader() {
  const { top } = useAppSafeArea()

  return (
    <Box
      flexDirection='row'
      style={{ paddingTop: top }}
      justifyContent='space-between'
      paddingHorizontal='s24'
      paddingBottom='s24'
    >
      <SimpleLogo width={70} />
      <Box flexDirection='row' gap='s24'>
        <Icon name='search' />
        <Icon name='bell' />
        <Icon name='comment' />
      </Box>
    </Box>
  )
}
