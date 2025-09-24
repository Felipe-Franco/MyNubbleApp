import { Box, BoxProps } from '@components'

type ProgressIndicatorProps = {
  currentIndex: number
  total: number
} & BoxProps

export function ProgressIndicator({
  currentIndex,
  total,
  ...boxProps
}: ProgressIndicatorProps) {
  return (
    <Box flexDirection='row' alignItems='center' {...boxProps}>
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          width={index === currentIndex ? 14 : 8}
          height={index === currentIndex ? 14 : 8}
          backgroundColor={index === currentIndex ? 'carrotSecondary' : 'gray2'}
          borderRadius='s12'
          marginRight='s12'
        />
      ))}
    </Box>
  )
}
