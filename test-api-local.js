// Test script para probar los endpoints localmente
import { getStories, getSagas, getCharacters, getLandings, getSongs } from './src/data/index.js';

console.log('\n=== Testing API Endpoints Locally ===\n');

// Mock req y res
const createMockReq = (query = {}) => ({ query });
const createMockRes = () => {
  const res = {
    headers: {},
    statusCode: 200,
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log(JSON.stringify(data, null, 2));
      return this;
    }
  };
  return res;
};

// Test stories
console.log('--- Testing /api/stories/random (default lang) ---');
try {
  const stories = getStories();
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  console.log(`✓ Got random story: ${randomStory.name}`);
  console.log(`  Language: ${randomStory.name.includes('El') || randomStory.name.includes('La') ? 'es' : 'en'}\n`);
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test stories with lang=es
console.log('--- Testing /api/stories/random?lang=es ---');
try {
  const { enrichWithRelations } = await import('./src/data/index.js');
  const stories = getStories('es');
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  const enriched = enrichWithRelations(randomStory, 'story', 'es');
  console.log(`✓ Got random story: ${enriched.name}`);
  console.log(`  Has saga: ${!!enriched.sagaData}`);
  console.log(`  Has song: ${enriched.hasSong}`);
  console.log(`  Related characters: ${enriched.relatedCharacters?.length || 0}`);
  console.log(`  Related songs: ${enriched.relatedSongs?.length || 0}\n`);
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test stories with lang=en
console.log('--- Testing /api/stories/random?lang=en ---');
try {
  const stories = getStories('en');
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  console.log(`✓ Got random story: ${randomStory.name}`);
  console.log(`  Keys: ${Object.keys(randomStory).slice(0, 5).join(', ')}\n`);
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test sagas
console.log('--- Testing /api/sagas/random?lang=es ---');
try {
  const { enrichWithRelations } = await import('./src/data/index.js');
  const sagas = getSagas('es');
  const randomSaga = sagas[Math.floor(Math.random() * sagas.length)];
  const enriched = enrichWithRelations(randomSaga, 'saga', 'es');
  console.log(`✓ Got random saga: ${enriched.name}`);
  console.log(`  Stories: ${enriched.storiesCount}`);
  console.log(`  Characters: ${enriched.charactersCount}`);
  console.log(`  Songs: ${enriched.songsCount}\n`);
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test characters
console.log('--- Testing /api/characters/random?lang=es ---');
try {
  const { enrichWithRelations } = await import('./src/data/index.js');
  const characters = getCharacters('es');
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  const enriched = enrichWithRelations(randomCharacter, 'character', 'es');
  console.log(`✓ Got random character: ${enriched.name}`);
  console.log(`  Has saga: ${!!enriched.sagaData}`);
  console.log(`  Stories: ${enriched.storiesCount || 0}`);
  console.log(`  Related characters: ${enriched.relatedCharacters?.length || 0}`);
  console.log(`  Songs: ${enriched.songs?.length || 0}\n`);
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test landings
console.log('--- Testing /api/landings/random?lang=es ---');
try {
  const landings = getLandings('es');
  if (landings.length > 0) {
    const randomLanding = landings[Math.floor(Math.random() * landings.length)];
    console.log(`✓ Got random landing: ${randomLanding.title}`);
    console.log(`  Keys: ${Object.keys(randomLanding).slice(0, 5).join(', ')}\n`);
  } else {
    console.log('⚠ No landings available\n');
  }
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test songs
console.log('--- Testing /api/songs/random?lang=es ---');
try {
  const { enrichWithRelations } = await import('./src/data/index.js');
  const songs = getSongs('es');
  if (songs.length > 0) {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const enriched = enrichWithRelations(randomSong, 'song', 'es');
    console.log(`✓ Got random song: ${enriched.name}`);
    console.log(`  Has saga: ${!!enriched.sagaData}`);
    console.log(`  Related stories: ${enriched.storiesCount || 0}`);
    console.log(`  Characters: ${enriched.characters?.length || 0}`);
    console.log(`  Story with song: ${!!enriched.storyWithSong}\n`);
  } else {
    console.log('⚠ No songs available\n');
  }
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

// Test songs with lang=en
console.log('--- Testing /api/songs/random?lang=en ---');
try {
  const { enrichWithRelations } = await import('./src/data/index.js');
  const songs = getSongs('en');
  if (songs.length > 0) {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const enriched = enrichWithRelations(randomSong, 'song', 'en');
    console.log(`✓ Got random song: ${enriched.name}`);
    console.log(`  Has saga: ${!!enriched.sagaData}`);
    console.log(`  Related stories: ${enriched.storiesCount || 0}`);
    console.log(`  Characters: ${enriched.characters?.length || 0}`);
    console.log(`  Story with song: ${!!enriched.storyWithSong}\n`);
  } else {
    console.log('⚠ No songs available\n');
  }
} catch (error) {
  console.error('✗ Error:', error.message, '\n');
}

console.log('=== Tests Complete ===\n');
