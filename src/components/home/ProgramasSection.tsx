import { motion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { programCategories, type ProgramCategory } from '../../data/programs'

function CategoriaBlock({ badge, titulo, descripcion, imagen, ruta, cantidad, imagenIzquierda }: ProgramCategory) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  const imgVariant: Variants = {
    hidden: { opacity: 0, x: imagenIzquierda ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  }

  const txtVariant: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' as const } },
  }

  const imgCol = (
    <motion.div
      variants={imgVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full md:w-1/2 aspect-[4/3] overflow-hidden"
    >
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </motion.div>
  )

  const txtCol = (
    <motion.div
      variants={txtVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full md:w-1/2 flex flex-col justify-center gap-3 px-6 py-6 md:px-8 md:py-6 bg-white"
    >
      <span
        className="self-start text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
        style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-subheading)' }}
      >
        {badge}
      </span>

      <h3
        className="text-xl md:text-2xl font-bold leading-tight"
        style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-heading)' }}
      >
        {titulo}
      </h3>

      <p
        className="text-sm md:text-sm leading-relaxed line-clamp-3"
        style={{ color: 'var(--color-dark)', opacity: 0.75, fontFamily: 'var(--font-body)' }}
      >
        {descripcion}
      </p>

      <p
        className="text-sm font-semibold"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-subheading)' }}
      >
        {cantidad} programa{cantidad !== 1 ? 's' : ''} disponible{cantidad !== 1 ? 's' : ''}
      </p>

      <div>
        <Link to={ruta} className="no-underline">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 text-white text-sm font-bold rounded-full transition-shadow duration-300 hover:shadow-md cursor-pointer"
            style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-subheading)' }}
          >
            Ver programas →
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl shadow-md flex flex-col md:flex-row">
      <div className="flex flex-col md:hidden">
        {imgCol}
        {txtCol}
      </div>

      <div className="hidden md:flex md:flex-row w-full">
        {imagenIzquierda ? <>{imgCol}{txtCol}</> : <>{txtCol}{imgCol}</>}
      </div>
    </div>
  )
}

export default function ProgramasSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section
      id="programas"
      ref={ref}
      className="py-16 sm:py-20"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-heading)' }}
          >
            Nuestra Oferta Educativa
          </h2>
          <p
            className="text-base"
            style={{ color: 'var(--color-dark)', opacity: 0.7, fontFamily: 'var(--font-body)' }}
          >
            Carreras, programas auxiliares, especializaciones y cursos cortos
          </p>
          <div
            className="h-1 w-16 rounded-full mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))' }}
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          {programCategories.map(({ key, ...cat }) => (
            <CategoriaBlock key={key} {...cat} />
          ))}
        </div>

        {/* CTA FINAL (SE MANTIENE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/programas" className="no-underline">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-white font-bold px-8 py-3 rounded-full text-base transition-shadow duration-300 hover:shadow-lg cursor-pointer"
              style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-subheading)' }}
            >
              Ver toda la oferta educativa
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}