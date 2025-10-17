import es from './es/index.js'
import en from './en/index.js'

const translations = {
  es,
  en
}

export default function t(key) {
  const lang = import.meta.env.PUBLIC_LANG || 'es'

  try {
    const translation = translations[lang]?.[key]
    if (!translation) {
      return key
    }
    return translation
  } catch (e) {
    return key
  }
}
