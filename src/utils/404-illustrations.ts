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

/**
 * Get a random illustration from the available set
 * Uses a seeded approach based on current date to provide consistency within a day
 */
export function getRandomIllustration(): Illustration {
  // Get available illustrations (excluding optional ones if needed)
  const available = illustrations

  // Use a pseudo-random approach that varies by hour
  // This gives users variety while maintaining consistency across page reloads within the same hour
  const now = new Date()
  const seed = now.getHours() + now.getDate() + Math.random()

  const index = Math.floor((seed * 1000) % available.length)
  return available[index]
}

/**
 * Get illustration URL
 */
export function getIllustrationUrl(filename: string): string {
  return `/assets/illustrations/404/${filename}`
}

/**
 * Get the fallback illustration (placeholder)
 */
export function getFallbackIllustrationUrl(): string {
  return `/assets/illustrations/404/placeholder.svg`
}
