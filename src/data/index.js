const lang = import.meta.env.PUBLIC_LANG || 'es'
import storiesEn from './en/stories.json' with { type: 'json' }
import sagasEn from './en/sagas.json' with { type: 'json' }
import charactersEn from './en/characters.json' with { type: 'json' }
import newslettersEn from './en/newsletters.json' with { type: 'json' }
import landingsEn from './en/landings.json' with { type: 'json' }
import songsEn from './en/songs.json' with { type: 'json' }

import storiesEs from './es/stories.json' with { type: 'json' }
import sagasEs from './es/sagas.json' with { type: 'json' }
import charactersEs from './es/characters.json' with { type: 'json' }
import newslettersEs from './es/newsletters.json' with { type: 'json' }
import landingsEs from './es/landings.json' with { type: 'json' }
import songsEs from './es/songs.json' with { type: 'json' }

const map = {
  es: {
    stories: storiesEs,
    sagas: sagasEs,
    characters: charactersEs,
    newsletters: newslettersEs,
    landings: landingsEs,
    songs: songsEs
  },
  en: {
    stories: storiesEn,
    sagas: sagasEn,
    characters: charactersEn,
    newsletters: newslettersEn,
    landings: landingsEn,
    songs: songsEn
  }
}

export const getSagas = (language = lang) => map[language]?.sagas || map[lang].sagas
export const getStories = (language = lang) => map[language]?.stories || map[lang].stories
export const getNewsLetters = (language = lang) => map[language]?.newsletters || map[lang].newsletters
export const getCharacters = (language = lang) => map[language]?.characters || map[lang].characters
export const getLandings = (language = lang) => map[language]?.landings || map[lang].landings
export const getSongs = (language = lang) => map[language]?.songs || map[lang].songs
