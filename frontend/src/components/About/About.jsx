import React from 'react'
import { motion } from 'framer-motion'
import useReveal from '../../hooks/useReveal'

const EDUCATION = [
  {
    deg:    'B.Tech — Computer Science & Engineering',
    school: 'Lovely Professional University',
    loc:    'Phagwara, Punjab',
    period: 'Aug 2023 – Present',
    grade:  'CGPA: 7.88',
    active: true,
  },
  {
    deg:    'Intermediate (Class XII)',
    school: "St. Xavier's Sr. Sec. School",
    loc:    'Balrampur, U.P.',
    period: 'Apr 2022 – May 2023',
    grade:  '85%',
  },
  {
    deg:    'Matriculation (Class X)',
    school: "St. Xavier's Sr. Sec. School",
    loc:    'Balrampur, U.P.',
    period: 'Mar 2020 – Aug 2021',
    grade:  '80%',
  },
]

const DETAILS = [
  {l:'Name',      v:'Aakash Mishra'},
  {l:'Degree',    v:'B.Tech CSE'},
  {l:'University',v:'LPU, Phagwara'},
  {l:'Location',  v:'Punjab, India'},
  {l:'CGPA',      v:'7.88 / 10'},
  {l:'Status',    v:'Open to Work', green:true},
]

export default function About() {
  const ref = useReveal()
  // Unique animation variants for each element
  const fadeDown = {
    hidden: { opacity: 0, y: -32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  }
  const fadeLeft = {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  }
  const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  }
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
  }
  const rotateIn = {
    hidden: { opacity: 0, rotate: -8 },
    show: { opacity: 1, rotate: 0, transition: { duration: 0.7 } }
  }
  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    show: { opacity: 1, rotateY: 0, transition: { duration: 0.7 } }
  }
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } }
  }

  return (
    <section id="about" ref={ref} className="py-28 px-6 lg:px-12 relative"
      style={{background:'var(--bg-1)'}}>
      {/* neon line top */}
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {/* header */}
          {/* Header */}
          <motion.div variants={fadeDown} className="mb-16">
            <p className="sec-label mb-4">01 — About Me</p>
            <h2 className="font-display font-black" style={{fontSize:'clamp(2rem,5vw,3.8rem)',color:'var(--text-1)'}}>
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* LEFT — bio + quick facts */}
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              {/* Bio */}
              <motion.div variants={fadeLeft} className="glass rounded-sm p-6 mb-8">
                <p className="font-body text-base leading-relaxed mb-4" style={{color:'var(--text-2)'}}>
                  I'm a passionate Full Stack Developer and B.Tech CSE student at Lovely Professional
                  University. I love building intuitive, performant web applications that solve
                  real problems — from pixel-perfect React UIs to solid Node.js backends.
                </p>
                <p className="font-body text-base leading-relaxed" style={{color:'var(--text-2)'}}>
                  My journey started with curiosity and turned into craft. Through an internship,
                  self-driven projects, and 300+ DSA problems, I keep sharpening both my technical
                  skills and problem-solving mindset every single day.
                </p>
              </motion.div>

              {/* Quick Details */}
              <motion.div variants={scaleIn} className="grid grid-cols-2 gap-3">
                {DETAILS.map(({l,v,green}) => (
                  <div key={l} className="glass rounded-sm px-4 py-3">
                    <p className="font-mono mb-1" style={{fontSize:'0.58rem',letterSpacing:'0.22em',color:'var(--text-3)',textTransform:'uppercase'}}>{l}</p>
                    <p className="font-body font-medium text-sm" style={{color: green ? '#22d97e' : 'var(--text-1)'}}>
                      {green && <span className="pulse-dot inline-block mr-2" style={{width:6,height:6,verticalAlign:'middle'}} />} 
                      {v}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Internship */}
              <motion.div variants={rotateIn} className="glass rounded-sm p-6 mt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display font-bold text-sm" style={{color:'var(--text-1)'}}>SDE Intern</p>
                    <p className="font-mono text-xs mt-0.5" style={{color:'var(--cyan)'}}>Interns Veda · LPU</p>
                  </div>
                  <span className="tag">Oct–Nov 2025</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Full-stack training on two live projects; built responsive UIs.',
                    'Collaborated with backend teams to integrate RESTful APIs.',
                    'Optimised performance and application reliability.',
                  ].map((pt,i) => (
                    <li key={i} className="flex gap-2 font-body text-xs leading-relaxed" style={{color:'var(--text-2)'}}>
                      <span style={{color:'var(--cyan)',marginTop:'2px'}}>›</span>{pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['HTML','CSS','JavaScript','Bootstrap','PHP','MySQL'].map(t=><span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — education timeline */}
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              {/* Education Label */}
              <motion.p variants={flipIn} className="font-display font-bold text-xl mb-6" style={{color:'var(--text-1)'}}>Education</motion.p>
              <div className="relative">
                {/* vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-px"
                  style={{background:'linear-gradient(180deg,var(--cyan),rgba(0,229,255,0.05))'}} />
                <div className="flex flex-col gap-8 pl-8">
                  {EDUCATION.map((e,i) => (
                    <motion.div key={i}
                      variants={i === 0 ? fadeLeft : i === 1 ? fadeRight : i === 2 ? fadeUp : scaleIn}
                      className="relative group"
                      whileHover={{x:4}}
                      transition={{type:'spring',stiffness:300,damping:25}}
                    >
                      {/* dot */}
                      <div className="absolute -left-8 top-2 w-3 h-3 rounded-full border transition-all duration-300 group-hover:scale-125"
                        style={{
                          background: e.active ? 'var(--cyan)' : 'transparent',
                          borderColor:'var(--cyan)',
                          transform:'translateX(-5px)',
                          boxShadow: e.active ? '0 0 10px rgba(0,229,255,0.7)' : 'none',
                        }}/>
                      <div className="glass rounded-sm p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-display font-bold text-sm leading-snug" style={{color:'var(--text-1)'}}>{e.deg}</h4>
                          <span className="tag shrink-0">{e.grade}</span>
                        </div>
                        <p className="font-mono text-xs mb-1" style={{color:'var(--cyan)'}}>{e.school}</p>
                        <div className="flex justify-between">
                          <p className="font-mono text-xs" style={{color:'var(--text-3)'}}>{e.loc}</p>
                          <p className="font-mono text-xs" style={{color:'var(--text-3)'}}>{e.period}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="neon-line absolute bottom-0 left-0 right-0" />
    </section>
  )
}
