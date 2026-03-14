# 📚 Guía de Story Tags - Sistema de Búsqueda de Cuentos

## ¿Qué es?

Un **sistema de categorización de cuentos por temas** que facilita enormemente la creación de blog posts. Cuando necesitas escribir un artículo sobre "miedos infantiles", puedes rápidamente ver qué historias hablan sobre ese tema.

## Estructura

- **`src/data/es/storyTags.ts`** - Mapeo de categorías → cuentos (Español)
- **`src/data/en/storyTags.ts`** - Mapeo de categorías → cuentos (Inglés)
- **`src/utils/storyTagsHelper.ts`** - Funciones utilitarias para buscar

## ¿Cómo Usar?

### 1️⃣ Búsqueda Rápida (En la Mente)

Cuando vas a escribir un blog post, simplemente piensa:
- _"Necesito cuentos sobre **miedo**"_ → Abre `storyTags.ts` → Ve la clave `miedo` → Ves todos los cuentos

```typescript
// storyTags.ts
miedo: [
  'el-finalizador',
  'el-traga-luces-un-cuento-de-misterio-y-luz',
  'el-experimento-de-las-sombras-en-la-oscuridad',
  'la-luz-que-se-apaga',
]
```

### 2️⃣ Búsqueda Programática (En Código)

Si estás escribiendo un componente o página que necesita filtrar cuentos:

```typescript
import { getStoriesByTag, getAllTags } from '@/utils/storyTagsHelper';

// Obtener todos los cuentos sobre miedo
const fearStories = getStoriesByTag('miedo', 'es');
// Output: ['el-finalizador', 'el-traga-luces-un-cuento-de-misterio-y-luz', ...]

// Obtener cuentos que tengan TANTO "miedo" COMO "superación"
const fearOvercomingStories = getStoriesByMultipleTags(['miedo', 'superación'], 'es');

// Obtener cuentos que tengan "aventura" O "magia" O "amistad"
const adventureMagicFriendship = getStoriesByAnyTag(['aventura', 'magia', 'amistad'], 'es');

// Ver todas las etiquetas disponibles
const allTags = getAllTags('es');
// Output: ['miedo', 'valentía', 'amor', 'amistad', 'aventura', ...]

// Obtener info de una etiqueta
const tagInfo = getTagInfo('aventura', 'es');
// Output: { tag: 'aventura', count: 6, stories: [...] }
```

## Categorías Disponibles

### Emociones y Sentimientos
- `miedo` - Historias sobre miedos
- `valentía` - Historias sobre coraje
- `amor` - Historias sobre amor
- `amistad` - Historias sobre amistad
- `soledad` - Historias sobre soledad
- `empatía` - Historias sobre comprensión

### Aventura y Exploración
- `aventura` - Historias aventureras
- `misterio` - Historias con misterio

### Magia y Fantasía
- `magia` - Historias con elementos mágicos
- `transformación` - Cambios y transformaciones

### Crecimiento Personal
- `superación` - Superar obstáculos
- `responsabilidad` - Aprender responsabilidad
- `aprendizaje` - Historias educativas

### Tecnología y Ciencia
- `tecnología` - Historias con tecnología
- `inteligencia` - Puzzle solving, estrategia

### Diversidad
- `diversidad` - Historias inclusivas

### Naturaleza
- `naturaleza` - Historias sobre naturaleza

### Curiosidad
- `curiosidad` - Historias que despiertan curiosidad

### Redención
- `redención` - Historias de segundo oportunidad

### Por Edad
- `infantil-pequenos` (ES) / `little-ones` (EN) - Para los más pequeños (3-5 años)
- `infantil-medianos` (ES) / `middle-children` (EN) - Para medianos (6-8 años)
- `infantil-mayores` (ES) / `older-children` (EN) - Para mayores (9+ años)

## Ejemplo: Crear un Blog Post

### Paso 1: Definir el tema
"Quiero escribir sobre **miedos infantiles y cómo superarlos**"

### Paso 2: Buscar las categorías relevantes
- Necesito cuentos sobre: `miedo` + `superación` + `valentía`

