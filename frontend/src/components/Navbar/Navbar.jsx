import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useTheme } from '../../App'

const LINKS = [
  {label:'About',    to:'about'},
  {label:'Skills',   to:'skills'},
  {label:'Projects', to:'projects'},
  {label:'Certs',    to:'certificates'},
  {label:'Contact',  to:'contact'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{y:-70,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.9,ease:[0.16,1,0.3,1]}}
        className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-10"
        style={{
          paddingTop: scrolled ? '10px' : '18px',
          paddingBottom: scrolled ? '10px' : '18px',
          background: scrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth duration={800} className="cursor-pointer flex items-center gap-3">
            <motion.div whileHover={{scale:1.08}} className="flex items-center gap-3">
              <div style={{
                width:36,height:36,
                background:'linear-gradient(135deg,var(--cyan),var(--blue))',
                clipPath:'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
                display:'flex',alignItems:'center',justifyContent:'center',
                color:'#03070f',fontFamily:'"Exo 2",sans-serif',fontWeight:900,fontSize:'0.95rem',
              }}>A</div>
              <div>
                <p className="font-display font-bold leading-none" style={{color:'var(--text-1)',fontSize:'1rem'}}>Aakash</p>
                <p className="font-mono leading-none" style={{fontSize:'0.5rem',letterSpacing:'0.3em',color:'var(--cyan)'}}>DEV</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {LINKS.map(({label,to}) => (
              <Link key={to} to={to} smooth duration={700} spy onSetActive={()=>setActive(to)}
                className="relative cursor-pointer group">
                <span className="font-mono text-xs tracking-widest uppercase transition-colors duration-250"
                  style={{color: active===to ? 'var(--cyan)' : 'var(--text-2)'}}>
                  {label}
                </span>
                {active===to && (
                  <motion.span layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px nav-active"
                    style={{background:'var(--cyan)'}}/>
                )}
              </Link>
            ))}

            {/* Theme toggle */}
            <motion.button onClick={toggleTheme} whileTap={{scale:0.85}}
              className="relative w-11 h-6 rounded-full flex items-center"
              style={{
                background: theme==='dark'
                  ? 'linear-gradient(110deg,var(--cyan),var(--blue))'
                  : 'linear-gradient(110deg,#f59e0b,#fb923c)',
              }}
              title="Toggle theme"
            >
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-xs"
                animate={{left: theme==='dark' ? '2px' : 'calc(100% - 22px)'}}
                transition={{type:'spring',stiffness:500,damping:32}}
              >
                {theme==='dark' ? '🌙' : '☀️'}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={()=>setOpen(o=>!o)}
            style={{color:'var(--cyan)'}}>
            {open ? <HiX size={22}/> : <HiMenuAlt3 size={22}/>}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{x:'100%',opacity:0}} animate={{x:0,opacity:1}}
            exit={{x:'100%',opacity:0}} transition={{type:'spring',stiffness:280,damping:28}}
            className="fixed inset-y-0 right-0 z-40 w-64 pt-24 px-8 pb-8 flex flex-col"
            style={{background:'var(--bg-glass)',backdropFilter:'blur(24px)',borderLeft:'1px solid var(--border)'}}
          >
            {LINKS.map(({label,to},i) => (
              <motion.div key={to}
                initial={{opacity:0,x:18}} animate={{opacity:1,x:0}}
                transition={{delay:i*0.06}}>
                <Link to={to} smooth duration={700} onClick={()=>setOpen(false)}
                  className="flex items-center gap-4 py-4 cursor-pointer"
                  style={{borderBottom:'1px solid var(--border)'}}>
                  <span className="font-mono text-xs" style={{color:'var(--text-3)'}}>0{i+1}</span>
                  <span className="font-display font-bold text-lg" style={{color:'var(--text-1)'}}>{label}</span>
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-xs" style={{color:'var(--text-2)'}}>
                {theme==='dark'?'Dark':'Light'}
              </span>
              <motion.button onClick={toggleTheme} whileTap={{scale:0.85}}
                className="relative w-11 h-6 rounded-full"
                style={{background:theme==='dark'?'linear-gradient(110deg,var(--cyan),var(--blue))':'linear-gradient(110deg,#f59e0b,#fb923c)'}}>
                <motion.div className="absolute w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-xs"
                  animate={{left:theme==='dark'?'2px':'calc(100% - 22px)'}}
                  transition={{type:'spring',stiffness:500,damping:32}}>
                  {theme==='dark'?'🌙':'☀️'}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
