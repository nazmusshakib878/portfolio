'use client'
import { motion,useReducedMotion } from 'motion/react'
export function Reveal({children,className=''}:{children:React.ReactNode,className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>}
