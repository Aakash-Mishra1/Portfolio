import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'



export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let prog = 0
    const interval = setInterval(() => {
      prog += Math.random() * 8 + 2
      if (prog >= 100) {
        prog = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => { setExiting(true); setTimeout(onDone, 700) }, 600)
      } else {
        setProgress(Math.floor(prog))
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center grid-overlay"
          style={{ background: 'var(--bg-0)' }}
        >
          {/* corner brackets */}
          {[['top-5 left-5','border-t border-l'],['top-5 right-5','border-t border-r'],
            ['bottom-5 left-5','border-b border-l'],['bottom-5 right-5','border-b border-r']
          ].map(([pos,bdr],i)=>(
            <div key={i} className={`absolute ${pos} w-8 h-8 ${bdr}`}
              style={{borderColor:'rgba(0,229,255,0.3)'}} />
          ))}

          <div className="w-full max-w-md px-6 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-display font-black mb-12 text-center"
              style={{
                fontSize: 'clamp(2.5rem,7vw,4.5rem)',
                background: 'linear-gradient(90deg, var(--cyan), var(--blue), var(--indigo))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.04em',
                textShadow: '0 2px 24px #0ff3',
              }}
            >
              WELCOME
            </motion.h1>
            <div className="flex justify-between w-full mb-1.5">
              <span className="font-mono" style={{fontSize:'0.6rem',color:'var(--text-3)',letterSpacing:'0.2em'}}>LOADING</span>
              <span className="font-mono" style={{fontSize:'0.6rem',color:'var(--cyan)'}}>{progress}%</span>
            </div>
            <div style={{height:'2px',background:'var(--border)',borderRadius:'2px',overflow:'hidden',width:'100%'}}>
              <motion.div
                style={{height:'100%',background:'linear-gradient(90deg,var(--cyan),var(--blue))',borderRadius:'2px'}}
                initial={{width:'0%'}}
                animate={{width:`${progress}%`}}
                transition={{duration:0.3,ease:'easeOut'}}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
