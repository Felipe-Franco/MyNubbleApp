import { Dimensions } from 'react-native'

import { Box } from '@components'

import { OnboardingPageItem } from '../onboardingData'

import { BottomMenu } from './BottomMenu'
import { Content } from './Content'
import { ImageHeader } from './ImageHeader'

const SCREEN_WIDTH = Dimensions.get('screen').width

type OnboardingPageProps = {
  pageItem: OnboardingPageItem
  onPressNext: () => void
  onPressSkip: () => void
}

export function OnboardingPage({
  pageItem,
  onPressNext,
  onPressSkip,
}: OnboardingPageProps) {
  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Box flex={4} backgroundColor='error'>
        <ImageHeader image={pageItem.image} />
      </Box>
      <Box flex={5} backgroundColor='carrotSecondary'>
        <Content title={pageItem.title} subtitle={pageItem.subtitle} />
      </Box>
      <Box flex={1} backgroundColor='success'>
        <BottomMenu onPressNext={onPressNext} onPressSkip={onPressSkip} />
      </Box>

      <Box />
    </Box>
  )
}
