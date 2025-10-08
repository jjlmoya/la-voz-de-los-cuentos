import { getLandings } from '../../src/data/index.js';

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { lang } = req.query;
    const language = (lang === 'es' || lang === 'en') ? lang : undefined;

    const landings = getLandings(language);
    const randomIndex = Math.floor(Math.random() * landings.length);
    const randomLanding = landings[randomIndex];

    res.status(200).json(randomLanding);
  } catch (error) {
    console.error('Error generating random landing:', error);
    res.status(500).json({ error: 'Error generating random landing' });
  }
}
