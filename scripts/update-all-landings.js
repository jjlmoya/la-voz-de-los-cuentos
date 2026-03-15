#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read stories
const esStoriesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/es/stories.json'), 'utf8'));
const enStoriesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/en/stories.json'), 'utf8'));

// Map ES to EN stories
const storyMap = {};
esStoriesJson.forEach(story => {
  const engStory = enStoriesJson.find(en =>
    en.name.toLowerCase() === story.name.toLowerCase()
  );
  if (engStory) {
    storyMap[story.key] = engStory.key;
  }
});

function getStoriesByKeywords(stories, keywords) {
  if (!keywords || keywords.length === 0) return [];
  return stories.filter(story => {
    const searchText = `${story.name} ${story.story || ''}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  }).slice(0, 6);
}

function createContentBlocks(landing, stories, lang) {
  const blocks = [];

  // Intro text
  blocks.push({
    type: 'text',
    body: `<p>${landing.description.split('\n')[0].replace(/<[^>]*>/g, '')}</p>`
  });

  // Add story recommendations (first 3 stories)
  const variants = ['primary', 'secondary', 'success'];
  stories.slice(0, 3).forEach((story, idx) => {
    blocks.push({
      type: 'story_recommendation',
      slug: story.key,
      title: story.name,
      description: (story.story || '').substring(0, 100) + '...',
      duration: story.time ? Math.round(parseFloat(story.time)) : 10,
      variant: variants[idx % 3],
      label: lang === 'es' ? 'Escucha ahora' : 'Listen now'
    });
  });

  // Middle text
  blocks.push({
    type: 'text',
    body: `<p>Descubre cómo estas historias pueden transformar cada momento compartido con los niños.</p>`
  });

  // Final stories gallery
  blocks.push({
    type: 'stories_gallery',
    stories: stories.slice(3),
    title: lang === 'es' ? 'Más historias para explorar' : 'More stories to explore',
    subtitle: lang === 'es' ? 'Una colección completa llena de aventuras' : 'A complete collection full of adventures'
  });

  return blocks;
}

// Process all Spanish landings
const esLandingsDir = path.join(__dirname, '../src/data/landings/es');
const enLandingsDir = path.join(__dirname, '../src/data/landings/en');

const esFiles = fs.readdirSync(esLandingsDir).filter(f => f.endsWith('.ts'));

console.log(`Processing ${esFiles.length} Spanish landings...`);

const updatedEsLandings = [];
const newEnLandings = [];

esFiles.forEach(file => {
  const esFilePath = path.join(esLandingsDir, file);
  let esContent = fs.readFileSync(esFilePath, 'utf8');

  // Extract and parse landing object
  const match = esContent.match(/export const landing = ({\s*[\s\S]*?^\})/m);
  if (!match) {
    console.log(`SKIP: Could not parse ${file}`);
    return;
  }

  try {
    // Use eval carefully (only for this script)
    const landing = eval(`(${match[1]})`);

    // Get matching stories
    const matchingStories = getStoriesByKeywords(esStoriesJson, landing.keywords);
    console.log(`${file}: Found ${matchingStories.length} stories`);

    // Create content blocks
    const contentBlocks = createContentBlocks(landing, matchingStories, 'es');
    landing.content = contentBlocks;

    // Update ES landing file
    const newEsContent = `export const landing = ${JSON.stringify(landing, null, 2)}\n`;
    fs.writeFileSync(esFilePath, newEsContent);
    updatedEsLandings.push(landing);

    // Create English version if doesn't exist
    const enFilePath = path.join(enLandingsDir, `${landing.keyEn}.ts`);
    const enFileExists = fs.existsSync(enFilePath);

    if (!enFileExists) {
      // Translate-like structure for EN landing
      const enLanding = {
        ...landing,
        key: landing.keyEn,
        title: landing.title, // Keep same for now
        keyword: landing.keyword,
        keywords: landing.keywords,
        description: landing.description, // Keep same for now - user will edit
        content: null // Will create below
      };

      // Get matching English stories
      const enStories = getStoriesByKeywords(enStoriesJson, landing.keywords);
      const enContentBlocks = createContentBlocks(enLanding, enStories, 'en');
      enLanding.content = enContentBlocks;

      const newEnContent = `export const landing = ${JSON.stringify(enLanding, null, 2)}\n`;
      fs.writeFileSync(enFilePath, newEnContent);
      newEnLandings.push(enLanding);
      console.log(`  → Created EN: ${landing.keyEn}.ts`);
    }
  } catch (error) {
    console.error(`ERROR in ${file}:`, error.message);
  }
});

console.log(`\n✅ Updated ${updatedEsLandings.length} Spanish landings`);
console.log(`✅ Created ${newEnLandings.length} English landings`);
console.log('Done!');
