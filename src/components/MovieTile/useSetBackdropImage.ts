import { useState, useEffect } from 'react'

import { Movie } from '../../api/types'

import DefaultBGImage from '../../assets/images/tile-default-bg.jpg'
import ErrorBGImage from '../../assets/images/tile-error-bg.jpg'
import { backdropBaseUrl, backdropMedium } from '../../api/config'

export function useSetBackdropImage(isError: boolean, movie: Movie | undefined) {
  const [backdrop, setBackdrop] = useState<string>(DefaultBGImage)
  const [isBackdropLoading, setIsBackdropLoading] = useState(true)

  useEffect(() => {
    if (!movie) {
      return
    }
    let imageUrl: string
    if (!movie?.backdrop) {
      imageUrl = DefaultBGImage
    } else if (isError) {
      imageUrl = ErrorBGImage
    } else {
      imageUrl = `${backdropBaseUrl}${backdropMedium}${movie.backdrop}`
    }
    const preloadedImg: HTMLImageElement = document.createElement('img')
    preloadedImg.src = imageUrl
    preloadedImg.addEventListener('load', () => {
      setBackdrop(imageUrl)
      setIsBackdropLoading(false)
    })
  }, [isError, movie])
  return { backdrop, isBackdropLoading }
}
