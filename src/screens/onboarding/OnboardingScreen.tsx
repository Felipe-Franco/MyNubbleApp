import { useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Box } from '@components'
import { OnboardingScreenProps } from '@routes'
import { useSettingsService } from '@services'

import { OnboardingPage } from './components/OnboardingPage'
import { OnboardingPageItem, onboardingPages } from './onboardingData'

export function OnboardingScreen({}: OnboardingScreenProps<'OnboardingScreen'>) {
  const [pageIndex, setPageIndex] = useState(0)
  const flatListRef = useRef<FlatList<OnboardingPageItem>>(null)
  const { finishOnboarding } = useSettingsService()

  function onPressNext() {
    const isLastPage = pageIndex === onboardingPages.length - 1

    if (isLastPage) {
      finishOnboarding()
    } else {
      const nextPageIndex = pageIndex + 1

      flatListRef.current?.scrollToIndex({
        index: nextPageIndex,
        animated: true,
      })

      setPageIndex(nextPageIndex)
    }
  }

  function renderItem({ item }: ListRenderItemInfo<OnboardingPageItem>) {
    return (
      <OnboardingPage
        pageItem={item}
        onPressNext={onPressNext}
        onPressSkip={finishOnboarding}
      />
    )
  }

  return (
    <Box flex={1}>
      <FlatList
        ref={flatListRef}
        data={onboardingPages}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEnabled={false}
      />
    </Box>
  )
}
