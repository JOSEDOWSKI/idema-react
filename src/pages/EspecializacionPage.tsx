import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaCheck, FaClock, FaBook, FaCertificate, FaCalendar, FaWhatsapp, FaEnvelope, FaBriefcase, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'
import { especializaciones } from '../data/especializaciones'
import { useCart } from '../context/CartContext'

export default function EspecializacionPage() {
  const { slug } = useParams<{ slug: string }>()
  const especializacion = especializaciones.find(e => e.slug === slug)
  const { addItem } = useCart()

  if (!especializacion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Especialización no encontrada</p>
          <Link to="/"><button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">Volver al Inicio</button></Link>
        </motion.div>
      </div>
    )
  }

  const prices = [
    especializacion.pricePresencial && { label: 'Presencial', price: especializacion.pricePresencial },
    especializacion.priceSemipresencial && { label: 'Semipresencial', price: especializacion.priceSemipresencial },
    especializacion.priceVirtual && { label: 'Virtual', price: especializacion.priceVirtual },
    especializacion.price && !especializacion.pricePresencial && !especializacion.priceVirtual && { label: 'Mensualidad', price: especializacion.price },
  ].filter(Boolean) as { label: string; price: string }[]

  const handleAddToCart = (modality?: string, price?: string) => {
    const numPrice = price ? parseInt(price.replace(/[^0-9]/g, ''), 10) : 0
    addItem(especializacion, numPrice, modality)
  }

  return (
    <>
      <Helmet>
        <title>{especializacion.title} - Instituto IDEMA</title>
        <meta name="description" content={especializacion.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${especializacion.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative h-full flex flex-col justify-end p-6 md:p-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{especializacion.title}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{especializacion.duration} • {especializacion.modality}</p>
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-cyan-600">Inicio</Link>
          <span>/</span>
          <Link to="/#especializaciones" className="hover:text-cyan-600">Especializaciones</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{especializacion.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Descripción del Programa</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{especializacion.description}</p>
          </motion.div>

          {/* Prices & Add to Cart */}
          {prices.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 gradient-text"><FaMoneyBillWave className="inline mr-2" />Inversión</h2>
              {especializacion.matricula && <p className="text-gray-600 mb-6">Matrícula: <span className="font-bold text-cyan-600">{especializacion.matricula}</span></p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {prices.map(p => (
                  <motion.div key={p.label} whileHover={{ translateY: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-cyan-300 transition-all text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">{p.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{p.price}</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddToCart(p.label, p.price)}
                      className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                      <FaShoppingCart /> Agregar al Carrito
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Malla Curricular */}
          {especializacion.mallaCurricular && especializacion.mallaCurricular.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 gradient-text">Plan de Estudios</h2>
              <div className="space-y-8">
                {especializacion.mallaCurricular.map((period, yi) => (
                  <div key={yi}>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm flex items-center justify-center">{yi + 1}</span>
                      {period.year}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {period.courses.map((course, ci) => (
                        <div key={ci} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-cyan-50 transition-colors">
                          <FaCheck className="text-cyan-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Campo Laboral */}
          {especializacion.campoLaboral && especializacion.campoLaboral.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 gradient-text"><FaBriefcase className="inline mr-2" />Campo Laboral</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {especializacion.campoLaboral.map((campo, i) => (
                  <motion.div key={i} whileHover={{ translateY: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all">
                    <h3 className="font-bold text-gray-800 mb-2">{campo.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{campo.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features */}
          {especializacion.features && especializacion.features.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 gradient-text">Beneficios Institucionales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {especializacion.features.map((feature, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <FaCheck className="text-cyan-500 text-xl mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Información del Programa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
                <FaClock className="text-cyan-600 text-3xl mb-4" /><h3 className="font-bold text-gray-800 mb-2">Duración</h3><p className="text-gray-700">{especializacion.duration}</p>
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <FaBook className="text-blue-600 text-3xl mb-4" /><h3 className="font-bold text-gray-800 mb-2">Modalidad</h3><p className="text-gray-700">{especializacion.modality}</p>
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <FaCertificate className="text-purple-600 text-3xl mb-4" /><h3 className="font-bold text-gray-800 mb-2">Certificación</h3><p className="text-gray-700">Diploma de especialización MINEDU</p>
              </motion.div>
              <motion.div whileHover={{ translateY: -10 }} className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-xl border border-pink-200">
                <FaCalendar className="text-pink-600 text-3xl mb-4" /><h3 className="font-bold text-gray-800 mb-2">Horarios</h3><p className="text-gray-700">Flexibles según tu disponibilidad</p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para especializarte?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">Profundiza tus conocimientos profesionales. Contáctanos hoy mismo.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/?text=${encodeURIComponent(especializacion.whatsappMessage || 'Hola, me interesa esta especialización')}`} target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-full flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
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
