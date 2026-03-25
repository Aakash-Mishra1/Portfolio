import React from 'react'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const NAV = ['About','Skills','Projects','Certificates','Contact']
const SOCIAL = [
  { Icon: FaGithub,        href: 'https://github.com/Aakash-Mishra1',       label: 'GitHub' },
  { Icon: FaLinkedin,      href: 'https://www.linkedin.com/in/aakash-mishra1/',  label: 'LinkedIn' },
  { Icon: HiOutlineMail,   href: 'mailto:Aakashmishra.in@gmail.com',        label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative py-14 px-6 lg:px-12" style={{ background: 'var(--bg-0)' }}>
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg,var(--cyan),var(--blue))',
                clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#03070f', fontFamily: '"Exo 2",sans-serif', fontWeight: 900, fontSize: '0.9rem',
              }}>A</div>
              <div>
                <p className="font-display font-bold" style={{ color: 'var(--text-1)', fontSize: '1rem' }}>Aakash Mishra</p>
                <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.28em', color: 'var(--cyan)' }}>FULL STACK DEVELOPER</p>
              </div>
            </div>
            <p className="font-body text-sm max-w-xs" style={{ color: 'var(--text-3)' }}>
              Building digital experiences with the MERN stack. LPU · CSE · Open to Work.
            </p>
          </div>

          {/* nav links */}
          <div>
            <p className="font-mono text-xs mb-4 tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Navigate</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map(n => (
                <li key={n}>
                  <Link to={n.toLowerCase()} smooth duration={700}
                    className="font-mono text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200"
                    style={{ color: 'var(--text-2)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
                  >{n}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* socials */}
          <div>
            <p className="font-mono text-xs mb-4 tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Connect</p>
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--text-2)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'var(--border-hi)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  title={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Aakash Mishra. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            Built with <span style={{ color: 'var(--cyan)' }}>React</span> · <span style={{ color: 'var(--blue)' }}>Node.js</span> · <span style={{ color: 'var(--indigo)' }}>MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
