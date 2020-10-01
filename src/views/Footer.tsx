import React from 'react'
import tw, { styled } from 'twin.macro'
import { ReactComponent as TMDbLogo } from '../assets/images/tmdb-logo.svg'
import External from '../assets/icons/ExternalLink'
import { FooterTexts } from '../translations/en-US'
import capitalize from '../utils/capitalize'

const FooterContainer = tw.footer`
  flex justify-center flex-wrap
  pt-2 px-14 md:px-0 pb-4 md:pb-0 mt-4 md:pt-0
  bg-gray-100 border-t-8 border-gray-200
  text-center
`

const FooterNote = tw.p`
  first:border-b-4 first:md:border-b-0 md:border-r-4 md:last:border-none border-gray-400
  py-2 md:py-1 md:my-4 px-6
  text-gray-600 font-semibold tracking-wide text-sm
`

const ExternalLinkIcon = tw(External)`
  ml-1 w-6 h-6 inline
`

const FooterTMDbLogo = styled(TMDbLogo)`
  margin-bottom: 3px;
  ${tw`h-3 ml-3 inline-block`}
`

const ExternalLink = tw.a`
  hover:text-gray-800
`

function Footer() {
  return (
    <FooterContainer>
      <FooterNote>
        <ExternalLink href="https://github.com/oszeleje/nextepisode" target="_blank">
          {capitalize(FooterTexts.aboutApp)}
          <ExternalLinkIcon />
        </ExternalLink>
      </FooterNote>
      <FooterNote>
        {FooterTexts.attribution}
        <FooterTMDbLogo />
      </FooterNote>
    </FooterContainer>
  )
}

export default Footer
