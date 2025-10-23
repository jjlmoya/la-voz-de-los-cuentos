/**
 * Image Optimization Helpers
 * Funciones para manejar responsive images y lazy loading
 */

/**
 * Genera el srcset para imágenes responsivas
 * @param {string} basePath - Ruta base sin extensión (ej: '/assets/custom/welcome-hero')
 * @param {Array} sizes - Tamaños disponibles (ej: [600, 900, 1200])
 * @returns {string} srcset completo
 */
export const generateSrcSet = (basePath, sizes = [600, 900, 1200]) => {
  return sizes
    .map((size) => `${basePath}-${size}.webp ${size}w`)
    .join(', ')
}

/**
 * Genera el sizes para responsive images
 * @param {Array} breakpoints - Array con objetos {width, vw, px}
 * @returns {string} sizes completo
 */
export const generateSizes = (breakpoints = [
  { width: 768, query: '(max-width: 768px)', size: '600px' },
  { width: 1200, query: '(max-width: 1200px)', size: '900px' },
  { size: '1200px' }
]) => {
  return breakpoints
    .map((bp) => (bp.query ? `${bp.query} ${bp.size}` : bp.size))
    .join(', ')
}

/**
 * Crea un objeto con props para imágenes responsivas
 * @param {string} basePath - Ruta base
 * @param {string} alt - Texto alt
 * @param {Object} options - Opciones adicionales
 * @returns {Object}
 */
export const createResponsiveImageProps = (
  basePath,
  alt = '',
  options = {}
) => {
  const {
    sizes: customSizes,
    breakpoints = [600, 900, 1200],
    loading = 'lazy',
    decoding = 'async'
  } = options

  return {
    srcset: generateSrcSet(basePath, breakpoints),
    sizes: customSizes || generateSizes(),
    src: `${basePath}-1200.webp`,
    alt,
    loading,
    decoding
  }
}

/**
 * Calcula el tamaño óptimo de la imagen según viewport
 * @param {number} width - Ancho del viewport
 * @returns {number} Tamaño recomendado
 */
export const getOptimalImageSize = (width) => {
  if (width <= 768) return 600
  if (width <= 1200) return 900
  return 1200
}

/**
 * Precarga imágenes críticas (hero)
 * @param {string} basePath - Ruta base
 */
export const preloadImage = (basePath) => {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = `${basePath}-1200.webp`
  link.imagesrcset = generateSrcSet(basePath)
  link.imagesizes = generateSizes()
  document.head.appendChild(link)
}

/**
 * Fallback para navegadores que no soportan WebP
 * @param {string} basePath - Ruta base
 * @returns {string} URL con fallback a JPG
 */
export const getFallbackImage = (basePath) => {
  // Verificar soporte WebP
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const supportsWebP = canvas.toDataURL('image/webp').includes('webp')

  return supportsWebP ? `${basePath}-1200.webp` : `${basePath}-1200.jpg`
}

/**
 * Crea un elemento picture con múltiples fuentes
 * @param {string} basePath - Ruta base
 * @param {string} alt - Texto alt
 * @returns {string} HTML del elemento picture
 */
export const createPictureHTML = (basePath, alt = '') => {
  return `
    <picture>
      <source
        srcset="${generateSrcSet(basePath, [600, 900, 1200])}"
        sizes="${generateSizes()}"
        type="image/webp"
      />
      <img
        src="${basePath}-1200.jpg"
        alt="${alt}"
        loading="lazy"
        decoding="async"
      />
    </picture>
  `
}
