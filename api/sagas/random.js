import { getSagas, enrichWithRelations } from '../../src/data/index.js';

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { lang } = req.query;
    const language = (lang === 'es' || lang === 'en') ? lang : undefined;

    const sagas = getSagas(language);
    const randomIndex = Math.floor(Math.random() * sagas.length);
    const randomSaga = sagas[randomIndex];

    const enrichedSaga = enrichWithRelations(randomSaga, 'saga', language);

    res.status(200).json(enrichedSaga);
  } catch (error) {
    res.status(500).json({ error: 'Error generating random saga' });
  }
}
