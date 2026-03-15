---
name: landing-seo
description: Genero landings de curación de cuentos SEO en ESPAÑOL E INGLÉS simultáneamente. Creo archivos TypeScript en src/data/landings/, identifico temas sin cobertura SEO, añado CTAs y diversidad de stories. Invócame cuando necesites nuevas landing pages.
---

# QUÉ HACE

Genero landings completas, bilingües y optimizadas para SEO que curan historias por tema:
- Leo landings existentes en AMBOS idiomas
- Identifico palabras clave de alto tráfico no cubiertas (ej: "cuentos de miedo", "historias para principiantes")
- Elijo dinámicamente un tema nuevo
- Creo contenido **muy SEO** (200+ palabras, keyword en title, descripción rico en CTAs)
- **Requisitos SEO Obligatorios:**
    - **DESCRIPCIÓN HTML RICA:** Mínimo **200 palabras** con estructura HTML (`<h2>`, `<h3>`, `<p>`, `<strong>`, etc.)
    - **CTA EXPLÍCITO:** Al menos un párrafo con verbo de acción (ES: "escucha", "descubre", "lee", "disfruta"; EN: "listen", "discover", "read", "enjoy")
    - **KEYWORD EN TITLE:** El keyword debe aparecer en el title (ej: title="**Cuentos de miedo**..." con keyword="miedo")
    - **KEYWORD EN DESCRIPTION:** Debe aparecer al menos 2 veces en la descripción
    - **TITLE SEO:** Entre 40-70 caracteres (óptimo para Google)
    - **MINIMUM 5 STORIES:** Cada landing referencia mínimo 5 story slugs diferentes
    - **DIVERSIDAD:** No repetir siempre los mismos cuentos — usa story tags para variar
    - **🔴 NO PENDING TRANSLATIONS:** Tanto `keyEs` como `keyEn` DEBEN ser completados (nunca vacíos)
    - **PARIDAD ES+EN:** SIEMPRE creo dos archivos al mismo tiempo con cross-linking (`keyEs`/`keyEn`)
- Guardo en archivos `.ts` dentro de `src/data/landings/es/` y `src/data/landings/en/`
- Actualizo `src/data/landings/index.ts` para importar y exportar los nuevos landings

# MI PROCESO

## 1. Leo landings existentes
Abro: `src/data/landings/es/` y `src/data/landings/en/`
Extraigo keys, títulos, keywords de archivos `.ts` existentes

## 2. Detectar gaps SEO
Identifico:
- Qué temas NO están cubiertos (ej: "cuentos de miedo" podría no existir)
- Palabras clave con alto tráfico pero sin landing
- Temas populares en Google Search Console o Google Trends

## 3. Elegir tema único
Selecciono un tema nuevo:
- Ej: cuentos de miedo, cuentos para niños con ansiedad, historias de amistad, cuentos educativos, etc.
- Aseguro que no exista en ES ni EN

## 4. Definir category y keywords
**NEW APPROACH: DINÁMICA CON KEYWORDS**

Consulto `src/data/es/storyTags.ts` y `src/data/en/storyTags.ts`
- Elijo un `category` válido de los tags existentes (ej: "miedo", "aventura", "dormir")
- Defino `keywords` relevantes que aparezcan en títulos/contenido de cuentos (ej: ["luna", "noche", "sueños"])
- El sistema buscará dinámicamente cuentos que matcheen category + keywords
- Los cuentos se agruparán automáticamente en secciones por keyword

**⚠️ REGLA DE FALLBACK KEYWORDS:**
- **Máximo 1 keyword** en el array `keywords`
- Si no hay suficientes cuentos con ese keyword, intenta con otro keyword diferente
- Ejemplo: ["ansiedad"] → si no hay cuentos → cambia a ["valentía"]

## 5. Crear archivos TypeScript (ESTRUCTURA NUEVA CON CONTENT BLOCKS)

Creo dos archivos `.ts` (ES + EN) con esta estructura que combina CONTENT BLOCKS + DYNAMIC STORIES:

```typescript
// src/data/landings/es/cuentos-para-dormir-relatos-magicos.ts
export const landing = {
  key: "cuentos-para-dormir-relatos-magicos",
  keyEs: "cuentos-para-dormir-relatos-magicos",
  keyEn: "bedtime-stories-magical-tales",
  title: "Cuentos para Dormir: Relatos Mágicos para una Noche de Sueños",
  keyword: "cuentos para dormir",
  category: "dormir",  // ← Tag válido de storyTags (si existe) o custom
  keywords: ["luna"],  // ← 1 keyword máximo
  description: `<p>Descubre cómo los <strong>cuentos para dormir</strong> pueden ser herramientas poderosas...</p>
