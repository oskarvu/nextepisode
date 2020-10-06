import React from 'react'
import { SvgIconProps } from './types'

export function Collection({ iconLabel, ...props }: SvgIconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" role="img" aria-labelledby="icon-label" {...props}>
      <title id="icon-label">{iconLabel}</title>
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  )
}