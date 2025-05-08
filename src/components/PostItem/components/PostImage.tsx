import { Dimensions, Image, StyleSheet } from 'react-native'

interface PostImageProps {
  imageURL: string
}

export function PostImage({ imageURL }: PostImageProps) {
  return (
    <Image source={{ uri: imageURL }} resizeMode='cover' style={styles.image} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width,
    height: 300,
    marginHorizontal: -24,
    marginTop: 12,
  },
})
