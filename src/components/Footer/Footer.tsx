import React from 'react'
import tw, { styled } from 'twin.macro'

import { capitalize } from '../../utils/capitalize'

import { ReactComponent as TMDbLogo } from '../../assets/images/tmdb-logo.svg'
import { ExternalLink } from '../../assets/icons/ExternalLink'
import { FooterTexts } from '../../translations/en-US'

const FooterContainer = tw.footer`
  flex justify-center flex-wrap
  w-full
  pt-2 px-14 lg:px-0 pb-4 lg:pb-0 lg:pt-0
  text-center
  bg-gray-100 border-t-8 border-gray-200
`

const FooterNote = tw.p`
  py-2 lg:py-1 lg:my-4 px-6
  text-gray-600 font-semibold tracking-wide text-xs sm:text-sm
  border-gray-400
  first:border-b-4 first:lg:border-b-0 lg:border-r-4 lg:last:border-none
`

const ExternalLinkIcon = tw(ExternalLink)`
  inline
  w-4 h-4 sm:w-6 sm:h-6
  ml-1
`

const FooterTMDbLogo = styled(TMDbLogo)`
  margin-bottom: 3px;
  ${tw`h-2 sm:h-3 ml-2 sm:ml-3 inline-block`}
`

const External = tw.a`
  hover:text-gray-800
`

export function Footer() {
  return (
    <FooterContainer>
      <FooterNote>
        <External
          href="https://github.com/oszeleje/nextepisode"
          target="_blank"
          rel="noopener noreferrer"
        >
          {capitalize(FooterTexts.aboutApp)}
          <ExternalLinkIcon iconLabel="external link" />
        </External>
      </FooterNote>
      <FooterNote>
        {FooterTexts.attribution}
        <FooterTMDbLogo />
      </FooterNote>
    </FooterContainer>
  )
}
