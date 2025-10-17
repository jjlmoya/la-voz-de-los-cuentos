# Daily Streak Assets

Este directorio contiene las ilustraciones y assets necesarios para el componente Daily Streak (Racha Diaria).

## Estructura de carpetas

```
streak/
├── backgrounds/
├── characters/
├── icons/
└── animations/
```

## Assets requeridos

### 1. backgrounds/ - Fondos decorativos
- `flame-background.webp` - Fondo con llamas animadas (para cuando hay racha activa)
  - Tamaño sugerido: 1200x400px
  - Estilo: Duolingo-like con llamas coloridas y gradientes
  - Descripción: Fondo con llamas estilizadas en tonos naranja-rojo-amarillo

- `frozen-background.webp` - Fondo congelado (para cuando la racha está congelada)
  - Tamaño sugerido: 1200x400px
  - Estilo: Tonos azules y blancos con hielo
  - Descripción: Fondo con cristales de hielo y tonos fríos

- `start-background.webp` - Fondo motivacional (para cuando no hay racha iniciada)
  - Tamaño sugerido: 1200x400px
  - Estilo: Tonos pastel con estrellas y elementos motivacionales
  - Descripción: Fondo inspirador con estrellas, líneas decorativas

### 2. characters/ - Personajes/Mascota
- `flame-character.webp` - Personaje mascota de fuego/racha
  - Tamaño sugerido: 300x300px
  - Estilo: Mascota estilo Duolingo (amable, expresivo, con ojos grandes)
  - Descripción: Mascota tipo llama de fuego feliz, celebrando la racha
  - Variaciones de expresión (opcional): neutral, feliz, celebrando, triste

- `ice-character.webp` - Personaje de hielo (para racha congelada)
  - Tamaño sugerido: 300x300px
  - Estilo: Mascota estilo Duolingo con tonos azules
  - Descripción: Mascota de hielo triste/preocupada por racha congelada

- `motivation-character.webp` - Personaje motivacional
  - Tamaño sugerido: 250x250px
  - Estilo: Personaje amistoso tipo mascota
  - Descripción: Personaje con expresión motivadora para "comienza tu racha"

### 3. icons/ - Iconos gráficos
- `flame-icon.webp` - Ícono de llama para contador de racha
  - Tamaño sugerido: 64x64px
  - Estilo: Llama estilizada, colorida
  - Descripción: Ícono de llama para el número de días en racha

- `frozen-icon.webp` - Ícono de hielo/congelado
  - Tamaño sugerido: 64x64px
  - Estilo: Cristal de hielo estilizado
  - Descripción: Ícono pequeño para indicar racha congelada

- `trophy-icon.webp` - Ícono de trofeo (mejor racha)
  - Tamaño sugerido: 64x64px
  - Estilo: Trofeo dorado estilizado
  - Descripción: Ícono para mostrar mejor racha histórica

- `calendar-icon.webp` - Ícono de calendario
  - Tamaño sugerido: 64x64px
  - Estilo: Calendario estilizado
  - Descripción: Ícono para "última lectura" o "días desde"

### 4. animations/ (JSON/SVG para animaciones)
- `flame-animation.json` - Animación de llamas (Lottie JSON)
  - Descripción: Animación de llamas parpadeantes/bailando
  - Duración: 2-3 segundos, loop infinito

- `spark-animation.json` - Animación de chispas/particulas
  - Descripción: Partículas flotantes alrededor del contador
  - Duración: 2-3 segundos, loop infinito

- `celebrate-animation.json` - Animación de celebración
  - Descripción: Animación de confeti o celebración
  - Duración: 1-2 segundos, trigger en milestone

## Notas de diseño

### Estilos generales (Duolingo-inspired):
- Colores para racha activa: 🔥 Naranja #FF9E00, Rojo #FF4040, Amarillo #FFD600
- Colores para racha congelada: 🧊 Azul #5B93FF, Blanco #FFFFFF
- Colores neutrales: Gris #9FA0A1, Negro #2A2A2A
- Estilo de ilustración: Flat design, líneas suaves, colores vibrantes
- Animaciones: Suave, playful, no demasiado rápido (250-500ms)

### Características de las ilustraciones:
- Personajes con ojos grandes y expresivos
- Elementos redondeados (no ángulos agudos)
- Paleta de colores consistente y vibrante
- Tamaños: Optimizar para web (comprimidas .webp)
- Transparencia: Fondo transparente en PNGs antes de convertir a WebP

### Animaciones sugeridas:
- Flame counter: Pulsación suave cuando se actualiza
- Characters: Animación de respiración/movimiento sutil
- Celebrations: Pop-in con bounce animation en milestones

## Recursos inspiradores:
- Duolingo design: https://www.duolingo.com/
- Lottie animations: https://lottiefiles.com/
- Flat design principles para mantener coherencia visual

## Estado actual:
- [ ] Backgrounds creados (3)
- [ ] Characters creados (3)
- [ ] Icons creados (4)
- [ ] Animations creados (3)

**Fecha de creación esperada:** ASAP
**Prioridad:** Alta - Core visual del componente
