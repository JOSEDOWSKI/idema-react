import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MdFormatQuote } from 'react-icons/md'

const testimonials = [
  {
    name: 'Beatriz Anco',
    role: 'Enfermería',
    text: '¡100% recomendable!, estudiar en el Instituto Idema me ha servido bastante para mi desarrollo personal y me ha dado la oportunidad de elevar el puntaje de mi curriculum vitae.',
    image: '/assets/img/avatarIDEMA.png',
  },
  {
    name: 'Boris de la Cruz',
    role: 'Agropecuaria',
    text: 'Estoy totalmente satisfecho de haber invertido en Idema, ahora tengo un título que me respalda.',
    image: '/assets/img/avatarIDEMA.png',
  },
  {
    name: 'Dorian Zegarra',
    role: 'Contabilidad',
    text: 'Estoy muy agradecido con el Instituto Idema por haberme dado la oportunidad de obtener mi título.',
    image: '/assets/img/avatarIDEMA.png',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#10323F] to-[#2E136E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#00AFF0] to-[#572364] rounded-full mx-auto"></div>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              {/* Glassmorphism card */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 h-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl">
                {/* Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="text-[#00AFF0] text-3xl"
                  >
                    <MdFormatQuote />
                  </motion.div>
                </div>

                {/* Quote text */}
                <p className="text-gray-100 text-base leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00AFF0] to-[#572364] overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%2300AFF0"/%3E%3Ctext x="50" y="55" font-size="40" font-weight="bold" fill="white" text-anchor="middle"%3E%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#00AFF0] text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
