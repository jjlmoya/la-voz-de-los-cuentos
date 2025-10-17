import es from './es/index.js'
import en from './en/index.js'

const translations = {
  es,
  en
}

export default function t(key) {
  // Leer el idioma de forma reactiva en tiempo de ejecución
  const lang = import.meta.env.PUBLIC_LANG || 'es'

  try {
    const translation = translations[lang]?.[key]
    if (!translation) {
      console.warn(`Missing translation key: ${lang}-${key}`)
      return key
    }
    return translation
  } catch (e) {
    console.error(`Translation error for key: ${lang}-${key}`, e)
    return key
  }
}
