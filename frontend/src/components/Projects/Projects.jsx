import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiOutlineExternalLink, HiOutlinePhotograph } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'

const PROJECTS = [
  {
    num: '01',
    title: 'Restaurant Food Application',
    subtitle: 'Full Stack Food Ordering Platform',
    desc: 'A fully-featured MERN food ordering app with menu browsing, cart management, secure JWT authentication, order tracking, and an admin panel for managing items and orders.',
    tech: ['MongoDB','Express.js','React.js','Node.js','Mongoose','JWT'],
    github: 'https://github.com/Aakash-Mishra1/Arab-Punjab-Food-Delivery-Website',
    live: '#',
    accent: '#00e5ff',
    image: '/assets/project1.png',
  },
  {
    num: '02',
    title: 'Medical Healthcare Website',
    subtitle: 'Healthcare Information Platform',
    desc: 'A comprehensive full-stack MERN healthcare platform with responsive mobile-first React UI, secure role-based authentication for patients and admins, and RESTful API integration.',
    tech: ['MongoDB','Express.js','React.js','Node.js','Mongoose','REST API'],
    github: 'https://github.com/Aakash-Mishra1/Medicare-Medical-Health-care-Portal',
    live: '#',
    accent: '#2979ff',
    image: '/assets/project2.png',
  },
  {
    num: '03',
    title: 'Chatify',
    subtitle: 'Real-Time Chat Application',
    desc: 'Real-time chat app powered by Socket.io with private & group chats, online presence indicators, message history persisted in MongoDB, and a polished modern UI.',
    tech: ['MongoDB','Express.js','React.js','Node.js','Socket.io','JWT'],
    github: 'https://github.com/Aakashmishra-1/Chatify',
    live: 'https://chatify-connect.netlify.app/',
    accent: '#651fff',
    image: '/assets/project3.png',
  },
  {
    num: '04',
    title: 'SnapKart',
    subtitle: 'E-Commerce Website',
    desc: 'Feature-rich e-commerce platform with product catalog, search & filter, shopping cart, Stripe payment integration, order management, and a full admin dashboard.',
    tech: ['MongoDB','Express.js','React.js','Node.js','Stripe','Mongoose'],
    github: 'https://github.com/Aakash-Mishra1/E-commerce',
    live: '#',
    accent: '#00e5b3',
    image: '/assets/project4.png',
  },
]

function TiltCard({ project, delay }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({rx:0,ry:0})
  const [glowPos, setGlowPos] = useState({x:50,y:50})
  const [hovered, setHovered] = useState(false)

  const onMove = e => {
    const el = cardRef.current; if(!el) return
    const {left,top,width,height} = el.getBoundingClientRect()
    const x = e.clientX-left, y = e.clientY-top
    const rx = ((y/height)-.5)*14
    const ry = ((.5-x/width))*14
    setTilt({rx,ry})
    setGlowPos({x:(x/width)*100, y:(y/height)*100})
  }
  const onLeave = () => { setTilt({rx:0,ry:0}); setHovered(false) }

  return (
    <motion.div
      className="reveal"
      style={{transitionDelay:`${delay}s`}}
      initial={false}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={onLeave}
        className="tilt-card glass rounded-sm overflow-hidden h-full flex flex-col"
        style={{
          '--rx': `${tilt.rx}deg`,
          '--ry': `${tilt.ry}deg`,
          boxShadow: hovered ? `var(--glow-c), 0 20px 60px rgba(0,0,0,0.35)` : '0 4px 24px rgba(0,0,0,0.2)',
          borderColor: hovered ? project.accent+'80' : 'var(--border)',
          transition:'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* mouse follow glow overlay */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background:`radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, ${project.accent}14, transparent)`,
              transition:'background 0.1s',zIndex:1,
            }}/>
        )}

        {/* project image */}
        <div className="proj-img-zone relative" style={{height:'180px'}}>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-sm" />
          {/* accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
            style={{background:`linear-gradient(90deg,transparent,${project.accent},transparent)`,
              opacity: hovered ? 1 : 0.3}} />
          <div className="absolute top-2 left-3">
            <span className="font-display font-black text-4xl" style={{color:`${project.accent}18`,lineHeight:1}}>{project.num}</span>
          </div>
        </div>

        {/* content */}
        <div className="p-6 flex flex-col flex-1" style={{position:'relative',zIndex:2}}>
          <h3 className="font-display font-bold mb-1" style={{color:'var(--text-1)',fontSize:'1.1rem'}}>{project.title}</h3>
          <p className="font-mono text-xs mb-4" style={{color:project.accent,letterSpacing:'0.06em'}}>{project.subtitle}</p>
          <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{color:'var(--text-2)'}}>{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map(t => (
              <span key={t} className="tag" style={{borderColor:`${project.accent}40`,color:project.accent}}>{t}</span>
            ))}
          </div>
          <div className="flex gap-4 pt-4" style={{borderTop:'1px solid var(--border)'}}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-250"
              style={{color:'var(--text-3)'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--text-1)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}>
              <FaGithub size={13}/> Code
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-250"
              style={{color:'var(--text-3)'}}
              onMouseEnter={e=>e.currentTarget.style.color=project.accent}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}>
              <HiOutlineExternalLink size={13}/> Live
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" ref={ref} className="py-28 px-6 lg:px-12 relative"
      style={{background:'var(--bg-1)'}}>
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="sec-label mb-4">03 — Projects</p>
          <h2 className="font-display font-black" style={{fontSize:'clamp(2rem,5vw,3.8rem)',color:'var(--text-1)'}}>
            What I've<br/><span className="gradient-text">Built</span>
          </h2>
          <p className="font-body italic mt-4 max-w-xl" style={{color:'var(--text-2)',fontSize:'1rem'}}>
            Full-stack MERN applications — each one crafted with attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p,i) => (
            <TiltCard key={p.num} project={p} delay={i*0.1} />
          ))}
        </div>

        <div className="reveal text-center mt-14" style={{transitionDelay:'0.4s'}}>
          <a href="https://github.com/AakashMishra-1" target="_blank" rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2">
            <FaGithub size={14}/> More on GitHub
          </a>
        </div>
      </div>

      <div className="neon-line absolute bottom-0 left-0 right-0" />
    </section>
  )
}
