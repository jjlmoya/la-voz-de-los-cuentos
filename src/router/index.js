const lang = import.meta.env.PUBLIC_LANG

const t = (es, en) => (lang === 'es' ? es : en)

const toStories = () => `/${t('cuentos', 'stories')}/`
const toStory = slug => `/${t('cuento', 'story')}/${slug}/`

const toCharacter = slug => `/${t('personaje', 'character')}/${slug}/`
const toCharacters = () => `/${t('personajes', 'characters')}/`

const toSagas = () => `/sagas/`
const toSaga = slug => `/saga/${slug}/`

const toNewsLetters = () => `/newsletters/`
const toNewsLetter = slug => `/newsletter/${slug}/`

const toAccount = () => `/${t('cuenta', 'account')}/`
const toAccountRead = () => `/${t('cuenta', 'account')}/${t('leidos', 'read')}/`
const toAccountPending = () => `/${t('cuenta', 'account')}/${t('pendientes', 'pending')}/`
const toAccountFavorites = () => `/${t('cuenta', 'account')}/${t('favoritos', 'favorites')}/`
const toAccountAchievements = () => `/${t('cuenta', 'account')}/${t('logros', 'achievements')}/`
const toCustomStory = () => t(`/personalizado/cuento/`, '/custom/story/')
const toLandingsPage = key => `/${t('listado', 'list')}/${key}/`
const toSongs = () => `/${t('canciones', 'songs')}/`
const toSong = slug => `/${t('cancion', 'song')}/${slug}/`

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
  toAccountRead,
  toAccountPending,
  toAccountFavorites,
  toAccountAchievements,
  toLandingsPage,
  toCharacters,
  toSongs,
  toSong
}
