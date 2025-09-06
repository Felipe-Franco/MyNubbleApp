import { useEffect, useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { QueryKeys } from '@infra'

import { cameraRollService } from './cameraRollService'

export function useCameraRoll(
  hasPermission: boolean,
  onInitialLoad?: (imageUri?: string) => void,
) {
  const [photoList, setPhotoList] = useState<string[]>([])

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({ pageParam }) => cameraRollService.getPhotos(pageParam),
    getNextPageParam: ({ cursor }) => cursor,
    initialPageParam: '',
    enabled: hasPermission,
  })

  useEffect(() => {
    if (data) {
      const newList = data.pages.reduce<string[]>((prev, current) => {
        return [...prev, ...current.photoList]
      }, [])

      setPhotoList(newList)

      if (data?.pages.length === 1 && onInitialLoad) {
        onInitialLoad(newList[0])
      }
    }
  }, [data, onInitialLoad])

  return {
    photoList,
    hasNextPage,
    fetchNextPage: () => fetchNextPage(),
  }
}
