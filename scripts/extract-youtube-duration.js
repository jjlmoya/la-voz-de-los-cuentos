import youtubedl from 'youtube-dl-exec'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LANGS = ['es', 'en']
const SONGS_FILE = (lang) =>
  path.join(__dirname, `../src/data/${lang}/songs.json`)
const DURATIONS_CACHE = path.join(__dirname, `../src/data/song-durations.json`)

let durationCache = {}

function loadDurationCache() {
  try {
    if (fs.existsSync(DURATIONS_CACHE)) {
      durationCache = JSON.parse(fs.readFileSync(DURATIONS_CACHE, 'utf-8'))
    }
  } catch (error) {
    console.warn('Could not load duration cache:', error.message)
    durationCache = {}
  }
}

function saveDurationCache() {
  fs.writeFileSync(DURATIONS_CACHE, JSON.stringify(durationCache, null, 2))
}

async function extractDuration(videoUrl) {
  // Verificar si ya está en caché
  if (durationCache[videoUrl]) {
    console.log(`📦 Cache hit for ${videoUrl}: ${durationCache[videoUrl]}s`)
    return durationCache[videoUrl]
  }

  try {
    console.log(`🔍 Fetching duration for ${videoUrl}...`)
    const info = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noWarnings: true
    })
    const duration = Math.round(info.duration) || 0

    // Guardar en caché
    durationCache[videoUrl] = duration
    saveDurationCache()

    return duration
  } catch (error) {
    console.error(`Error extracting duration from ${videoUrl}:`, error.message)
    return 0
  }
}

async function updateSongsWithDuration() {
  loadDurationCache()
  console.log(`📦 Loaded duration cache with ${Object.keys(durationCache).length} entries`)

  for (const lang of LANGS) {
    const filePath = SONGS_FILE(lang)

    console.log(`\n📖 Processing ${lang}/songs.json...`)

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    let updated = 0
    let skipped = 0

    for (let i = 0; i < data.length; i++) {
      const song = data[i]

      if (!song.song) {
        console.log(`⏭️  Skipping ${song.name} (no YouTube URL)`)
        skipped++
        continue
      }

      // Si ya tiene duración, no hacer nada
      if (song.duration && song.duration > 0) {
        console.log(`⏭️  Skipping ${song.name} (already has duration: ${song.duration}s)`)
        skipped++
        continue
      }

      console.log(
        `⏳ Fetching: ${song.name} (${i + 1}/${data.length})`
      )

      const duration = await extractDuration(song.song)

      if (duration > 0) {
        song.duration = duration
        updated++
        console.log(`✅ ${song.name}: ${duration}s (${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s)`)
      } else {
        console.log(`⚠️  Failed to extract duration for ${song.name}`)
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Save updated JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log(`\n✨ ${lang}/songs.json: ${updated} updated, ${skipped} skipped`)
  }
}

updateSongsWithDuration().catch(console.error)
