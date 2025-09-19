import { Box, Text } from '@components'

type ContentProps = {
  title: string
  subtitle: string
}

export function Content({ title, subtitle }: ContentProps) {
  return (
    <Box>
      <Text preset='headingLarge'>{title}</Text>
      <Text preset='paragraphLarge'>{subtitle}</Text>
    </Box>
  )
}
