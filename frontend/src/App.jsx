import React, { useState, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Loader       from './components/Loader/Loader'
import Navbar       from './components/Navbar/Navbar'
import Hero         from './components/Hero/Hero'
import About        from './components/About/About'
import Skills       from './components/Skills/Skills'
import Projects     from './components/Projects/Projects'
import Certificates from './components/Certificates/Certificates'
import Contact      from './components/Contact/Contact'
import Footer       from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'

export const ThemeCtx = createContext()
export const useTheme = () => useContext(ThemeCtx)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme,   setTheme]   = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('am-theme') || 'dark'
    setTheme(saved)
    document.documentElement.className = saved
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.className = next
    localStorage.setItem('am-theme', next)
  }

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onDone={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'var(--bg-0)', minHeight: '100vh' }}
          >
            <Toaster position="bottom-right" toastOptions={{
              style: {
                background: 'var(--bg-glass)',
                color: 'var(--text-1)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
              },
            }} />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Certificates />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeCtx.Provider>
  )
}
