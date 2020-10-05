import React from 'react'
import { SvgIconProps } from './types'

export function Heart({ iconLabel, ...props }: SvgIconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" role="img" aria-labelledby="icon-label" {...props}>
      <title id="icon-label">{iconLabel}</title>
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  )
}
