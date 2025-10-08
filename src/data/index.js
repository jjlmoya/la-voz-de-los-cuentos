const lang = import.meta.env.PUBLIC_LANG
import storiesEn from './en/stories.json' assert { type: 'json' }
import sagasEn from './en/sagas.json' assert { type: 'json' }
import charactersEn from './en/characters.json' assert { type: 'json' }
import newslettersEn from './en/newsletters.json' assert { type: 'json' }
import landingsEn from './en/landings.json' assert { type: 'json' }

import storiesEs from './es/stories.json' assert { type: 'json' }
import sagasEs from './es/sagas.json' assert { type: 'json' }
import charactersEs from './es/characters.json' assert { type: 'json' }
import newslettersEs from './es/newsletters.json' assert { type: 'json' }
import landingsEs from './es/landings.json' assert { type: 'json' }

const map = {
  es: {
    stories: storiesEs,
    sagas: sagasEs,
    characters: charactersEs,
    newsletters: newslettersEs,
    landings: landingsEs
  },
  en: {
    stories: storiesEn,
    sagas: sagasEn,
    characters: charactersEn,
    newsletters: newslettersEn,
    landings: landingsEn
  }
}

export const getSagas = () => map[lang].sagas
export const getStories = () => map[lang].stories
export const getNewsLetters = () => map[lang].newsletters
export const getCharacters = () => map[lang].characters
export const getLandings = () => map[lang].landings
