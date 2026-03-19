import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { carreras } from '../../data/carreras'
import ProgramCard from '../ui/ProgramCard'

export default function CarrerasSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section id="carreras" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Carreras Profesionales Técnicas
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            3 años de formación integral
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#00AFF0] to-[#572364] rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {carreras.map((carrera, index) => (
            <ProgramCard key={carrera.slug} program={carrera} basePath="/carreras" index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
