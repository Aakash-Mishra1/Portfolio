import { useEffect, useRef } from 'react'

export default function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('.reveal')
    if (!items.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold }
    )
    items.forEach(i => obs.observe(i))
    return () => obs.disconnect()
  }, [threshold])
  return ref
}
