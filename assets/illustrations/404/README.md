# 404 - Página no encontrada

## Objetivo
Crear una serie de ilustraciones divertidas que transformen el error 404 en una experiencia agradable y coherente con la identidad visual del sitio "La Voz de los Cuentos".

## Especificaciones técnicas

### Dimensiones
- **Tamaño**: 300x300px (cuadrado)
- **Formato**: WebP (comprimido)
- **Resolución**: 72 DPI para web
- **Modo color**: RGB

### Estilo
- Coherente con la identidad visual de "La Voz de los Cuentos"
- Ilustraciones divertidas y coloridas
- Dirigidas a niños
- Evitar minimalismo corporativo - buscamos **esquizo energy**
- Elementos bien definidos sin ser piero
- Animación potencial (aunque sea estática, considerar qué animaría bien)

### Paleta de colores recomendada
- Colores cálidos y vibrantes
- Reutilizar tonos del sitio cuando sea posible
- Contraste alto para legibilidad

## Ilustraciones necesarias (rotativas)

### 1. **lost-character-forest** (Personaje perdido en el bosque)
- Personaje del universo de "La Voz de los Cuentos" perdido en un bosque
- Mirando mapas confusos, brújulas rotas, señales contradictorias
- Expresión de confusión/sorpresa divertida
- Árboles, plantas alrededor
- Elemento a destacar: El personaje sin entender dónde está

**Archivo**: `lost-character-forest.webp`

### 2. **broken-map-compass** (Mapa y brújula rotos)
- Mapa rasgado con rutas imposibles
- Brújula que apunta en todas direcciones
- Señales de tráfico cruzadas y confusas
- Elementos de viaje desordenados
- Tono: Caótico pero divertido, no amenazante

**Archivo**: `broken-map-compass.webp`

### 3. **confused-signs** (Señales contradictorias) - *OPCIONAL*
- Múltiples señales de camino apuntando direcciones diferentes
- Personaje rascándose la cabeza
- Paisaje rural/bosque
- Elemento lúdico: confusión absoluta

**Archivo**: `confused-signs.webp`

## Comportamiento en la página

Las ilustraciones rotarán aleatoriamente cada vez que un usuario visite la página 404, dando variedad sin que sea tedioso ver el mismo error varias veces.

## Implementación

- [ ] Crear ilustración 1: `lost-character-forest.webp`
- [ ] Crear ilustración 2: `broken-map-compass.webp`
- [ ] Crear ilustración 3 (opcional): `confused-signs.webp`
- [ ] Actualizar `src/pages/404.astro` para usar ilustraciones rotativas
- [ ] Actualizar `src/styles/404.css` si es necesario
- [ ] Probar en móvil y desktop

## Notas de diseño

- NO usar emojis en las ilustraciones (pero las ilustraciones SVG/PNG sí son bienvenidas)
- Pensar en cómo estas ilustraciones se vería con animaciones (de movimiento suave, no twitchy)
- Mantener la coherencia con personajes/estilos ya usados en el sitio
- Los niños necesitan dopamina - esto debería hacerlos sonreír cuando se pierdan

## Archivo de referencia CSS
Ubicado en: `src/styles/404.css` (100px actual)

## Contacto
Para preguntas sobre especificaciones o estilo, revisar el CLAUDE.md del proyecto
