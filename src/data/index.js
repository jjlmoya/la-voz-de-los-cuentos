const lang = import.meta.env?.PUBLIC_LANG || 'es'
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

// Enrich entities with related data
export const enrichWithRelations = (item, type, language = lang) => {
  if (!item) return null

  const enriched = { ...item }
  const stories = getStories(language)
  const sagas = getSagas(language)
  const characters = getCharacters(language)
  const songs = getSongs(language)

  switch (type) {
    case 'story':
      // Add saga object if story belongs to a saga
      if (item.saga) {
        enriched.sagaData = sagas.find(s => s.key === item.saga) || null

        // Add related characters from same saga
        enriched.relatedCharacters = characters.filter(c => c.saga === item.saga)

        // Add related songs from same saga
        enriched.relatedSongs = songs.filter(s => s.saga === item.saga)
      }

      // Check if story has a song
      enriched.hasSong = !!(item.song && item.song.trim() !== '')
      if (enriched.hasSong) {
        enriched.songData = songs.find(s => s.song === item.song) || null
      }
      break

    case 'saga':
      // Add all stories from this saga
      enriched.stories = stories
        .filter(s => s.saga === item.key)
        .sort((a, b) => parseInt(a.order) - parseInt(b.order))
      enriched.storiesCount = enriched.stories.length

      // Add all characters from this saga
      enriched.characters = characters.filter(c => c.saga === item.key)
      enriched.charactersCount = enriched.characters.length

      // Add all songs from this saga
      enriched.songs = songs.filter(s => s.saga === item.key)
      enriched.songsCount = enriched.songs.length
      break

    case 'character':
      // Add saga object if character belongs to a saga
      if (item.saga) {
        enriched.sagaData = sagas.find(s => s.key === item.saga) || null

        // Add stories from same saga
        enriched.stories = stories.filter(s => s.saga === item.saga)
        enriched.storiesCount = enriched.stories.length

        // Add related characters from same saga
        enriched.relatedCharacters = characters.filter(c => c.saga === item.saga && c.key !== item.key)

        // Add songs from same saga
        enriched.songs = songs.filter(s => s.saga === item.saga)
      }
      break

    case 'song':
      // Add saga object if song belongs to a saga
      if (item.saga) {
        enriched.sagaData = sagas.find(s => s.key === item.saga) || null

        // Add related stories from same saga
        enriched.relatedStories = stories.filter(s => s.saga === item.saga)
        enriched.storiesCount = enriched.relatedStories.length

        // Add characters from same saga
        enriched.characters = characters.filter(c => c.saga === item.saga)
      }

      // Find specific story that has this song
      if (item.song) {
        enriched.storyWithSong = stories.find(s => s.song === item.song) || null
      }
      break
  }

  return enriched
}
