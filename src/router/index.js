const lang = import.meta.env.PUBLIC_LANG
const toStories = () => `/${lang === 'es' ? 'cuentos' : 'stories'}/`
const toStory = slug => `/${lang === 'es' ? 'cuento' : 'story'}/${slug}/`

const toCharacter = slug =>
  `/${lang === 'es' ? 'personaje' : 'character'}/${slug}/`
const toCharacters = () =>
  `/${lang === 'es' ? 'personajes' : 'characters'}/`

const toSagas = () => `/sagas/`
const toSaga = slug => `/saga/${slug}/`

const toNewsLetters = () => `/newsletters/`
const toNewsLetter = slug => `/newsletter/${slug}/`

const toAccount = () => `/${lang === 'es' ? 'cuenta' : 'account'}/`
const toCustomStory = () =>
  lang === 'es' ? `/personalizado/cuento/` : '/custom/story/'
const toLandingsPage = key =>
  lang === 'en' ? `/list/${key}/` : `/listado/${key}/`
export {
  toStories,
  toStory,
  toSaga,
  toSagas,
  toNewsLetter,
  toNewsLetters,
  toCustomStory,
  toCharacter,
  toAccount,
  toLandingsPage,
  toCharacters
}
