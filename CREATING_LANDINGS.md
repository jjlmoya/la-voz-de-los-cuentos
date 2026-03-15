# Creando Landings - Guía Directa

Sin scripts vagos. Con TypeScript tipado y validación automática.

## Estructura Básica

```typescript
import type { Landing } from '@/types/landing';

export const landing: Landing = {
  key: "cuentos-para-dormir",
  keyEs: "cuentos-para-dormir",
  keyEn: "bedtime-stories",
  title: "Cuentos para Dormir",
  keyword: "cuentos para dormir",
  category: "dormir",
  keywords: ["sueño", "relajación"],
  description: "Cuentos relajantes que ayudan niños a dormir. Historias con voces suaves y ritmo tranquilo para noches de sueño profundo.",
  content: [
    {
      type: 'text',
      body: `<p>Opening paragraph about sleep stories...</p>`
    },
    {
      type: 'text',
      body: `<h2>Why Sleep Stories Matter</h2><p>Content here...</p>`
    },
    {
      type: 'story_highlight',
      searchKeyword: 'dormir',
      label: 'Sleep Stories'
    },
    {
      type: 'text',
      body: `<h2>Benefits</h2><p>More content...</p>`
    }
  ]
};
```

## TypeScript te valida automáticamente

El compilador de TypeScript va a rechazar:
- ❌ Campos faltantes
- ❌ Tipos incorrectos en content blocks
- ❌ Keywords vacías
- ❌ Description mal formatted

Además, hay `validateLanding()` en `src/types/landing.ts` para validación en runtime:
```typescript
import { validateLanding } from '@/types/landing';

const result = validateLanding(landing);
if (!result.valid) {
  console.error('Landing validation failed:', result.errors);
}
```

## Reglas Mínimas

**Description**:
- 128-160 caracteres
- Plain text (sin HTML)
- ÚNICO y específico para este landing (no thin content)

**Content**:
- Primer bloque SIEMPRE `type: 'text'`
- 1000+ palabras total (en bloques text)
- 0 H1 (viene del template)
- 3+ H2 mínimo
- 2-4 story_highlight blocks distribuidos

**Blocks permitidos**:
- ✅ `text` - Contenido HTML con párrafos y headings
- ✅ `story_highlight` - Carrusel de historias por tag
- ✅ `story_table` - Tabla con historias

**Forbidden**:
- ❌ `stories_gallery` (deprecado)
- ❌ `story_recommendation` (solo en blog)

## Dónde crear archivos

```
src/data/landings/
├── es/
│   └── {key-en-espanol}.ts
└── en/
    └── {key-en-ingles}.ts
```

## Categorías disponibles (keywords)

**Spanish**: miedo, valentía, amor, amistad, soledad, empatía, aventura, misterio, magia, transformación, superación, responsabilidad, aprendizaje, tecnología, inteligencia, diversidad, naturaleza, curiosidad, redención, dormir, ansiedad, infantil-pequenos, infantil-medianos, infantil-mayores

**English**: fear, courage, love, friendship, loneliness, empathy, adventure, mystery, magic, transformation, overcoming, responsibility, learning, technology, intelligence, diversity, nature, curiosity, redemption, sleep, anxiety, little-ones, middle-children, older-children

## Ejemplo Completo

```typescript
import type { Landing } from '@/types/landing';

export const landing: Landing = {
  key: "cuentos-para-dormir-profundo",
  keyEs: "cuentos-para-dormir-profundo",
  keyEn: "deep-sleep-stories",
  title: "Cuentos para Dormir Profundo",
  keyword: "cuentos para dormir profundo",
  category: "dormir",
  keywords: ["sueño", "relajación"],
  description: "Historias relajantes que guían niños hacia un sueño profundo y restaurador. Cuentos con voces suaves y ritmo pausado diseñados para tranquilizar.",
  content: [
    {
      type: 'text',
      body: `<p>El sueño profundo es esencial para el desarrollo infantil. Nuestros cuentos crean un puente seguro entre el mundo de vigilia y el del descanso.</p>`
    },
    {
      type: 'text',
      body: `<h2>Por Qué el Sueño Importa</h2><p>Los niños que duermen bien crecen mejor, aprenden más, y son más felices. El sueño no es lujo, es necesidad.</p>`
    },
    {
      type: 'story_highlight',
      searchKeyword: 'dormir',
      label: 'Cuentos para Dormir'
    },
    {
      type: 'text',
      body: `<h2>Rituales de Sueño</h2><p>Un cuento antes de dormir crea un ritual que prepara el cerebro para descansar.</p>`
    },
    {
      type: 'text',
      body: `<h2>La Ciencia del Sueño</h2><p>La narración lenta activa el parasimpático, reduciendo cortisol y permitiendo que el cuerpo se relaje naturalmente.</p>`
    },
    {
      type: 'story_highlight',
      searchKeyword: 'relajación',
      label: 'Historias Relajantes'
    }
  ]
};
```

## Workflow

1. Copia este template a la carpeta correcta
2. TypeScript valida MIENTRAS escribes
3. Llena la content array
4. Corre `npm run test` para validación final
5. Commit

Sin generadores vagos. Sin scripts mágicos. Solo TypeScript tipado.

## Validación Final

Antes de hacer commit:

```bash
npm run test
```

Esto valida:
- ✅ Descripción 128-160 chars
- ✅ Sin HTML en description
- ✅ Content 1000+ palabras
- ✅ Heading counts correctos
- ✅ No H1 duplicado
- ✅ Bilingual keys match
- ✅ Blocks válidos
