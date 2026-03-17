import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const CarreraPage = lazy(() => import('./pages/CarreraPage'))
const CursoPage = lazy(() => import('./pages/CursoPage'))
const EspecializacionPage = lazy(() => import('./pages/EspecializacionPage'))
const AuxiliarPage = lazy(() => import('./pages/AuxiliarPage'))
const NosotrosPage = lazy(() => import('./pages/NosotrosPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const TestimoniosPage = lazy(() => import('./pages/TestimoniosPage'))
const FranquiciatePage = lazy(() => import('./pages/FranquiciatePage'))
const InvestigacionPage = lazy(() => import('./pages/InvestigacionPage'))
const ServicioPage = lazy(() => import('./pages/ServicioPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const LibroReclamacionesPage = lazy(() => import('./pages/LibroReclamacionesPage'))
const EliminarCuentaPage = lazy(() => import('./pages/EliminarCuentaPage'))
const CursosGratisPage = lazy(() => import('./pages/CursosGratisPage'))
const IdemaEducaPage = lazy(() => import('./pages/IdemaEducaPage'))
const OrientacionVocacionalPage = lazy(() => import('./pages/OrientacionVocacionalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Carreras */}
          <Route path="carreras/:slug" element={<CarreraPage />} />
          {/* Auxiliares */}
          <Route path="auxiliares/:slug" element={<AuxiliarPage />} />
          {/* Especializaciones */}
          <Route path="especializaciones/:slug" element={<EspecializacionPage />} />
          {/* Cursos */}
          <Route path="cursos/:slug" element={<CursoPage />} />
          {/* Servicios */}
          <Route path="servicios/:slug" element={<ServicioPage />} />
          {/* Institucional */}
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="cursos-gratis" element={<CursosGratisPage />} />
          <Route path="idema-educa" element={<IdemaEducaPage />} />
          <Route path="orientacion-vocacional" element={<OrientacionVocacionalPage />} />
          {/* Info pages */}
          <Route path="faq" element={<FAQPage />} />
          <Route path="testimonios" element={<TestimoniosPage />} />
          <Route path="franquiciate" element={<FranquiciatePage />} />
          <Route path="investigacion" element={<InvestigacionPage />} />
          {/* Legal */}
          <Route path="politica-privacidad" element={<LegalPage />} />
          <Route path="terminos-y-condiciones" element={<LegalPage />} />
          <Route path="libro-reclamaciones" element={<LibroReclamacionesPage />} />
          <Route path="eliminar-cuenta" element={<EliminarCuentaPage />} />
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
