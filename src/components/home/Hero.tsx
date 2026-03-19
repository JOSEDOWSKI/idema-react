import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const desktopImages = [
  '/assets/img/hero/desktop/PRINCIPAL _1.jpeg',
  '/assets/img/hero/desktop/ADMI_EMPRESAS_1.jpeg',
  '/assets/img/hero/desktop/AGROPECUARIA_1.jpeg',
  '/assets/img/hero/desktop/CONTABILIDAD_1.jpeg',
  '/assets/img/hero/desktop/ENFERMERIA_1.jpeg',
]

const mobileImages = [
  '/assets/img/hero/mobile/PRINCIPAL_2.jpeg',
  '/assets/img/hero/mobile/ADMI_EMPRESAS_2.jpeg',
  '/assets/img/hero/mobile/AGROPECUARIA_2.jpeg',
  '/assets/img/hero/mobile/CONTABILIDAD_2.jpeg',
  '/assets/img/hero/mobile/ENFERMERIA_2.jpeg',
]

const INTERVAL = 4000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % desktopImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const images = isMobile ? mobileImages : desktopImages

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slider */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          loading={current === 0 ? 'eager' : 'lazy'}
        />
      </AnimatePresence>

      {/* Dark overlay - brand colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10323F]/75 via-[#10323F]/50 to-[#2E136E]/60" />

      

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'w-8 h-3 bg-[#00AFF0]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
