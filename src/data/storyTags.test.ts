/**
 * Story Tags Validation Tests
 *
 * Asegura que TODOS los cuentos estén categorizados en al menos una categoría.
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Cargar los archivos manualmente
const storiesEsPath = path.join(__dirname, 'es', 'stories.json');
const storiesEnPath = path.join(__dirname, 'en', 'stories.json');
const storiesEs = JSON.parse(fs.readFileSync(storiesEsPath, 'utf-8'));
const storiesEn = JSON.parse(fs.readFileSync(storiesEnPath, 'utf-8'));

// Cargar los tags
const { storyTags: storyTagsEs } = require('./es/storyTags');
const { storyTags: storyTagsEn } = require('./en/storyTags');

describe('Story Tags - Spanish', () => {
  it('todos los cuentos deben estar en al menos una categoría', () => {
    // Obtener todos los slugs de los cuentos
    const allStorySlugs = new Set(storiesEs.map((story: any) => story.key));

    // Obtener todos los slugs que están categorizados
    const categorizedSlugs = new Set<string>();

    Object.values(storyTagsEs).forEach((slugs: string[]) => {
      slugs.forEach(slug => {
        categorizedSlugs.add(slug);
      });
    });

    // Encontrar cuentos no categorizados
    const uncategorized: string[] = [];
    allStorySlugs.forEach(slug => {
      if (!categorizedSlugs.has(slug)) {
        uncategorized.push(slug);
      }
    });

    // Verificación
    if (uncategorized.length > 0) {
      console.error('\n❌ CUENTOS NO CATEGORIZADOS (ESPAÑOL):');
      uncategorized.forEach(slug => {
        const story = storiesEs.find((s: any) => s.key === slug);
        console.error(`  - ${slug} (${story?.name})`);
      });
    }

    expect(uncategorized).toEqual(
      [],
      `Encontrados ${uncategorized.length} cuentos sin categorizar en español`
    );
  });

  it('no debe haber slugs fantasma en las categorías (que no existan en stories.json)', () => {
    const allStorySlugs = new Set(storiesEs.map((story: any) => story.key));
    const phantomSlugs: string[] = [];

    Object.entries(storyTagsEs).forEach(([category, slugs]) => {
      slugs.forEach(slug => {
        if (!allStorySlugs.has(slug)) {
          phantomSlugs.push(`${slug} (en categoría: ${category})`);
        }
      });
    });

    if (phantomSlugs.length > 0) {
      console.error('\n❌ SLUGS FANTASMA (NO EXISTEN EN stories.json):');
      phantomSlugs.forEach(slug => {
        console.error(`  - ${slug}`);
      });
    }

    expect(phantomSlugs).toEqual([], `Encontrados ${phantomSlugs.length} slugs que no existen`);
  });

  it('debe reportar el porcentaje de cobertura de categorización', () => {
    const totalStories = storiesEs.length;
    const categorizedSlugs = new Set<string>();

    Object.values(storyTagsEs).forEach((slugs: string[]) => {
      slugs.forEach(slug => {
        categorizedSlugs.add(slug);
      });
    });

    const coverage = (categorizedSlugs.size / totalStories) * 100;
    console.log(`\n📊 COBERTURA DE CATEGORIZACIÓN (ESPAÑOL):`);
    console.log(`   Total de cuentos: ${totalStories}`);
    console.log(`   Cuentos categorizados: ${categorizedSlugs.size}`);
    console.log(`   Cobertura: ${coverage.toFixed(2)}%`);

    expect(coverage).toBeGreaterThanOrEqual(100);
  });
});

describe('Story Tags - English', () => {
  it('todos los cuentos deben estar en al menos una categoría', () => {
    const allStorySlugs = new Set(storiesEn.map((story: any) => story.key));
    const categorizedSlugs = new Set<string>();

    Object.values(storyTagsEn).forEach((slugs: string[]) => {
      slugs.forEach(slug => {
        categorizedSlugs.add(slug);
      });
    });

    const uncategorized: string[] = [];
    allStorySlugs.forEach(slug => {
      if (!categorizedSlugs.has(slug)) {
        uncategorized.push(slug);
      }
    });

    if (uncategorized.length > 0) {
      console.error('\n❌ CUENTOS NO CATEGORIZADOS (INGLÉS):');
      uncategorized.forEach(slug => {
        const story = storiesEn.find((s: any) => s.key === slug);
        console.error(`  - ${slug} (${story?.name})`);
      });
    }

    expect(uncategorized).toEqual(
      [],
      `Encontrados ${uncategorized.length} cuentos sin categorizar en inglés`
    );
  });

  it('no debe haber slugs fantasma en las categorías (que no existan en stories.json)', () => {
    const allStorySlugs = new Set(storiesEn.map((story: any) => story.key));
    const phantomSlugs: string[] = [];

    Object.entries(storyTagsEn).forEach(([category, slugs]) => {
      slugs.forEach(slug => {
        if (!allStorySlugs.has(slug)) {
          phantomSlugs.push(`${slug} (en categoría: ${category})`);
        }
      });
    });

    if (phantomSlugs.length > 0) {
      console.error('\n❌ SLUGS FANTASMA (NO EXISTEN EN stories.json):');
      phantomSlugs.forEach(slug => {
        console.error(`  - ${slug}`);
      });
    }

    expect(phantomSlugs).toEqual([], `Encontrados ${phantomSlugs.length} slugs que no existen`);
  });

  it('debe reportar el porcentaje de cobertura de categorización', () => {
    const totalStories = storiesEn.length;
    const categorizedSlugs = new Set<string>();

    Object.values(storyTagsEn).forEach((slugs: string[]) => {
      slugs.forEach(slug => {
        categorizedSlugs.add(slug);
      });
    });

    const coverage = (categorizedSlugs.size / totalStories) * 100;
    console.log(`\n📊 COBERTURA DE CATEGORIZACIÓN (INGLÉS):`);
    console.log(`   Total de cuentos: ${totalStories}`);
    console.log(`   Cuentos categorizados: ${categorizedSlugs.size}`);
    console.log(`   Cobertura: ${coverage.toFixed(2)}%`);

    expect(coverage).toBeGreaterThanOrEqual(100);
  });
});
