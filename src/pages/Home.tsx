import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import CarrerasSection from '../components/home/CarrerasSection'
import AuxiliaresSection from '../components/home/AuxiliaresSection'
import EspecializacionesSection from '../components/home/EspecializacionesSection'
import CursosSection from '../components/home/CursosSection'
import ValuesSection from '../components/home/ValuesSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CompaniesSection from '../components/home/CompaniesSection'
import ContactSection from '../components/home/ContactSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Instituto IDEMA - Transformando la Educación</title>
        <meta name="description" content="Instituto Superior Tecnológico IDEMA - Carreras técnicas, cursos y especializaciones en Arequipa, Perú. +30 años de experiencia educativa." />
      </Helmet>
      <Hero />
      <Features />
      <CarrerasSection />
      <AuxiliaresSection />
      <EspecializacionesSection />
      <CursosSection />
      <ValuesSection />
      <TestimonialsSection />
      <CompaniesSection />
      <ContactSection />
    </>
  )
}
