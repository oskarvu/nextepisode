import { HTMLMotionProps } from 'framer-motion'

interface IconLabel {
  iconLabel: string
}

export type SvgIconProps = IconLabel & React.SVGProps<SVGSVGElement>
export type MotionableSvgIconProps = IconLabel & HTMLMotionProps<'div'>