### Paso 3: Usar el sistema

```typescript
// En mi componente de blog post
import { getStoriesByAnyTag } from '@/utils/storyTagsHelper';

const relevantStories = getStoriesByAnyTag(['miedo', 'superación', 'valentía'], 'es');
// Output: ['el-finalizador', 'llamarina-la-gota-de-agua-valiente', 'la-luz-que-se-apaga', ...]
```

### Paso 4: Usar los slugs en el contenido

```typescript
export const post = {
  content: [
    { type: 'heading', level: 2, text: 'Cuentos para Superar Miedos' },
    {
      type: 'story_table',
      headers: ['Tipo de Miedo', 'Cuento Recomendado', 'Tema'],
      rows: [
        ['Miedo al fracaso', 'el-finalizador', 'Superación'],
        ['Miedo a la oscuridad', 'la-luz-que-se-apaga', 'Luz interior'],
        ['Necesito valentía', 'llamarina-la-gota-de-agua-valiente', 'Coraje'],
      ]
    }
  ]
}
```

## ¿Cómo Mantener el Sistema?

### Cuando Agregues un Nuevo Cuento

1. Obtén el slug del cuento (ej: `mi-nuevo-cuento-increible`)
2. Abre `/src/data/es/storyTags.ts` y `/src/data/en/storyTags.ts`
3. Identifica qué categorías aplican a ese cuento
4. Agrega el slug a los arrays relevantes

**Ejemplo:**
```typescript
// Si agregaste "mi-nuevo-cuento-sobre-dinosaurios"
miedo: [
  'el-finalizador',
  'el-traga-luces-un-cuento-de-misterio-y-luz',
  'mi-nuevo-cuento-sobre-dinosaurios', // ← Nuevo
],

aventura: [
  'equipo-sdg-la-aventura-del-jaguar-perdido',
  'mi-nuevo-cuento-sobre-dinosaurios', // ← Nuevo
],
```

### Cuando Agregues una Nueva Categoría

1. Abre `/src/data/es/storyTags.ts` y `/src/data/en/storyTags.ts`
2. Agrega una nueva clave con su array de slugs:

```typescript
// Ejemplo: agregar categoría "dinosaurios"
dinosaurios: [
  'mi-nuevo-cuento-sobre-dinosaurios',
  'el-reino-olvidado-aventuras-bajo-el-sofa',
],
```

## Tips & Trucos

💡 **Busca por múltiples tags simultáneamente**
```typescript
// Cuentos que aparecen en "aventura" Y "magia" Y "amistad"
const epics = getStoriesByMultipleTags(['aventura', 'magia', 'amistad'], 'es');
```

💡 **Usa `getAllTags()` para autocompletar**
```typescript
const availableCategories = getAllTags('es');
// Perfecto para dropdowns o filtros dinámicos
```

💡 **Imprime un reporte rápido en consola**
```typescript
import { printTagsReport } from '@/utils/storyTagsHelper';
printTagsReport('es'); // ¡Ver todo en formato bonito!
```

## Validación (Tests)

El sistema está diseñado para ser verificado por tests que validen:
- ✅ Todos los slugs existan en la colección de historias
- ✅ No haya inconsistencias entre idiomas
- ✅ No haya categorías vacías sin intención

Ejecuta:
```bash
npm run test
```

## Preguntas Frecuentes

**P: ¿Puedo usar el mismo cuento en múltiples categorías?**
R: ¡Sí! De hecho, es lo más común. Un cuento puede ser sobre "aventura", "amistad" Y "magia" simultáneamente.

**P: ¿Qué categorías debo usar para mi nuevo cuento?**
R: Lee la historia y pregúntate: _¿Qué tema principal trata? ¿Qué emociones despierta? ¿A qué edad se adapta?_ Luego agrega el slug a esas categorías.

**P: ¿Cómo sé qué slug usar?**
R: Busca en `/src/data/es/stories.json` o `/src/data/en/stories.json` el campo `"key"` de tu cuento.

---

**Creado para facilitar la creación de blog posts** ✨
