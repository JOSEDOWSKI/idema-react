import { carreras } from './carreras'
import { auxiliares } from './auxiliares'
import { especializaciones } from './especializaciones'
import { cursos } from './cursos'

export interface ProgramCategory {
  key: string
  badge: string
  titulo: string
  descripcion: string
  imagen: string
  ruta: string
  cantidad: number
  imagenIzquierda: boolean
}

export const programCategories: ProgramCategory[] = [
  {
    key: 'carreras',
    badge: 'CARRERAS TÉCNICAS',
    titulo: 'Carreras Técnicas',
    descripcion:
      'Formación profesional de 3 años con título oficial reconocido por el MINEDU. Áreas de agropecuaria, salud y ciencias empresariales. Modalidades presencial, semipresencial y virtual para que estudies a tu ritmo.',
    imagen: '/assets/img/programs/carreras.png',
    ruta: '/programas?categoria=carrera',
    cantidad: carreras.length,
    imagenIzquierda: true,
  },
  {
    key: 'auxiliares',
    badge: 'PROGRAMAS AUXILIARES',
    titulo: 'Programas Auxiliares',
    descripcion:
      'Formación corta e intensiva de 10 meses, ideal para insertarte rápidamente al mercado laboral. Certificado reconocido por MINEDU con modalidad 100% virtual y horarios completamente flexibles.',
    imagen: '/assets/img/programs/auxiliares.png',
    ruta: '/programas?categoria=auxiliar',
    cantidad: auxiliares.length,
    imagenIzquierda: false,
  },
  {
    key: 'especializaciones',
    badge: 'ESPECIALIZACIONES',
    titulo: 'Especializaciones',
    descripcion:
      'Profundización en un área específica para profesionales que ya cuentan con base técnica. Potencia tus habilidades y amplía tu empleabilidad con programas diseñados para el mercado actual.',
    imagen: '/assets/img/programs/especializaciones.png',
    ruta: '/programas?categoria=especializacion',
    cantidad: especializaciones.length,
    imagenIzquierda: true,
  },
  {
    key: 'cursos',
    badge: 'CURSOS CORTOS',
    titulo: 'Cursos Cortos',
    descripcion:
      'Capacitaciones puntuales con certificado de participación. Modalidad flexible, duración reducida y contenido práctico para quienes buscan actualizar conocimientos de forma rápida y efectiva.',
    imagen: '/assets/img/programs/cursos.png',
    ruta: '/programas?categoria=curso',
    cantidad: cursos.length,
    imagenIzquierda: false,
  },
]