import { getStories } from '../../src/data/index.js';

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { lang } = req.query;
    const language = (lang === 'es' || lang === 'en') ? lang : undefined;

    const stories = getStories(language);
    const randomIndex = Math.floor(Math.random() * stories.length);
    const randomStory = stories[randomIndex];

    res.status(200).json(randomStory);
  } catch (error) {
    console.error('Error generating random story:', error);
    res.status(500).json({ error: 'Error generating random story' });
  }
}
