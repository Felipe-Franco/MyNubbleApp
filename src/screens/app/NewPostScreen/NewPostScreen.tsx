import { useRef, useState } from 'react'
import { Dimensions, FlatList, Image, ListRenderItemInfo } from 'react-native'

import { PermissionManager, PressableBox, Screen } from '@components'
import { AppTabScreenProps } from '@routes'
import { useMultimediaGetPhotos, usePermission } from '@services'

import { Header } from './components/Header'

type NewPostScreenProps = AppTabScreenProps<'NewPostScreen'>

const SCREEN_WIDTH = Dimensions.get('screen').width
const NUM_COLUMNS = 4
const ITEM_SIZE = SCREEN_WIDTH / NUM_COLUMNS

export function NewPostScreen({}: NewPostScreenProps) {
  const permission = usePermission('photoLibrary')
  const [selectedImage, setSelectedImage] = useState<string>()
  const { photoList, fetchNextPage } = useMultimediaGetPhotos(
    permission.status === 'granted',
  )
  const flatListRef = useRef<FlatList>(null)

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri)
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <PressableBox onPress={() => onSelectImage(item)}>
        <Image
          key={item}
          source={{ uri: item }}
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
          }}
        />
      </PressableBox>
    )
  }

  return (
    <PermissionManager
      permissionName='photoLibrary'
      description='Permita o nubble acessar as imagens da sua galeria'
    >
      <Screen canGoBack={true} title='Novo post' noPaddingHorizontal={true}>
        <FlatList
          ref={flatListRef}
          data={photoList}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          ListHeaderComponent={
            <Header imageUri={selectedImage} imageSize={SCREEN_WIDTH} />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
        />
      </Screen>
    </PermissionManager>
  )
}
