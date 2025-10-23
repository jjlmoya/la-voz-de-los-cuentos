/**
 * Script para crear ilustraciones placeholder en WebP
 * Ejecutar: node scripts/create-placeholder-illustrations.js
 */

const fs = require('fs')
const path = require('path')

const illustrations = [
  { name: 'welcome-hero', sizes: [600, 900, 1200] },
  { name: 'character-waiting', sizes: [600, 900, 1200] },
  { name: 'character-alive', sizes: [600, 900, 1200] },
  { name: 'magic-book-writing', sizes: [600, 900, 1200] },
  { name: 'owl-messenger', sizes: [600, 900, 1200] },
  { name: 'treasure-newsletter', sizes: [600, 900, 1200] },
  { name: 'share-magic', sizes: [600, 900, 1200] },
  { name: 'share-success', sizes: [600, 900, 1200] },
  { name: 'magic-in-progress', sizes: [600, 900, 1200] },
  { name: 'success-celebration', sizes: [600, 900, 1200] }
]

const customDir = path.join(__dirname, '../public/assets/custom')

// Crear directorio si no existe
if (!fs.existsSync(customDir)) {
  fs.mkdirSync(customDir, { recursive: true })
  console.log(`✓ Creado directorio: ${customDir}`)
}

// Crear archivos placeholder (1x1 WebP gris)
const placeholderWebP = Buffer.from([
  0x52, 0x49, 0x46, 0x46, 0x1a, 0x00, 0x00, 0x00,
  0x57, 0x45, 0x42, 0x50, 0x56, 0x50, 0x38, 0x4c,
  0x0d, 0x00, 0x00, 0x00, 0x2f, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

let createdCount = 0

illustrations.forEach((illust) => {
  illust.sizes.forEach((size) => {
    const filename = `${illust.name}-${size}.webp`
    const filepath = path.join(customDir, filename)

    // Crear archivo placeholder
    fs.writeFileSync(filepath, placeholderWebP)
    createdCount++
    console.log(`✓ Creado: ${filename}`)
  })
})

console.log(`\n✅ Se crearon ${createdCount} archivos placeholder`)
console.log(`📁 Ubicación: ${customDir}`)
console.log(`\n⚠️  IMPORTANTE: Estos son placeholders vacíos.`)
console.log(`   Reemplaza con ilustraciones reales siguiendo:`)
console.log(`   CUSTOM_STORY_ILLUSTRATIONS.md`)
