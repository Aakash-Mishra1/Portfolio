import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedNumber from '../Certificates/AnimatedNumber'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React.js Developer',
  'Node.js Developer',
  'Problem Solver',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [roleIdx,    setRoleIdx]    = useState(0)
  const [displayed,  setDisplayed]  = useState('')
  const [isTyping,   setIsTyping]   = useState(true)

  /* ── typewriter ── */
  useEffect(() => {
    const role = ROLES[roleIdx]
    let t
    if (isTyping) {
      if (displayed.length < role.length) {
        t = setTimeout(() => setDisplayed(role.slice(0, displayed.length+1)), 72)
      } else {
        t = setTimeout(() => setIsTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0,-1)), 32)
      } else {
        setRoleIdx(i => (i+1) % ROLES.length)
        setIsTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, isTyping, roleIdx])

  /* ── particle network canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const mouse = {x:-9999,y:-9999}

    const resize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const onMouse = e => { mouse.x=e.clientX; mouse.y=e.clientY }
    window.addEventListener('mousemove', onMouse)

    const pts = Array.from({length:90},()=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*1.4+0.3,
      vx:(Math.random()-.5)*0.38,
      vy:(Math.random()-.5)*0.38,
      hue: Math.random()>0.5 ? 195 : 220,
    }))

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      pts.forEach(p=>{
        const dx=p.x-mouse.x, dy=p.y-mouse.y, d=Math.hypot(dx,dy)
        if(d<90){ p.x+=dx/d*1.2; p.y+=dy/d*1.2 }
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>canvas.width)  p.vx*=-1
        if(p.y<0||p.y>canvas.height) p.vy*=-1
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`hsla(${p.hue},100%,65%,0.45)`
        ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y)
        if(d<120){
          ctx.beginPath()
          ctx.moveTo(pts[i].x,pts[i].y)
          ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(0,229,255,${0.07*(1-d/120)})`
          ctx.lineWidth=0.5
          ctx.stroke()
        }
      }
      raf=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',onMouse) }
  },[])

  const fade = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0} }
  const container = { hidden:{}, show:{ transition:{staggerChildren:0.13} } }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{background:'var(--bg-0)'}}>
      {/* canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {/* grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      {/* scan line removed */}
      {/* ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle, rgba(41,121,255,0.07) 0%, transparent 70%)'}} />
      <div className="absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)'}} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* availability badge */}
            <motion.div variants={fade} className="flex items-center gap-3 mb-7">
              <div className="pulse-dot" />
              <span className="font-mono text-xs tracking-widest uppercase" style={{color:'var(--cyan)'}}>
                Open to Work
              </span>
            </motion.div>

            {/* name */}
            <motion.h1 variants={fade}
              className="font-display font-black leading-none mb-4"
              style={{fontSize:'clamp(3.2rem,9vw,7rem)',color:'var(--text-1)'}}>
              Aakash<br />
              <span className="gradient-text">Mishra</span>
            </motion.h1>

            {/* typewriter role */}
            <motion.div variants={fade} className="flex items-center gap-3 mb-6 h-8">
              <span className="font-mono text-sm md:text-base" style={{color:'var(--text-2)'}}>
                {displayed}<span className="typed-cursor">|</span>
              </span>
            </motion.div>

            {/* bio */}
            <motion.p variants={fade}
              className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              style={{color:'var(--text-2)'}}>
              B.Tech CSE student at LPU crafting full-stack MERN applications.
              Passionate about clean architecture, real-time systems, and elegant UI.
            </motion.p>

            {/* stats */}
            <motion.div variants={fade} className="flex flex-wrap gap-8 mb-10">
              {[
                {v: 8,    suffix: '+',  l: 'Projects'},
                {v: 300,  suffix: '+',  l: 'Problems Solved'},
                {v: 7.88, suffix: '',   l: 'CGPA'},
                {v: 10,   suffix: '+',  l: 'Certifications'},
              ].map(({v, suffix, l}) => (
                <div key={l}>
                  <p className="font-display font-black text-3xl gradient-text">
                    <AnimatedNumber value={v} format={n => `${n}${suffix}`} />
                    {/* fallback for no-JS/SSR: */}
                    <noscript>{v}{suffix}</noscript>
                  </p>
                  <p className="font-mono text-xs mt-0.5" style={{color:'var(--text-3)',letterSpacing:'0.12em'}}>{l}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fade} className="flex flex-wrap gap-4 mb-10">
              <Link to="projects" smooth duration={700}>
                <button className="btn-cyber"><span>View Work</span></button>
              </Link>
              <Link to="contact" smooth duration={700}>
                <button className="btn-ghost">Get In Touch</button>
              </Link>
            </motion.div>

            {/* socials */}
            <motion.div variants={fade} className="flex gap-5">
              {[
                {Icon:FaGithub,    href:'https://github.com/Aakash-Mishra1',  label:'GitHub'},
                {Icon:FaLinkedin,  href:'https://www.linkedin.com/in/aakash-mishra1/', label:'LinkedIn'},
                {Icon:HiOutlineMail, href:'mailto:Aakashmishra.in@gmail.com', label:'Email'},
              ].map(({Icon,href,label})=>(
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{y:-4,scale:1.1}}
                  className="w-9 h-9 glass rounded-sm flex items-center justify-center transition-all duration-250"
                  style={{color:'var(--text-2)'}}
                  title={label}
                >
                  <Icon size={16}/>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — photo placeholder ── */}
          <motion.div
            initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            transition={{duration:1,delay:0.5,ease:[0.16,1,0.3,1]}}
            className="flex justify-center items-center"
          >
            <div className="relative float-anim">
              {/* outer glow ring */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, var(--cyan), var(--blue), var(--indigo), var(--cyan))',
                  padding:'2px', borderRadius:'50%',
                  animation:'spin 8s linear infinite',
                  filter:'blur(1px)',
                }}/>
              {/* actual photo zone */}
              <div className="photo-zone flex items-center justify-center overflow-hidden"
                style={{
                  width:'clamp(220px,30vw,300px)',
                  height:'clamp(220px,30vw,300px)',
                  borderRadius:'50%',
                  position:'relative',
                  zIndex:1,
                  background:'var(--bg-1)',
                }}>
                <img src="/assets/Profile.jpeg" alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-blue-400 shadow-lg" />
              </div>

              {/* floating badges */}
              <motion.div className="glass rounded-sm px-3 py-2 absolute -top-3 -right-6"
                animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
                <p className="font-mono text-xs" style={{color:'var(--cyan)'}}>MERN Stack ⚡</p>
              </motion.div>
              <motion.div className="glass rounded-sm px-3 py-2 absolute -bottom-3 -left-8"
                animate={{y:[0,6,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut',delay:0.5}}>
                <p className="font-mono text-xs" style={{color:'var(--text-2)'}}>LPU · CSE 🎓</p>
              </motion.div>
              <motion.div className="glass rounded-sm px-3 py-2 absolute top-1/2 -right-16"
                style={{transform:'translateY(-50%)'}}
                animate={{x:[0,5,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut',delay:1}}>
                <p className="font-mono text-xs" style={{color:'var(--text-2)'}}>300+ DSA 💡</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>



      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}
