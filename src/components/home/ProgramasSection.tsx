import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'
import { programCategories, type ProgramCategory } from '../../data/programs/categories'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function CategoriaCard({ titulo, descripcion, imagen, ruta, cantidad, duracion, modalidad, certificaciones, titulacion, imagenIzquierda }: Omit<ProgramCategory, 'key' | 'badge'>) {
  const imgBlock = (
    <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden flex-shrink-0">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 to-transparent" />
      <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-deep backdrop-blur-sm">
        {duracion}
      </span>
    </div>
  )

  const contentBlock = (
    <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
      <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-3">
        <span>{modalidad}</span>
        <span className="text-deep/30">•</span>
        <span>{cantidad} programa{cantidad !== 1 ? 's' : ''}</span>
      </div>

      <h3 className="text-xl font-bold text-deep mb-2 group-hover:text-primary transition-colors">
        {titulo}
      </h3>

      <p className="text-deep/70 text-sm leading-relaxed flex-1">
        {descripcion}
      </p>

      <div className="mt-4 space-y-1">
        {titulacion && (
          <p className="text-xs font-semibold text-deep/80">{titulacion}</p>
        )}
        {certificaciones.map((cert, i) => (
          <p key={i} className="text-xs text-deep/50">{cert}</p>
        ))}
      </div>

      <div className="flex items-center gap-1 text-primary font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
        Ver programas
        <MdArrowForward className="text-base" />
      </div>
    </div>
  )

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group">
      <Link to={ruta} className="block no-underline">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
          <div className="flex flex-col md:hidden">
            {imgBlock}
            {contentBlock}
          </div>
          <div className="hidden md:flex md:flex-row w-full">
            {imagenIzquierda ? <>{imgBlock}{contentBlock}</> : <>{contentBlock}{imgBlock}</>}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProgramasSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section
      id="programas"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep mb-4">
            Nuestra Oferta Educativa
          </h2>
          <p className="text-lg text-deep/70 max-w-2xl mx-auto">
            Carreras, programas auxiliares, especializaciones y cursos cortos
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {programCategories.map(({ key, badge: _, ...cat }) => (
            <CategoriaCard key={key} {...cat} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            to="/programas"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            Ver toda la oferta educativa
            <MdArrowForward className="text-lg" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
