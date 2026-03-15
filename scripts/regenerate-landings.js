const fs = require('fs');
const path = require('path');

// Read stories
const esStoriesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/es/stories.json'), 'utf8'));
const enStoriesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/en/stories.json'), 'utf8'));

// Get stories that match keywords
function getStoriesByKeywords(stories, keywords) {
  if (!keywords || keywords.length === 0) return [];

  return stories.filter(story => {
    const searchText = `${story.name} ${story.story || ''}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  });
}

// Create alternating content blocks (text + story_recommendation)
function createContentBlocks(landing, stories, lang) {
  const blocks = [];

  // Add intro text block
  if (landing.description) {
    blocks.push({
      type: 'text',
      body: landing.description
    });
  }

  // Add story recommendations from matching stories
  stories.slice(0, 4).forEach((story, index) => {
    // Add story recommendation block
    blocks.push({
      type: 'story_recommendation',
      slug: story.key,
      title: story.name,
      description: story.story ? story.story.substring(0, 120) + '...' : '',
      duration: story.time ? Math.round(parseFloat(story.time)) : 10,
      variant: ['primary', 'secondary', 'success', 'warning'][index % 4],
      label: 'Leer cuento'
    });

    // Add a brief text separator after first 2 stories
    if (index === 1 && stories.length > 3) {
      blocks.push({
        type: 'text',
        body: `<p>Continúa descubriendo más historias increíbles de nuestra colección...</p>`
      });
    }
  });

  // Add stories gallery with remaining stories
  const remainingStories = stories.slice(4);
  if (remainingStories.length > 0) {
    blocks.push({
      type: 'stories_gallery',
      stories: remainingStories,
      title: 'Más historias para explorar',
      subtitle: 'Descubre nuestra amplia colección de cuentos'
    });
  }

  return blocks;
}

// Read existing landings
const esLandingsDir = path.join(__dirname, '../src/data/landings/es');
const enLandingsDir = path.join(__dirname, '../src/data/landings/en');

const esLandingFiles = fs.readdirSync(esLandingsDir).filter(f => f.endsWith('.ts'));
const enLandingFiles = fs.readdirSync(enLandingsDir).filter(f => f.endsWith('.ts'));

console.log(`Found ${esLandingFiles.length} Spanish landings and ${enLandingFiles.length} English landings`);

// Process Spanish landings
esLandingFiles.forEach(file => {
  const filePath = path.join(esLandingsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract landing object using regex
  const match = content.match(/export const landing = \{([\s\S]*?)\n\}/);
  if (!match) {
    console.log(`Skipping ${file} - could not parse`);
    return;
  }

  // Simple eval to get the object (not recommended for production, but works here)
  try {
    const landingStr = `({${match[1]}\n})`;
    const landing = eval(landingStr);

    // Get matching stories
    const matchingStories = getStoriesByKeywords(esStoriesJson, landing.keywords);
    console.log(`${file}: Found ${matchingStories.length} matching stories`);

    // Create content blocks
    const contentBlocks = createContentBlocks(landing, matchingStories, 'es');

    // Add content to landing
    landing.content = contentBlocks;

    // Write updated landing
    const newContent = `export const landing = ${JSON.stringify(landing, null, 2)}\n`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

// Process English landings
enLandingFiles.forEach(file => {
  const filePath = path.join(enLandingsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/export const landing = \{([\s\S]*?)\n\}/);
  if (!match) {
    console.log(`Skipping ${file} - could not parse`);
    return;
  }

  try {
    const landingStr = `({${match[1]}\n})`;
    const landing = eval(landingStr);

    const matchingStories = getStoriesByKeywords(enStoriesJson, landing.keywords);
    console.log(`${file}: Found ${matchingStories.length} matching stories`);

    const contentBlocks = createContentBlocks(landing, matchingStories, 'en');
    landing.content = contentBlocks;

    const newContent = `export const landing = ${JSON.stringify(landing, null, 2)}\n`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('Done regenerating landings');