<h2>¿Por qué los cuentos para dormir son beneficiosos?</h2>
<p>Los temores infantiles son completamente normales, pero enfrentarlos a través de historias controladas ayuda...</p>
<p>👉 <strong>¡Escucha ahora y descubre historias que transforman el miedo en valentía!</strong></p>`,
  content: [
    {
      type: 'text',
      body: '<p>Introducción contexto...</p>'
    },
    {
      type: 'story_recommendation',  // ← OBLIGATORIO: al menos 1 en primer 1/3
      slug: 'la-historia-de-pipo-el-gato-viajero',
      title: 'Título de la Historia',
      description: 'Descripción...',
      duration: 150,
      variant: 'primary',
      label: 'Escucha ahora'
    },
    {
      type: 'text',
      body: '<p>Transición...</p>'
    },
    {
      type: 'story_highlight',  // ← DINÁMICO: busca en keywords
      searchKeyword: 'luna',
      label: 'Destacado'
    },
    {
      type: 'text',
      body: '<p>Cierre...</p>'
    }
  ]
}
```

**Estructura OBLIGATORIA de Landing:**
```typescript
export const landing = {
  key: "slug-unico",           // URL slug único
  keyEs: "slug-es",            // Slug en español
  keyEn: "slug-en",            // Slug en inglés (NUNCA vacío)
  title: "Título 40-70 caracteres",
  keyword: "palabra-clave",
  category: "miedo",           // Tag de storyTags o custom
  keywords: ["palabra-clave"],  // 1 keyword máximo
  description: `<p>200+ palabras con HTML...</p>`,  // 200+ palabras, con CTA
  content: [
    { type: 'text', body: '...' },
    { type: 'story_recommendation', ... },  // ← En primer 1/3
    { type: 'text', body: '...' },
    { type: 'story_highlight', searchKeyword: '...', label: '...' },  // Dinámico
    { type: 'text', body: '...' },
    { type: 'stories_gallery', stories: [...] }  // ← Al final, 3+ stories
  ]
}
```

**CÓMO FUNCIONA EL CONTENT BLOCK:**
1. **story_recommendation:** Story ESTÁTICA curada manualmente (primera impresión)
2. **story_highlight:** Story DINÁMMICA que busca en el subset filtrado por keywords
3. **stories_gallery:** Resto de stories relacionadas (generado automáticamente por useLanding)

El sistema `useLanding` automáticamente:
- Genera el `stories_gallery` con historias que NO están en los bloques de contenido
- Filtra por category + keywords para obtener el subset correcto
- story_highlight busca dentro de ese subset por searchKeyword

## 6. Actualizar index.ts

En `src/data/landings/index.ts`, añado líneas:
```typescript
import { landing as miedoEs } from './es/cuentos-de-miedo-para-ninos'
import { landing as miedoEn } from './en/fear-stories-for-kids'
```

Luego añado a los arrays:
```typescript
export const landingsEs = [..., miedoEs]
export const landingsEn = [..., miedoEn]
```

## 7. Validar con tests

Ejecuto:
```bash
npm run validate:landings
```

Tests validan:
- ✅ Story keys válidos en ambas colecciones
- ✅ Language consistency (no mezcla ES/EN)
- ✅ Paridad 1:1 entre ES y EN
- ✅ Campos obligatorios completos (sin keyEn/keyEs vacíos)
- ✅ SEO quality: title 40-70 chars, keyword presente
- ✅ Contenido: 200+ palabras, mínimo CTA
- ✅ Diversidad: stories no repetidas en >50% landings

# EJEMPLO DE SALIDA

**Landing generado (ES):**
```json
{
  "key": "cuentos-de-miedo-para-ninos-superando-temores",
  "keyEs": "cuentos-de-miedo-para-ninos-superando-temores",
  "keyEn": "fear-stories-for-kids-overcoming-childhood-fears",
  "title": "Cuentos de Miedo para Niños: Estrategias para Superar Temores",
  "keyword": "cuentos de miedo",
  "description": "<p>Descubre cómo los <strong>cuentos de miedo para niños</strong>...[200+ palabras con CTAs]...</p>",
  "keys": ["la-leyenda-de-la-reina-de-la-noche", "el-demonio-y-la-cucharita-perdida", ...]
}
```

**Confirmación:**
```
✅ Landings generados:
   ES: cuentos-de-miedo-para-ninos-superando-temores.ts
   EN: fear-stories-for-kids-overcoming-childhood-fears.ts
📊 Tema: miedo + valentía
📁 Palabras: 245 (ES), 238 (EN)
✅ Tests pasados: 9/9 suites
```

