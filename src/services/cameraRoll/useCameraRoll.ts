import { useEffect, useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { QueryKeys } from '@infra'

import { cameraRollService } from './cameraRollService'

export function useCameraRoll(hasPermission: boolean) {
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
    }
  }, [data])

  return {
    photoList,
    hasNextPage,
    fetchNextPage: () => {
      if (hasPermission) {
        fetchNextPage()
      }
    },
  }
}
