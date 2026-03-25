import React, { useState } from 'react'
import AnimatedNumber from './AnimatedNumber'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineExternalLink, HiX, HiChevronDown } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'

const CERTS = [
  {
    title:   'Java with OOPs',
    issuer:  'CipherSchools',
    date:    'July 2025',
    id:      'CSW2025-12840',
    category:'Programming',
    color:   '#f59e0b',
    desc:    'Comprehensive course covering object-oriented programming with Java — classes, inheritance, polymorphism, encapsulation, and abstraction.',
    url:     'https://drive.google.com/file/d/1qTSZzrO_2kJKx1ZCdc3jIQXHT4tAGVRo/view?usp=drive_link',
    image:   '/assets/certificate1.png',
  },
  {
    title:   'Python towards ML/AI',
    issuer:  'CSE Pathshala',
    date:    'March 2024',
    id:      'CP-20240203-PY468',
    category:'AI / ML',
    color:   '#3b82f6',
    desc:    'Practical Python course covering fundamentals, NumPy, Pandas, and an introduction to machine learning and AI concepts.',
    url:     'https://drive.google.com/file/d/1FAM9i4pWBEZXLMYN7dg40AdtpcxWdW1n/view?usp=drive_link',
    image:   '/assets/certificate2.png',
  },
  {
    title:   'HTML, CSS & JavaScript',
    issuer:  'IBM / Coursera',
    date:    'Feb 2024',
    id:      'BLW978CASXU7',
    category:'Web Dev',
    color:   '#00e5ff',
    desc:    'IBM-backed web development course covering modern HTML5, CSS3, and JavaScript — responsive layouts, DOM manipulation, and event-driven programming.',
    url:     'https://drive.google.com/file/d/1ZN48mn6rhnNLNWGFO8DFZQkJyzPWojA1/view?usp=drive_link',
    image:   '/assets/certificate3.png',
  },
  {
    title:   'Full Stack MERN',
    issuer:  'Knowledge Gate',
    date:    '2024',
    id:      '1122089221740386',
    category:'Full Stack',
    color:   '#61dafb',
    desc:    'End-to-end MERN stack course: MongoDB, Express.js, React.js, Node.js — RESTful API design, authentication, state management, and deployment.',
    url:     'https://drive.google.com/file/d/1ido3I1a3n-pDCC5m1aLOgtiiOr4qIPeg/view?usp=drive_link',
    image:   '/assets/certificate4.png',
  },
  {
    title:   'C Programming',
    issuer:  'IBM / UC Santa Cruz',
    date:    'Feb 2024',
    id:      'WB9FTZ5Y2FQC',
    category:'Programming',
    color:   '#2979ff',
    desc:    'Foundational C programming — pointers, memory management, data structures, and systems-level thinking via IBM and UC Santa Cruz.',
    url:     'https://drive.google.com/file/d/1lLVvW1ze0yj7kgtPQCeflFX55OmuJuTy/view?usp=drive_link',
    image:   '/assets/certificate5.png',
  },
]

