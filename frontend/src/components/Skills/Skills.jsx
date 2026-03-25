import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useReveal from '../../hooks/useReveal'

const CATEGORIES = [
  {
    label: 'Frontend', icon: '◈', color: '#00e5ff',
    skills: [
      { name: 'React.js',   pct: 85 },
      { name: 'HTML & CSS', pct: 92 },
      { name: 'JavaScript', pct: 82 },
      { name: 'Bootstrap',  pct: 78 },
    ],
  },
  {
    label: 'Backend', icon: '◉', color: '#2979ff',
    skills: [
      { name: 'Node.js',    pct: 80 },
      { name: 'Express.js', pct: 78 },
      { name: 'REST APIs',  pct: 82 },
      { name: 'PHP',        pct: 58 },
    ],
  },
  {
    label: 'Database', icon: '◎', color: '#651fff',
    skills: [
      { name: 'MongoDB',  pct: 80 },
      { name: 'MySQL',    pct: 72 },
      { name: 'Mongoose', pct: 78 },
    ],
  },
  {
    label: 'Languages', icon: '◇', color: '#00e5b3',
    skills: [
      { name: 'C++',    pct: 80 },
      { name: 'C',      pct: 75 },
      { name: 'Python', pct: 70 },
      { name: 'Java',   pct: 66 },
    ],
  },
]

function SkillBar({ name, pct, color, visible }) {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setFilled(true), 120)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(0,229,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: '2px',
          background: `linear-gradient(90deg, ${color}, rgba(41,121,255,0.7))`,
          boxShadow: '0 0 8px rgba(0,229,255,0.5)',
          width: `${pct}%`,
          transform: filled ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1.1s cubic-bezier(.22,1,.36,1)',
        }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(0)
  const ref    = useReveal()
  const catRef = useRef(null)
  const [catVisible, setCatVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCatVisible(true) },
      { threshold: 0.2 }
    )
    if (catRef.current) obs.observe(catRef.current)
    return () => obs.disconnect()
  }, [])

  const cat = CATEGORIES[active]

  const TECH_CLOUD = [
    'React','Node.js','Express','MongoDB','JavaScript','HTML5','CSS3',
    'Bootstrap','MySQL','Git','C++','C','Python','Java','REST API','Mongoose','PHP',
  ]

  return (
    <section id="skills" ref={ref} className="py-28 px-6 lg:px-12 relative"
      style={{ background: 'var(--bg-0)' }}>

      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="sec-label mb-4">02 — Skills</p>
          <h2 className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', color: 'var(--text-1)' }}>
            Technical<br /><span className="gradient-text">Skills</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={catRef}>
            <div className="reveal flex flex-wrap gap-3 mb-8">
              {CATEGORIES.map((c, i) => (
                <button key={c.label} onClick={() => setActive(i)}
                  className="font-mono text-xs px-4 py-2 rounded-sm transition-all"
                  style={{
                    background: active === i ? `${c.color}22` : 'var(--bg-glass)',
                    border: `1px solid ${active === i ? c.color : 'var(--border)'}`,
                    color: active === i ? c.color : 'var(--text-2)',
                    boxShadow: active === i ? `0 0 14px ${c.color}44` : 'none',
                    cursor: 'pointer',
                  }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            <motion.div key={active}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-sm p-6">
              <p className="font-display font-bold mb-6" style={{ color: cat.color, fontSize: '1.1rem' }}>
                {cat.icon} {cat.label}
              </p>
              {cat.skills.map(s => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} color={cat.color} visible={catVisible} />
              ))}
            </motion.div>
          </div>

          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <p className="font-mono text-xs mb-5 tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>// Tech Cloud</p>
            <div className="glass rounded-sm p-6 flex flex-wrap gap-3">
              {TECH_CLOUD.map((t, i) => (
                <motion.span key={t} className="tag"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 12px rgba(0,229,255,0.4)' }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}>
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="glass rounded-sm p-6 mt-6 reveal" style={{ transitionDelay: '0.25s' }}>
              <p className="font-mono text-xs mb-5 tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>// Coding Stats</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: '300+', l: 'Problems\nSolved' },
                  { v: '4+',   l: 'MERN\nProjects' },
                  { v: '7.88', l: 'Academic\nCGPA' },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-display font-black text-2xl gradient-text">{v}</p>
                    <p className="font-mono text-xs mt-1 whitespace-pre-line"
                      style={{ color: 'var(--text-3)', fontSize: '0.58rem', letterSpacing: '0.1em' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
