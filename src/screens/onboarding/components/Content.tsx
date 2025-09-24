import { Box, Text } from '@components'

import { OnboardingPageItem } from '../onboardingData'

import { ProgressIndicator } from './ProgressIndicator'

type ContentProps = Omit<OnboardingPageItem, 'image'>

export function Content({ title, subtitle, index, total }: ContentProps) {
  return (
    <Box>
      <ProgressIndicator
        currentIndex={index}
        total={total}
        marginBottom='s24'
      />
      <Text>
        {title.map((titleItem, _index) => (
          <Text
            key={_index}
            preset='headingLarge'
            color={
              titleItem.highlight ? 'carrotSecondary' : 'backgroundContrast'
            }
          >
            {titleItem.text}
          </Text>
        ))}
      </Text>
      <Text preset='paragraphLarge' marginTop='s16'>
        {subtitle}
      </Text>
    </Box>
  )
}
