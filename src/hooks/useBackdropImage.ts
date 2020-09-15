import { useState, useEffect } from 'react'

import { Movie } from '../api/types'

import DefaultBGImage from '../assets/images/placeholder.jpg'
import { backdropBaseUrl, backdropMedium } from '../api/config'

export default function useBackdropImage(movie: Movie | null) {
  const [backdrop, setBackdrop] = useState<string>(DefaultBGImage)
  const [isBackdropLoading, setIsBackdropLoading] = useState(true)

  useEffect(() => {
    if (!movie) {
      return
    }
    if (!movie?.backdrop) {
      setIsBackdropLoading(false)
      return
    }
    const imageUrl = `${backdropBaseUrl}${backdropMedium}${movie.backdrop}`
    const preloadedImg: HTMLImageElement = document.createElement('img')
    preloadedImg.src = imageUrl
    preloadedImg.addEventListener('load', () => {
      setBackdrop(imageUrl)
      setIsBackdropLoading(false)
    })
  }, [movie])
  return { backdrop, isBackdropLoading }
}
