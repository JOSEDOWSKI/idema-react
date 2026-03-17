import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoChevronDown } from 'react-icons/io5'
import { useInView } from 'react-intersection-observer'

const typingMessages = [
  'Estamos Transformando la Educación que Conoces',
  'Formando Profesionales del Futuro',
  'Educación de Calidad y Accesible',
]

export default function Hero() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    const currentMessage = typingMessages[currentMessageIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1))
        }, 50)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
      } else {
        setCurrentMessageIndex((prev) => (prev + 1) % typingMessages.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, currentMessageIndex])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#000428] to-[#004e92]"
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
      >
        {/* Glassmorphism container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16 mb-8"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cyan-300 text-sm sm:text-base font-semibold tracking-widest uppercase mb-4"
          >
            BIENVENIDO A IDEMA
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Estamos Transformando <br /> la Educación que Conoces
          </motion.h1>

          {/* Typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-8 flex items-center justify-center mb-8"
          >
            <p className="text-lg sm:text-xl text-cyan-300">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="#carreras">
              <button className="px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Ver Carreras
              </button>
            </Link>
            <a href="/orientacion-vocacional">
              <button className="px-8 py-3 sm:py-4 backdrop-blur-md bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Orientación Vocacional
              </button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-white/60 text-sm mb-2">Desplázate</span>
          <IoChevronDown className="text-cyan-300 text-2xl" />
        </motion.div>
      </motion.div>
    </div>
  )
}
