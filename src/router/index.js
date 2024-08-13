const lang = import.meta.env.PUBLIC_LANG;
const toStories = () => `/${lang === 'es' ? 'cuentos' : 'stories'}/`
const toStory = (slug) => `/${lang === 'es' ? 'cuento' : 'story'}/${slug}/`

const toSagas = () => `/sagas/`
const toSaga = (slug) => `/saga/${slug}/`

const toNewsLetters = () => `/newsletters/`
const toNewsLetter = (slug) => `/newsletter/${slug}/`

const toCustomStory = () => lang === 'es' ? `/personalizado/cuento/` : '/custom/story/'

export {
    toStories,
    toStory,
    toSaga,
    toSagas,
    toNewsLetter,
    toNewsLetters,
    toCustomStory
}