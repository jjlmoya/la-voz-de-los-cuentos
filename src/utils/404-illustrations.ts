/**
 * Utility for managing 404 page illustration rotation
 */

interface Illustration {
  id: number;
  filename: string;
  name: string;
  optional?: boolean;
}

const illustrations: Illustration[] = [
  {
    id: 1,
    filename: 'lost-character-forest.webp',
    name: 'Personaje perdido en el bosque',
  },
  {
    id: 2,
    filename: 'broken-map-compass.webp',
    name: 'Mapa y brújula rotos',
  },
  {
    id: 3,
    filename: 'confused-signs.webp',
    name: 'Señales contradictorias',
    optional: true,
  },
]


export function getRandomIllustration(): Illustration {
  const available = illustrations

  const now = new Date()
  const seed = now.getHours() + now.getDate() + Math.random()

  const index = Math.floor((seed * 1000) % available.length)
  return available[index]
}

export function getIllustrationUrl(filename: string): string {
  return `/assets/illustrations/404/${filename}`
}

