import { getCharacters } from '../../src/data/index.js';

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { lang } = req.query;
    const language = (lang === 'es' || lang === 'en') ? lang : undefined;

    const characters = getCharacters(language);
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    res.status(200).json(randomCharacter);
  } catch (error) {
    console.error('Error generating random character:', error);
    res.status(500).json({ error: 'Error generating random character' });
  }
}
