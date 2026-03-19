import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { cursos } from '../../data/cursos'

export default function CursosSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Cursos Cortos
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            4 semanas de capacitación intensiva
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#00AFF0] to-[#572364] rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cursos.map((curso, index) => (
            <motion.div
              key={curso.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <Link to={`/cursos/${curso.slug}`} className="block no-underline">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={curso.image}
                      alt={curso.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00AFF0] transition-colors">
                      {curso.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {curso.duration}
                    </p>
                    <div className="mt-auto">
                      <span className="text-[#00AFF0] font-semibold text-xs group-hover:translate-x-1 transition-transform inline-block">
                        Ver Curso →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
