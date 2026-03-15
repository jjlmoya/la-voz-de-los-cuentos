#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esPath = path.join(__dirname, '../src/data/es/stories.json');
const enPath = path.join(__dirname, '../src/data/en/stories.json');

const storiesEs = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const storiesEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function findStory(query, lang = 'es') {
  if (!isNaN(query)) {
    const order = query.toString();
    const es = storiesEs.find(s => s.order === order);
    const en = storiesEn.find(s => s.order === order);
    return {
      order,
      es: es ? es.key : 'NOT_FOUND',
      en: en ? en.key : 'NOT_FOUND',
      nameEs: es ? es.name : '?',
      nameEn: en ? en.name : '?'
    };
  }

  const normQuery = normalize(query);
  const source = lang === 'es' ? storiesEs : storiesEn;
  
  // Try exact key first, then normalized key, then normalized name
  let story = source.find(s => s.key === query) || 
              source.find(s => normalize(s.key) === normQuery) ||
              source.find(s => normalize(s.name) === normQuery);
  
  if (!story) return null;

  const order = story.order;
  const es = storiesEs.find(s => s.order === order);
  const en = storiesEn.find(s => s.order === order);

  return {
    order,
    es: es ? es.key : 'NOT_FOUND',
    en: en ? en.key : 'NOT_FOUND',
    nameEs: es ? es.name : '?',
    nameEn: en ? en.name : '?'
  };
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scripts/find-story.js <orderId|key> [lang: es|en]');
  process.exit(1);
}

const result = findStory(args[0], args[1] || 'es');
if (result) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('Story not found.');
}
