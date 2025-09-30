import { useEffect, useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { AppQueryKeys } from '@infra'

import { multimediaService } from './multimediaService'

export function useMultimediaGetPhotos(hasPermission: boolean) {
  const [photoList, setPhotoList] = useState<string[]>([])

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [AppQueryKeys.CameraRollList],
    queryFn: ({ pageParam }) => multimediaService.getPhotos(pageParam),
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
