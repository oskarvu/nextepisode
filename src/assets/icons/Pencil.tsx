import React from 'react'
import { SvgIconProps } from './types'

export function Pencil({ iconLabel, ...props }: SvgIconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" role="img" aria-labelledby="icon-label" {...props}>
      <title id="icon-label">{iconLabel}</title>
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  )
}