import { Dimensions, Image, StyleSheet } from 'react-native'

import { useAppColorScheme } from '@services'

import { OnboardingPageItem } from '../onboardingData'

const SCREEN_WIDTH = Dimensions.get('screen').width

type ImageHeaderProps = Pick<OnboardingPageItem, 'image'>

export function ImageHeader({ image }: ImageHeaderProps) {
  const appColor = useAppColorScheme()
  const imageSource = appColor === 'light' ? image.light : image.dark

  return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: '90%',
  },
})
