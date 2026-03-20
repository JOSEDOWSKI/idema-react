import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { carreras } from '../data/carreras'
import { auxiliares } from '../data/auxiliares'
import { especializaciones } from '../data/especializaciones'
import { cursos } from '../data/cursos'
import ProgramCard from '../components/ui/ProgramCard'
import type { Carrera } from '../types'

const categories = [
  { key: 'todos', label: 'Todos' },
  { key: 'carrera', label: 'Carreras Técnicas' },
  { key: 'auxiliar', label: 'Programas Auxiliares' },
  { key: 'especializacion', label: 'Especializaciones' },
  { key: 'curso', label: 'Cursos Cortos' },
] as const

const categoryBasePath: Record<string, string> = {
  carrera: '/carreras',
  auxiliar: '/auxiliares',
  especializacion: '/especializaciones',
  curso: '/cursos',
}

const allPrograms: Carrera[] = [
  ...carreras,
  ...auxiliares,
  ...especializaciones,
  ...cursos,
]

export default function ProgramasPage() {
  const [activeFilter, setActiveFilter] = useState<string>('todos')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return allPrograms.filter((p) => {
      const matchesCategory = activeFilter === 'todos' || p.category === activeFilter
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeFilter, search])

  return (
    <>
      <Helmet>
        <title>Oferta Educativa - Instituto IDEMA</title>
        <meta name="description" content="Explora todas las carreras técnicas, programas auxiliares, especializaciones y cursos cortos del Instituto IDEMA." />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-r from-dark to-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Oferta Educativa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Encuentra el programa ideal para tu desarrollo profesional
          </motion.p>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
            <input
              type="text"
              placeholder="Buscar programa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === cat.key
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'bg-white text-deep/70 hover:bg-primary/10 border border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-deep/60 mb-6">
            {filtered.length} programa{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((program, index) => (
                <ProgramCard
                  key={`${program.category}-${program.slug}`}
                  program={program}
                  basePath={categoryBasePath[program.category]}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-deep/60 text-lg">No se encontraron programas con esos criterios.</p>
              <button
                onClick={() => { setActiveFilter('todos'); setSearch('') }}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
