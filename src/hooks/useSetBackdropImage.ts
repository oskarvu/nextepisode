import { useState, useEffect } from 'react'

import { Movie } from '../api/types'

import DefaultBGImage from '../assets/images/tile-default-bg.jpg'
import { backdropBaseUrl, backdropMedium } from '../api/config'

export default function useSetBackdropImage(movie: Movie | undefined) {
  const [backdrop, setBackdrop] = useState<string>(DefaultBGImage)
  const [isBackdropLoading, setIsBackdropLoading] = useState(true)

  useEffect(() => {
    if (!movie) {
      return
    }
    const imageUrl = !movie?.backdrop
      ? DefaultBGImage
      : `${backdropBaseUrl}${backdropMedium}${movie.backdrop}`
    const preloadedImg: HTMLImageElement = document.createElement('img')
    preloadedImg.src = imageUrl
    preloadedImg.addEventListener('load', () => {
      setBackdrop(imageUrl)
      setIsBackdropLoading(false)
    })
  }, [movie])
  return { backdrop, isBackdropLoading }
}