/* ─── Certificate Modal ─── */
function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div className="modal-overlay" onClick={onClose}
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div className="glass rounded-sm w-full max-w-lg p-7 relative"
            onClick={e=>e.stopPropagation()}
            initial={{opacity:0,scale:0.88,y:30}}
            animate={{opacity:1,scale:1,y:0}}
            exit={{opacity:0,scale:0.92,y:20}}
            transition={{type:'spring',stiffness:340,damping:28}}
          >
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center glass rounded-sm transition-colors duration-200"
              style={{color:'var(--text-3)'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--text-1)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}>
              <HiX size={16}/>
            </button>

            {/* header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                style={{background:`${cert.color}22`,border:`1px solid ${cert.color}55`}}>
                <HiOutlineAcademicCap size={18} style={{color:cert.color}}/>
              </div>
              <div>
                <h3 className="font-display font-bold text-base" style={{color:'var(--text-1)'}}>{cert.title}</h3>
                <p className="font-mono text-xs mt-0.5" style={{color:cert.color}}>{cert.issuer}</p>
              </div>
            </div>

            <div className="neon-line mb-5" />

            {/* certificate image */}
            <div className="photo-zone rounded-sm mb-5" style={{height:'180px'}}>
              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                {l:'Issued By', v:cert.issuer},
                {l:'Date',      v:cert.date},
                {l:'Category',  v:cert.category},
                {l:'Cert ID',   v:cert.id},
              ].map(({l,v})=>(
                <div key={l} className="glass rounded-sm px-4 py-3">
                  <p className="font-mono mb-0.5" style={{fontSize:'0.56rem',letterSpacing:'0.2em',color:'var(--text-3)',textTransform:'uppercase'}}>{l}</p>
                  <p className="font-body text-xs" style={{color:'var(--text-1)'}}>{v}</p>
                </div>
              ))}
            </div>

            {cert.url && cert.url !== '#' && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer"
                className="btn-cyber w-full justify-center text-center">
                <HiOutlineExternalLink size={14}/><span>View Certificate</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Cert Row (accordion expand) ─── */
function CertRow({ cert, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="reveal glass rounded-sm overflow-hidden"
      style={{transitionDelay:`${index*0.07}s`}}
    >
      {/* header row — always visible */}
      <button
        onClick={()=>setOpen(o=>!o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
        style={{cursor:'pointer'}}
      >
        {/* color dot */}
        <div className="w-2 h-2 rounded-full shrink-0"
          style={{background:cert.color, boxShadow:`0 0 8px ${cert.color}80`}}/>

        {/* title */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm leading-tight" style={{color:'var(--text-1)'}}>{cert.title}</p>
          <p className="font-mono text-xs mt-0.5" style={{color:'var(--text-3)'}}>{cert.issuer} · {cert.date}</p>
        </div>

        {/* category tag */}
        <span className="tag shrink-0 hidden sm:inline-block" style={{borderColor:`${cert.color}55`,color:cert.color}}>
          {cert.category}
        </span>

        {/* chevron */}
        <motion.div animate={{rotate: open ? 180 : 0}} transition={{duration:0.25}}
          style={{color:'var(--text-3)',flexShrink:0}}>
          <HiChevronDown size={16}/>
        </motion.div>
      </button>

      {/* expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{height:0,opacity:0}}
            animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}}
            transition={{duration:0.38,ease:[0.22,1,0.36,1]}}
            style={{overflow:'hidden'}}
          >
            <div className="px-5 pb-5 pt-1" style={{borderTop:'1px solid var(--border)'}}>
              <p className="font-body text-sm leading-relaxed mb-5" style={{color:'var(--text-2)'}}>{cert.desc}</p>

              {/* cert image */}
              <div className="photo-zone rounded-sm mb-4 flex items-center justify-center bg-black/30"
                style={{
                  background: 'var(--bg-2, #181c24)',
                  border: '2px dashed var(--cyan, #00e5ff)',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  margin: '0 auto',
                  padding: '20px',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '420px',
                }}>
                <img src={cert.image} alt={cert.title}
                  className="rounded-sm"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '700px',
                    maxHeight: '380px',
                    margin: '0 auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="font-mono text-xs" style={{color:'var(--text-3)'}}>ID: {cert.id}</p>
                {cert.url && cert.url !== '#' ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200"
                    style={{
                      background: 'linear-gradient(90deg, #00e5ff 0%, #2979ff 100%)',
                      color: '#10131a',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      boxShadow: '0 2px 12px 0 #00e5ff33',
                      border: 'none',
                      outline: 'none',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    LINK
                  </a>
                ) : (
                  <span className="font-mono text-xs" style={{color:'var(--text-3)'}}>Link coming soon</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useReveal()

  return (
    <section id="certificates" ref={ref} className="py-28 px-6 lg:px-12 relative"
      style={{background:'var(--bg-0)'}}>
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-16">
          <p className="sec-label mb-4">04 — Certifications</p>
          <h2 className="font-display font-black" style={{fontSize:'clamp(2rem,5vw,3.8rem)',color:'var(--text-1)'}}>
            Credentials &<br/><span className="gradient-text">Achievements</span>
          </h2>
          <p className="font-body italic mt-4" style={{color:'var(--text-2)',fontSize:'1rem'}}>
            Click any certificate to expand details and view the credential.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {CERTS.map((c,i) => <CertRow key={c.id} cert={c} index={i} />)}
        </div>

        {/* stats strip */}
        <div className="reveal glass rounded-sm p-6 mt-12 flex flex-wrap justify-center gap-10"
          style={{transitionDelay:'0.5s'}}>
          {[ 
            {v:10, suffix:'+', l:'Certifications'},
            {v:300, suffix:'+', l:'Problems Solved'},
            {v:100, suffix:'%', l:'Completion Rate'},
          ].map(({v,suffix,l})=>(
            <div key={l} className="text-center">
              <p className="font-display font-black text-3xl gradient-text">
                <AnimatedNumber value={v} format={n => `${n}${suffix}`} />
                {/* fallback for no-JS/SSR: */}
                <noscript>{v}{suffix}</noscript>
              </p>
              <p className="font-mono text-xs mt-1" style={{color:'var(--text-3)',letterSpacing:'0.12em'}}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="neon-line absolute bottom-0 left-0 right-0" />
    </section>
  )
}
