import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaCheck, FaClock, FaBook, FaCertificate, FaCalendar, FaWhatsapp, FaEnvelope, FaCreditCard, FaShieldAlt, FaShoppingCart } from 'react-icons/fa'
import { cursos } from '../data/cursos'
import { useCulqi } from '../hooks/useCulqi'
import { useCart } from '../context/CartContext'

export default function CursoPage() {
  const { slug } = useParams<{ slug: string }>()
  const curso = cursos.find(c => c.slug === slug)
  const { openCheckout } = useCulqi()
  const { addItem } = useCart()

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#10323F] to-[#2E136E]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Curso no encontrado</p>
          <Link to="/">
            <button className="px-8 py-3 bg-gradient-to-r from-[#00AFF0] to-[#572364] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#00AFF0]/50 transition-all duration-300 hover:scale-105">
              Volver al Inicio
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // Parse price to cents for Culqi (e.g., "S/.150" -> 15000)
  const priceNumber = curso.price ? parseInt(curso.price.replace(/[^0-9]/g, ''), 10) : 0
  const priceCents = priceNumber * 100

  const handlePayment = () => {
    if (!priceCents) return
    openCheckout({
      title: curso.title,
      amount: priceCents,
      description: `Curso: ${curso.title} - ${curso.duration}`,
      onSuccess: (token) => {
        // In production, send token.id to your backend to create the charge
        console.log('Payment token received:', token.id)
      },
    })
  }

  return (
    <>
      <Helmet>
        <title>{curso.title} - Instituto IDEMA</title>
        <meta name="description" content={curso.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${curso.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-full flex flex-col justify-end p-6 md:p-12 text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{curso.title}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{curso.duration}</p>
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#00AFF0]">Inicio</Link>
          <span>/</span>
          <Link to="/#cursos" className="hover:text-[#00AFF0]">Cursos</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{curso.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Course content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6 gradient-text">Descripción del Curso</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{curso.description}</p>
              </motion.div>

              {/* Features Grid */}
              {curso.features && curso.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold mb-8 gradient-text">Contenidos del Curso</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {curso.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <FaCheck className="text-[#00AFF0] text-xl mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{feature}</p>
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
                <h2 className="text-3xl font-bold mb-8 gradient-text">Información del Curso</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ translateY: -10 }}
                    className="bg-gradient-to-br from-[#00AFF0]/10 to-[#572364]/10 p-6 rounded-xl border border-[#00AFF0]/30"
                  >
                    <FaClock className="text-[#00AFF0] text-3xl mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Duración</h3>
                    <p className="text-gray-700">{curso.duration}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ translateY: -10 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200"
                  >
                    <FaBook className="text-[#572364] text-3xl mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Modalidad</h3>
                    <p className="text-gray-700">{curso.modality}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ translateY: -10 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
                  >
                    <FaCertificate className="text-purple-600 text-3xl mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Certificación</h3>
                    {curso.certification ? (
                      <ul className="text-gray-700 text-sm space-y-1">
                        {curso.certification.map((cert, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <FaCheck className="text-purple-500 text-xs mt-1 flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">Certificado oficial</p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ translateY: -10 }}
                    className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-xl border border-pink-200"
                  >
                    <FaCalendar className="text-pink-600 text-3xl mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Requisitos</h3>
                    {curso.requirements ? (
                      <ul className="text-gray-700 text-sm space-y-1">
                        {curso.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <FaCheck className="text-pink-500 text-xs mt-1 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">Flexibles y accesibles</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right: Payment sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-28"
              >
                {/* Price Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Price header */}
                  <div className="bg-gradient-to-r from-[#10323F] to-[#2E136E] p-6 text-center">
                    <p className="text-[#00AFF0] text-sm font-semibold uppercase tracking-wider mb-2">Precio del Curso</p>
                    <p className="text-4xl font-bold text-white">{curso.price || 'Consultar'}</p>
                    <p className="text-white/60 text-sm mt-1">Pago único</p>
                  </div>

                  {/* Payment actions */}
                  <div className="p-6 space-y-4">
                    {/* Culqi Pay Button */}
                    {priceCents > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayment}
                        className="w-full py-4 bg-gradient-to-r from-[#00AFF0] to-[#572364] text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00AFF0]/30 transition-all duration-300"
                      >
                        <FaCreditCard className="text-lg" />
                        Comprar Ahora
                      </motion.button>
                    )}

                    {/* Add to Cart */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addItem(curso, priceNumber)}
                      className="w-full py-3 border-2 border-[#00AFF0]/50 text-[#00AFF0] font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-[#00AFF0]/10 transition-all duration-300"
                    >
                      <FaShoppingCart className="text-lg" />
                      Agregar al Carrito
                    </motion.button>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(curso.whatsappMessage || 'Hola, me interesa este curso')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-[#25d366] text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                      >
                        <FaWhatsapp className="text-lg" />
                        Consultar por WhatsApp
                      </motion.button>
                    </a>

                    {/* Email */}
                    <a href="mailto:info@idema.edu.pe?subject=Consulta sobre curso" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-3 hover:border-[#00AFF0]/40 hover:text-[#00AFF0] transition-all duration-300"
                      >
                        <FaEnvelope className="text-lg" />
                        Solicitar Información
                      </motion.button>
                    </a>

                    {/* Security note */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 justify-center pt-2">
                      <FaShieldAlt />
                      <span>Pago seguro con Culqi</span>
                    </div>

                    {/* Includes */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <p className="text-sm font-bold text-gray-800 mb-3">Este curso incluye:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#00AFF0] flex-shrink-0" />
                          Acceso a plataforma virtual
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#00AFF0] flex-shrink-0" />
                          Material didáctico digital
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#00AFF0] flex-shrink-0" />
                          Certificado virtual incluido
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#00AFF0] flex-shrink-0" />
                          Certificación ISO 21001
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#00AFF0] flex-shrink-0" />
                          Soporte por WhatsApp
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
