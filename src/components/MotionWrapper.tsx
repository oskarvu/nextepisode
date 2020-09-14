import React, { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

export default function MotionWrapper(props: PropsWithChildren<any>) {
  return <motion.div {...props}>{props.children}</motion.div>
}
