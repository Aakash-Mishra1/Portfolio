import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import axios from 'axios'
import toast from 'react-hot-toast'
import useReveal from '../../hooks/useReveal'

const INFO = [
  { Icon: HiOutlineMail,           label: 'Email',    val: 'Aakashmishra.in@gmail.com', href: 'mailto:Aakashmishra.in@gmail.com' },
  { Icon: HiOutlinePhone,          label: 'Phone',    val: '+91 9198428850',             href: 'tel:+919198428850' },
  { Icon: HiOutlineLocationMarker, label: 'Location', val: 'Punjab, India',              href: '#' },
]

const SOCIALS = [
  { Icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/Aakash-Mishra1' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aakash-mishra1/' },
]

export default function Contact() {
  const ref = useReveal()
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields.')
      return
    }
    setSending(true)
    try {
      await axios.post('/api/contact', form)
      toast.success("Message sent! I'll get back to you soon.")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send. Try emailing directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6 lg:px-12 relative"
      style={{ background: 'var(--bg-1)' }}>
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="reveal mb-16">
          <p className="sec-label mb-4">05 — Contact</p>
          <h2 className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', color: 'var(--text-1)' }}>
            Let's Build<br /><span className="gradient-text">Something Together</span>
          </h2>
          <p className="font-body italic mt-4 max-w-xl" style={{ color: 'var(--text-2)', fontSize: '1rem' }}>
            Open to internships, collaborations, and full-time roles. Drop a message — I read everything.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* LEFT — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {INFO.map(({ Icon, label, val, href }, i) => (
              <motion.a key={label} href={href}
                className="reveal glass rounded-sm px-5 py-4 flex items-center gap-4 group"
                style={{ transitionDelay: `${i * 0.08}s`, textDecoration: 'none' }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: 'var(--cyan-dim)', border: '1px solid var(--border-hi)' }}>
                  <Icon size={16} style={{ color: 'var(--cyan)' }} />
                </div>
                <div>
                  <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</p>
                  <p className="font-body text-sm" style={{ color: 'var(--text-1)' }}>{val}</p>
                </div>
              </motion.a>
            ))}

            {/* socials */}
            <div className="reveal flex gap-3 pt-2" style={{ transitionDelay: '0.28s' }}>
              {SOCIALS.map(({ Icon, label, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="glass rounded-sm px-4 py-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-2)', letterSpacing: '0.12em' }}
                  whileHover={{ y: -3 }}
                  title={label}
                >
                  <Icon size={14} />
                  {label}
                </motion.a>
              ))}
            </div>

            {/* availability card */}
            <div className="reveal glass rounded-sm p-5 mt-2" style={{ transitionDelay: '0.35s', borderColor: 'rgba(34,217,126,0.25)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="pulse-dot" />
                <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d97e' }}>Available for Work</p>
              </div>
              <p className="font-body text-sm" style={{ color: 'var(--text-2)' }}>
                Currently seeking internships and entry-level SDE roles. Based in Punjab, India — open to remote.
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="reveal glass rounded-sm p-7 flex flex-col gap-5"
              style={{ transitionDelay: '0.1s' }}>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase mb-2 block"
                    style={{ color: 'var(--text-3)' }}>Name *</label>
                  <input name="name" value={form.name} onChange={onChange}
                    placeholder="Your name" className="cyber-input" required />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase mb-2 block"
                    style={{ color: 'var(--text-3)' }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={onChange}
                    placeholder="your@email.com" className="cyber-input" required />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest uppercase mb-2 block"
                  style={{ color: 'var(--text-3)' }}>Subject</label>
                <input name="subject" value={form.subject} onChange={onChange}
                  placeholder="What's it about?" className="cyber-input" />
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest uppercase mb-2 block"
                  style={{ color: 'var(--text-3)' }}>Message *</label>
                <textarea name="message" value={form.message} onChange={onChange}
                  rows={5} placeholder="Tell me about the opportunity…"
                  className="cyber-input" style={{ resize: 'vertical' }} required />
              </div>

              <motion.button type="submit" disabled={sending}
                className="btn-cyber self-start flex items-center gap-2"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {sending
                  ? <><span className="loader-cursor" style={{ width: '8px', height: '12px' }} /><span>Sending…</span></>
                  : <><HiPaperAirplane size={14} style={{ transform: 'rotate(90deg)' }} /><span>Send Message</span></>
                }
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      <div className="neon-line absolute bottom-0 left-0 right-0" />
    </section>
  )
}
