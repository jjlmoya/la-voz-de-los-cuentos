# Dashboard Gamification Assets

Ilustraciones y assets necesarios para el sistema de gamificación de niveles y XP.

## Archivos a reemplazar

### 1. Avatar Levels (20 archivos)
- **Archivos**: `avatar-level-1.png` a `avatar-level-20.png`
- **Tamaño recomendado**: 128x128px (para retina: 256x256px)
- **Especificaciones**:
  - Niveles 1-3: Tema AZUL - "Aprendiz de Historias"
    - Avatar pequeño, aprendiendo, con libro
  - Niveles 4-6: Tema VERDE - "Lector Aventurero"
    - Avatar más seguro, explorando aventura
  - Niveles 7-9: Tema PÚRPURA - "Explorador de Mundos"
    - Avatar con magia, explorando mundos fantásticos
  - Niveles 10-15: Tema DORADO - "Guardián de Sagas"
    - Avatar heroico, protegiendo historias
  - Niveles 16-20: Tema PLATA/DIAMANTE - "Maestro de Cuentos"
    - Avatar legendario, dominando todas las historias

**Notas**:
- Progresión visual: deben sentirse cada vez más "poderosos/sabios"
- Los colores de tema deben ser coherentes con la paleta de Vicius Design System
- Cada avatar debe ser único e ilustrado (NO fotos, NO avatares genéricos)

### 2. XP Bar Visual
- **Archivo**: `xp-bar.png`
- **Tamaño**: Horizontal, ~300x60px aproximadamente
- **Especificaciones**:
  - Barra de progreso con design infantil atractivo
  - Debe ser visualmente increíble y motivador
  - Incluye espacio para:
    - Barra de progreso (fill animation)
    - Etiqueta de "X/Y XP"
    - Ícono de brillo/magia
  - Compatible con animación CSS (gradient animation, pulse effects)

**Notas**:
- El design debe transmitir "progreso" y "magia"
- Elementos visuales (estrellas, brillos) que se iluminen con CSS

### 3. Level Badge/Medallion
- **Archivo**: `level-badge.png`
- **Tamaño**: 96x96px (circular)
- **Especificaciones**:
  - Badge/medallón para mostrar junto al avatar
  - Debe incluir espacio para mostrar el número del nivel
  - Design épico y motivador
  - Con efecto de brillo/halo que se puede animar

**Notas**:
- Será usado como overlay sobre el avatar
- Debe ser visualmente "especial" sin ser demasiado recargado

### 4. Level Up Celebration Character
- **Archivo**: `level-up-celebration.png`
- **Tamaño**: 200x200px (aproximadamente)
- **Especificaciones**:
  - Personaje celebrando subir de nivel
  - Con confetti, brillos, animación de celebración
  - Estados necesarios:
    - Personaje con brazos arriba
    - Con efecto de explosión/confetti
    - Con coronita o medal
  - Design infantil, adorable, motivador

**Notas**:
- Se mostrará con animación de entrada (fadeInUp + scale)
- Puede incluir confetti como elementos separados
- La celebración debe durar ~2-3 segundos en pantalla

## Formato recomendado

- **Formato**: PNG con transparencia (RGBA)
- **Compresión**: Optimizado para web
- **Paleta**: Coherente con [Vicius Design System](https://vicius.design/)
  - Colores primarios/secundarios del diseño actual
  - Bordes redondeados donde sea apropiado
  - Shadow/depth subtil

## Ubicación en código

Una vez las ilustraciones estén listas:

```
public/assets/account/dashboard-assets/
├── avatar-level-1.png
├── avatar-level-2.png
├── ...
├── avatar-level-20.png
├── xp-bar.png
├── level-badge.png
├── level-up-celebration.png
└── README.md (este archivo)
```

## Usado en componentes

- **AccountDashboard.vue**: Avatar level + Badge + XP Bar
- **LevelUpModal.vue**: Celebration character + animations
- **XPProgressBar.vue**: XP Bar visual

## Notas importantes

- ⚠️ Sin emojis - solo ilustraciones custom
- ✨ Visualmente increíble (esto es crítico)
- 🎨 Coherente con el resto del diseño del proyecto
- 📱 Responsive y optimizado para mobile
- 🔄 Si luego necesitan ser WebP, usar script de optimización existente

---

**Estado**: Placeholders creados - Esperando ilustraciones finales
**Última actualización**: Oct 2025
