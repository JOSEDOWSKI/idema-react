import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaCheck, FaClock, FaBook, FaCertificate, FaCalendar, FaWhatsapp, FaEnvelope, FaBriefcase, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'
import { carreras } from '../../data/carreras/carreras'
import { useCart } from '../../context/CartContext'

export default function CarreraPage() {
  const { slug } = useParams<{ slug: string }>()
  const carrera = carreras.find(c => c.slug === slug)
  const { addItem } = useCart()

  if (!carrera) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-deep">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-white/50 mb-8">Carrera no encontrada</p>
          <Link to="/carreras">
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
              Volver a Carreras
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const prices = [
    carrera.pricePresencial && { label: 'Presencial', price: carrera.pricePresencial },
    carrera.priceSemipresencial && { label: 'Semipresencial', price: carrera.priceSemipresencial },
    carrera.priceVirtual && { label: 'Virtual', price: carrera.priceVirtual },
    carrera.price && !carrera.pricePresencial && !carrera.priceVirtual && { label: 'Mensualidad', price: carrera.price },
  ].filter(Boolean) as { label: string; price: string }[]

  const handleAddToCart = (modality?: string, price?: string) => {
    const numPrice = price ? parseInt(price.replace(/[^0-9]/g, ''), 10) : 0
    addItem(carrera, numPrice, modality)
  }

  return (
    <>
      <Helmet>
        <title>{carrera.title} - Instituto IDEMA</title>
        <meta name="description" content={carrera.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${carrera.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        {/* Duration badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-6 right-6 md:top-10 md:right-12 z-10 bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-primary/30"
        >
          <FaClock className="inline mr-2" />
          {carrera.duration}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-full flex flex-col justify-end p-6 md:p-12 text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{carrera.title}</h1>
          {carrera.subtitle && <p className="text-primary text-lg mb-2">{carrera.subtitle}</p>}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl">{carrera.modality}</p>
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-surface py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-deep/80">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link to="/#carreras" className="hover:text-primary">Carreras</Link>
          <span>/</span>
          <span className="text-deep font-semibold">{carrera.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Descripción del Programa</h2>
            <p className="text-lg text-deep leading-relaxed">{carrera.description}</p>
          </motion.div>

          {/* Prices & Add to Cart */}
          {prices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">
                <FaMoneyBillWave className="inline mr-2" />
                Inversión Mensual
              </h2>
              {carrera.matricula && (
                <p className="text-deep/80 mb-6">Matrícula: <span className="font-bold text-primary">{carrera.matricula}</span></p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {prices.map(p => (
                  <motion.div
                    key={p.label}
                    whileHover={{ translateY: -5 }}
                    className="bg-gradient-to-br from-surface to-white rounded-xl p-6 border-2 border-deep/10 hover:border-primary/40 transition-all text-center"
                  >
                    <p className="text-sm text-deep/70 uppercase tracking-wider font-semibold mb-2">{p.label}</p>
                    <p className="text-3xl font-bold text-deep mb-4">{p.price}<span className="text-base text-deep/70 font-normal">/mes</span></p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(p.label, p.price)}
                      className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      <FaShoppingCart />
                      Agregar al Carrito
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Malla Curricular */}
          {carrera.mallaCurricular && carrera.mallaCurricular.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">Malla Curricular</h2>
              <div className="space-y-8">
                {carrera.mallaCurricular.map((year, yi) => (
                  <div key={yi}>
                    <h3 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm flex items-center justify-center">{yi + 1}</span>
                      {year.year}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {year.courses.map((course, ci) => (
                        <div key={ci} className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-primary/10 transition-colors">
                          <FaCheck className="text-primary mt-1 flex-shrink-0" />
                          <span className="text-deep text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {carrera.mallaCurricularImage && (
                <div className="mt-8 text-center">
                  <img src={carrera.mallaCurricularImage} alt="Malla Curricular" className="max-w-full rounded-xl shadow-lg mx-auto" />
                </div>
              )}
            </motion.div>
          )}

          {/* Campo Laboral */}
          {carrera.campoLaboral && carrera.campoLaboral.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">
                <FaBriefcase className="inline mr-2" />
                Campo Laboral
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carrera.campoLaboral.map((campo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ translateY: -5 }}
                    className="bg-gradient-to-br from-surface to-white rounded-xl p-6 border border-deep/10 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-deep mb-2">{campo.title}</h3>
                    <p className="text-deep/80 text-sm leading-relaxed">{campo.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features */}
          {carrera.features && carrera.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">Beneficios Institucionales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carrera.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-surface hover:bg-surface transition-colors"
                  >
                    <FaCheck className="text-primary text-xl mt-1 flex-shrink-0" />
                    <p className="text-deep">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Información del Programa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/30">
                <FaClock className="text-primary text-3xl mb-4" />
                <h3 className="font-bold text-deep mb-2">Duración</h3>
                <p className="text-deep">{carrera.duration}</p>
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
                <FaBook className="text-accent text-3xl mb-4" />
                <h3 className="font-bold text-deep mb-2">Modalidad</h3>
                <p className="text-deep">{carrera.modality}</p>
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-accent/10 to-cta/10 p-6 rounded-xl border border-accent/20">
                <FaCertificate className="text-accent text-3xl mb-4" />
                <h3 className="font-bold text-deep mb-2">Titulación</h3>
                <p className="text-deep">{carrera.titulacion || 'Título oficial MINEDU'}</p>
                {carrera.certification && (
                  <ul className="text-deep text-sm space-y-1 mt-2">
                    {carrera.certification.map((cert, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <FaCheck className="text-accent text-xs mt-1 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-cta/10 to-accent/10 p-6 rounded-xl border border-cta/20">
                <FaCalendar className="text-cta text-3xl mb-4" />
                <h3 className="font-bold text-deep mb-2">Horarios</h3>
                <p className="text-deep">Flexibles según modalidad</p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-dark rounded-xl p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              No esperes más para transformar tu futuro profesional. Contáctanos hoy mismo y únete a miles de profesionales formados en IDEMA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(carrera.whatsappMessage || 'Hola, me interesa esta carrera')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary font-bold rounded-full flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
                  <FaWhatsapp className="text-xl" /> Contactar por WhatsApp
                </motion.button>
              </a>
              <a href="/#contacto">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 border-2 border-white text-white font-bold rounded-full flex items-center gap-2 justify-center hover:bg-white/30 transition-all duration-300 w-full sm:w-auto">
                  <FaEnvelope className="text-xl" /> Solicitar Información
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