# REGLAS NO NEGOCIABLES (NUEVA ARQUITECTURA CON CONTENT BLOCKS)

1. **SIN PENDING TRANSLATIONS:** Tanto ES como EN se crean SIEMPRE simultáneamente. Los `keyEs` y `keyEn` NUNCA pueden estar vacíos.
2. **200+ PALABRAS MÍNIMO:** La descripción debe tener sustancia SEO real. No descripciones cortas.
3. **CTA OBLIGATORIO:** Cada landing tiene al menos un párrafo con verbo de acción que invita a escuchar/leer.
4. **KEYWORD PRESENCE:** El keyword debe estar en el title (visible) y en la descripción (2+ veces).
5. **CATEGORY VÁLIDO:** `category` debe ser un tag existente en `storyTags.ts` O ser un custom category sin conflictos.
6. **KEYWORDS SIMPLES:** Array de strings simples (["luna"]), sin objetos complejos.
7. **MÁXIMO 1 KEYWORD:** Cada landing usa **solo 1 keyword** en el array. Si no hay suficientes stories, cambia el keyword, no agregues más.
8. **TITLE 40-70 CARACTERES:** Google muestra títulos entre 50-60 chars en mobile. Nuestro rango es 40-70.
9. **CROSS-LINKING:** En ES, `keyEn` apunta al archivo EN. En EN, `keyEs` apunta al archivo ES.
10. **CONTENT BLOCK STRUCTURE:** Cada landing DEBE tener:
    - ✅ Al menos 1 bloque `type: 'text'` introductorio
    - ✅ Al menos 1 bloque `type: 'story_recommendation'` EN PRIMER 1/3 (posición-based)
    - ✅ Al menos 1 bloque `type: 'story_highlight'` con `searchKeyword` dinámico
    - ✅ 1 bloque `type: 'stories_gallery'` AL FINAL con mínimo 3 stories diferentes
    - ✅ Bloques `type: 'text'` de transición entre secciones para flujo narrativo
11. **STORY REFERENCES MÍNIMO:** Cada landing debe referenciar mínimo 5 stories diferentes:
    - story_recommendation (1-2 stories)
    - story_highlight (1 story dinámico)
    - stories_gallery (3+ stories, generadas automáticamente)
12. **NO KEYS ESTÁTICAS EN CONTENT:** Los bloques `content` NO deben incluir arrays `keys` estáticos. El sistema useLanding genera dinámicamente:
    - story_highlight busca en subset filtrado por keywords
    - stories_gallery se rellena con stories no usadas en content
13. **VALIDACIÓN AUTOMÁTICA:** Tests verifican que:
    - ✅ Content blocks tienen estructura correcta
    - ✅ story_recommendation aparece en primer 1/3
    - ✅ Mínimo 5 stories diferentes por landing
    - ✅ story_highlight es dinámico (no hardcodeado)
    - ✅ stories_gallery tiene mínimo 3 stories
    - ✅ Category + keywords son válidos
    - ✅ No hay duplicados entre bloques

# BRANDING
- **Español:** "**La Voz de los Cuentos**" en intros/outros
- **Inglés:** "**BuboBoo**" (marca en inglés)

# CUÁNDO USARME

- Necesitas cubrir nuevas palabras clave SEO con landing pages
- Quieres expandir la curación de stories por temas
- Requieres paridad ES/EN garantizada (sin excepciones)
- Necesitas landings con CTAs claros y contenido SEO robusto

# VALIDACIÓN (TÚ EJECUTAS)

Después que genero landings, ejecutas:

```bash
npm run validate:landings
```

Verifica:
- ✅ **Paridad ES/EN estricta (mismo número)**
- ✅ **Sin pending translations (keyEs/keyEn completos)**
- ✅ **Story keys válidos en ambas colecciones**
- ✅ **Contenido SEO (200+ palabras, keyword presente, CTA)**
- ✅ **Diversidad (stories no repetidas >50% landings)**
- ✅ **Coverage: 9/9 suites pasadas** (si algo falla, ajustamos)

# RESUMEN

- ✅ **Bilingüe automático** — ES + EN al mismo tiempo
- ✅ **SIN pending translations** — keyEs y keyEn siempre completos
- ✅ **SEO-first** — 200+ palabras, keyword en title + descripción
- ✅ **CTA-driven** — CTAs explícitos en cada landing
- ✅ **Story diversity** — Uso tags para variar stories
- ✅ **Testable** — Tests Vitest validan todo
- ✅ **Manual & transparent** — Todo editable, no blackbox
- **Solo me invocas, yo genero todo**
