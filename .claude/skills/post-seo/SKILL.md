---
name: post-seo
description: Genero posts de blog SEO en ESPAÑOL E INGLÉS simultáneamente. Creo archivos TypeScript en src/data/posts/, genero contenido en bloques y los importo en index.js. Invócame cuando necesites nuevo contenido multiidioma.
---

# QUÉ HACE
Genero automáticamente posts de blog completos, bilingües y optimizados para SEO:
- Leo posts existentes en AMBOS idiomas
- Identifico temas de alto tráfico no cubiertos todavía
- Elijo dinámicamente un tema nuevo (dormir, edad, beneficios, emociones, etc.)
- Creo contenido en español + traducción al inglés simultáneamente
- Contenido variado: headings, párrafos, listas, tablas, quotes, highlights, stats, gráficas, pasos, comparativas
- **Requisitos SEO Obligatorios**:
    - Mínimo **1500 PALABRAS** por post (en cada idioma). Validado por `npm run test:bilingual`.
    - Al menos **una** recomendación de cuento (`story_recommendation`). **IMPORTANTE:** No elegir al azar. Debe seleccionarse un cuento de la colección existente (`src/data/es/stories.json`) que sea temáticamente relevante al contenido del post.
    - Fecha actual: **2026-03-13** (Formato: `YYYY-MM-DD`).
- Guardo en archivos `.ts` dentro de `src/data/posts/es/` y `src/data/posts/en/`
- Actualizo `src/data/index.ts` para importar los nuevos posts (Nota: el archivo es `index.ts`, no `index.js`).
- **CATEGORÍAS:** Libertad total. Cualquier categoría que elijas (ej: Emociones, Salud, Creatividad) tendrá un color asignado automáticamente en el listado.
- **NOTA:** Todo manual, sin scripts intermedios

# MI PROCESO

## 1. Leo posts existentes
Abro: `src/data/posts/es/` y `src/data/posts/en/`
Extraigo slugs, títulos, keywords de archivos `.ts` existentes

## 2. Detectar gaps SEO
Identifico:
- Qué temas NO están cubiertos
- Palabras clave con alto tráfico pero sin contenido
- Oportunidades de cobertura

## 3. Elegir tema único
Selecciono un tema nuevo:
- dormir, edad, beneficios, emociones, concentración, creatividad, lectura, conducta
- Aseguro que no exista en ES ni EN

## 4. Crear archivos TypeScript
Creo dos archivos `.ts`:
- `src/data/posts/es/[slug-tema].ts` (post en español)
- `src/data/posts/en/[slug-tema-en].ts` (post en inglés)

Estructura de cada archivo:
```typescript
export const post = {
  slug: "tema-url",
  slugEn: "english-topic",
  title: "...",
  description: "...",
  date: "2024-03-12",
  category: "Educativo|Consejos|Desarrollo",
  tags: ["keyword1", "keyword2"],
  content: [ bloques ]
}
```

## 5. Actualizar index.js
Agrego líneas en `src/data/index.js`:
```javascript
import { post as nuevoNombreEs } from './posts/es/[nuevo-slug]'
import { post as nuevoNombreEn } from './posts/en/[nuevo-slug-en]'
```

Luego agrego a los arrays:
```javascript
const postsEs = [..., nuevoNombreEs]
const postsEn = [..., nuevoNombreEn]
```

## 6. Estructura de bloques
Tipos disponibles:
- `heading` (h2/h3)
- `text` (párrafos)
- `list` (items)
- `table` (datos)
- `quote` (citas)
- `highlight` (callouts: info/tip/success/warning)
- `stats` (números)
- `barchart` (gráficas)
- `steps` (procesos)
- `comparison` (vs)

# EJEMPLO DE SALIDA

**Post generado:**
```json
{
  "slug": "cuentos-desarrollar-empatia-ninos",
  "slugEn": "stories-develop-empathy-children",
  "title": "Cómo Usar Cuentos para Desarrollar Empatía en Niños",
  "description": "Descubre técnicas probadas para usar historias infantiles y fortalecer la empatía emocional en tus hijos.",
  "date": "2024-03-12",
  "category": "Educativo",
  "tags": ["empatía", "cuentos", "desarrollo emocional", "niños"],
  "content": [
    { "type": "heading", "level": 2, "text": "¿Por qué la empatía es crucial?" },
    { "type": "text", "body": "La empatía es..." },
    { "type": "list", "style": "unordered", "items": [...] },
    ...más bloques...
  ]
}
```

**Confirmación en consola:**
```
✅ Post generado: "Cómo Usar Cuentos para Desarrollar Empatía en Niños"
📊 Tema: empatía
📁 Palabras: 1847
✅ Guardado en: src/data/es/posts.json
```

# CUÁNDO USARLO
- Necesitas generar nuevo contenido de blog rápidamente
- Quieres posts SEO sin esfuerzo manual
- Buscas cubrir nuevas palabras clave de alto tráfico
- Ya tienes posts base y quieres expandir contenido

# VALIDACIÓN (TÚ EJECUTAS)
Después que genero posts, ejecutas:
```bash
npm run test:bilingual
```

Verifica automáticamente:
- ✅ **Mínimo 1500 palabras** por post (en cada idioma)
- ✅ **Al menos una recomendación de cuento** (`story_recommendation`)
- ✅ Mismo número ES/EN
- ✅ Slugs pareados correctamente
- ✅ Campos obligatorios
- ✅ Sin posts huérfanos

# RESUMEN
- ✅ Sin scripts intermedios - todo directo
- ✅ Bilingüe automático - ES + EN al mismo tiempo
- ✅ Análisis de gaps - elijo temas que faltan
- ✅ Contenido variado - 8+ tipos de bloques
- ✅ Slugs pareados - slug ↔ slugEn/slugEs
- ✅ Test de paridad - verifica que ES/EN estén sincronizados
- **Solo me invocas, yo genero todo**
