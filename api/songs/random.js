import { getSongs, enrichWithRelations } from '../../src/data/index.js';

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { lang } = req.query;
    const language = (lang === 'es' || lang === 'en') ? lang : undefined;

    const songs = getSongs(language);
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    const enrichedSong = enrichWithRelations(randomSong, 'song', language);

    res.status(200).json(enrichedSong);
  } catch (error) {
    console.error('Error generating random song:', error);
    res.status(500).json({ error: 'Error generating random song' });
  }
}
