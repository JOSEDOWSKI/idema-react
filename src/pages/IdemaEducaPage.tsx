import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaTree, FaGraduationCap, FaBook, FaCertificate, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { carreras } from '../data/carreras'
import { auxiliares } from '../data/auxiliares'
import { especializaciones } from '../data/especializaciones'
import { cursos } from '../data/cursos'

export default function IdemaEducaPage() {
  const programCategories = [
    {
      title: 'Carreras Técnicas',
      icon: FaGraduationCap,
      color: 'from-primary to-primary/70',
      programs: carreras,
      link: '/carreras'
    },
    {
      title: 'Programas Auxiliares',
      icon: FaCertificate,
      color: 'from-accent to-cta',
      programs: auxiliares,
      link: '/auxiliares'
    },
    {
      title: 'Especializaciones',
      icon: FaBook,
      color: 'from-cta to-deep',
      programs: especializaciones,
      link: '/especializaciones'
    },
    {
      title: 'Cursos Especializados',
      icon: FaBook,
      color: 'from-dark to-accent',
      programs: cursos,
      link: '/cursos'
    }
  ]

  return (
    <>
      <Helmet>
        <title>IDEMA Educa - Árbol de Habilidades</title>
        <meta name="description" content="Visualiza nuestro árbol de habilidades con todos nuestros programas educativos organizados jerárquicamente." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-dark to-deep">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-full flex flex-col justify-center items-center text-white text-center p-6"
        >
          <FaTree className="text-6xl mb-4 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">IDEMA Educa</h1>
          <p className="text-lg md:text-xl text-primary max-w-2xl">Árbol de Habilidades - Toda nuestra oferta educativa en un solo lugar</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Nuestro Árbol de Habilidades</h2>
            <p className="text-lg text-deep max-w-3xl mx-auto">
              El árbol de habilidades de IDEMA Educa organiza todos nuestros programas educativos de forma jerárquica, desde formación técnica básica hasta especializaciones avanzadas. Encuentra el programa perfecto para tu ruta de aprendizaje.
            </p>
          </motion.div>

          {/* Program Categories */}
          <div className="space-y-16">
            {programCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl text-white`}>
                    <category.icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-deep">{category.title}</h3>
                    <p className="text-deep/80">{category.programs.length} programas disponibles</p>
                  </div>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.programs.map((program, index) => (
                    <motion.div
                      key={program.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ translateY: -5 }}
                      className="bg-gradient-to-br from-surface to-white rounded-lg p-6 border-2 border-deep/10 hover:border-primary/40 transition-all group"
                    >
                      <h4 className="text-lg font-bold text-deep mb-2 group-hover:text-primary transition-colors">
                        {program.title}
                      </h4>
                      <p className="text-sm text-deep/80 mb-4">{program.shortTitle}</p>

                      <div className="space-y-2 text-xs text-deep mb-4">
                        <div className="flex justify-between">
                          <span className="font-semibold">Duración:</span>
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Modalidad:</span>
                          <span>{program.modality}</span>
                        </div>
                      </div>

                      <Link to={`/${program.category}/${program.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                        >
                          Ver Detalles
                          <FaArrowRight className="text-sm" />
                        </motion.button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tree Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-gradient-to-br from-primary/10 to-accent/10 p-12 rounded-xl border-2 border-primary/30"
          >
            <h3 className="text-2xl font-bold text-deep mb-8 text-center">Estructura del Árbol de Habilidades</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-deep">Formación Técnica Base</h4>
                  <p className="text-deep text-sm">Carreras técnicas de 3 años que forman profesionales competentes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-deep">Programas Auxiliares</h4>
                  <p className="text-deep text-sm">Formación rápida de 10 meses en áreas técnicas especializadas</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cta rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-deep">Especialización</h4>
                  <p className="text-deep text-sm">Profundización en áreas específicas para profesionales con experiencia</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-deep">Cursos Especializados</h4>
                  <p className="text-deep text-sm">Cursos de corta duración (4 semanas) en temas puntuales</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-r from-primary to-dark rounded-xl p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿No Sabes Cuál Elegir?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Realiza nuestra prueba de orientación vocacional para descubrir cuál es el programa que mejor se ajusta a tus intereses y aptitudes.
            </p>

            <a href="/orientacion-vocacional">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Realizar Prueba de Orientación
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}
