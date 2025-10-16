# Ilustraciones Necesarias para la Sección de Cuenta

Esta es una guía detallada de todas las ilustraciones que necesitas crear o proporcionar para hacer que la sección de cuenta sea visualmente atractiva para niños.

## 📋 Resumen de Necesidades

| Ubicación | Cantidad | Tamaño | Formato | Prioridad |
|-----------|----------|--------|---------|-----------|
| `/assets/account/` | 4 | 128x128px | WebP | ALTA |
| `/assets/account/empty-states/` | 3 | 200x200px | WebP | ALTA |
| `/assets/account/achievements/` | Variable | 100x100px | WebP | MEDIA |

---

## 🎯 GRUPO 1: Iconos de Tarjetas Principales (Dashboard)

**Ubicación:** `/public/assets/account/`

Estos son los cuatro iconos flotantes en las tarjetas del dashboard. Son bastante grandes en la página pero su zona de clickable es toda la tarjeta.

### 1. `read.webp` - Libro Leído
- **Tamaño:** 128x128px
- **Descripción:** Un libro abierto con páginas, puede tener una marca en una página para indicar que está leído
- **Estilo:** Colorido, amigable, infantil
- **Color sugerido:** Verde (#4CAF50) o tonos cálidos de madera
- **Ubicación en código:** `AccountSummary.vue:37`
- **Contexto:** Mostrará el contador de historias leídas

### 2. `pending.webp` - Historias Pendientes
- **Tamaño:** 128x128px
- **Descripción:** Un punto de suspensión "...", una pregunta, o un libro cerrado con un signo de alerta/anticipación
- **Estilo:** Intrigante, misterioso pero no asustador
- **Color sugerido:** Naranja (#FF9800) o tonos de fuego
- **Ubicación en código:** `AccountSummary.vue:47`
- **Contexto:** Mostrará el contador de historias por leer

### 3. `favorites.webp` - Favoritos
- **Tamaño:** 128x128px
- **Descripción:** Un corazón, una estrella, o un icono de favorito brillante/con brillo
- **Estilo:** Romántico, especial, mágico
- **Color sugerido:** Rosa/Rojo (#E91E63) con efectos de brillo
- **Ubicación en código:** `AccountSummary.vue:57`
- **Contexto:** Mostrará el contador de historias favoritas

### 4. `achievements.webp` - Logros
- **Tamaño:** 128x128px
- **Descripción:** Un trofeo, medalla, corona, o insignia brillante
- **Estilo:** Épico, celebratorio, motivador
- **Color sugerido:** Dorado (#FFC107) con efectos de luz
- **Ubicación en código:** `AccountSummary.vue:67`
- **Contexto:** Mostrará el contador de logros (actualmente 0)

---

## 🎯 GRUPO 2: Estados Vacíos de Secciones

**Ubicación:** `/public/assets/account/empty-states/`

Estas ilustraciones son más grandes (200x200px) y aparecen cuando una sección está vacía. Deben ser inspiradoras/alentadoras.

### 1. `favorites-empty.webp` - Favoritos Vacío
- **Tamaño:** 200x200px (o más grande si quieres, responsivo)
- **Descripción:** Un corazón vacío o un libro con una cara triste pero amigable, con un mensaje "Sin favoritos aún"
- **Estilo:** Suave, invitador, no desalentador
- **Color sugerido:** Tono suave de rosa/púrpura
- **Ubicación en código:** `AccountFavoritesSection.vue:5-8`
- **Contexto:** Aparece cuando no hay favoritos guardados
- **Ubicación visual:** Centro de la página, min-height 300px

### 2. `achievements-empty.webp` - Logros Próximamente
- **Tamaño:** 200x200px (o más grande)
- **Descripción:** Un cofre cerrado, un regalo envuelto, o un icono de "próximamente" brillante y mágico
- **Estilo:** Misterioso, anticipación positiva, "hay sorpresas que vienen"
- **Color sugerido:** Tonos dorados/azules mágicos
- **Ubicación en código:** `AccountAchievementsSection.vue:3`
- **Contexto:** Aparece cuando la sección de logros es "Próximamente"
- **Ubicación visual:** Centro de la página, min-height 400px

### 3. `pending-empty.webp` - Pendientes Vacío (OPCIONAL)
- **Tamaño:** 200x200px
- **Descripción:** Un checkmark, o un personaje feliz que ha completado todo
- **Estilo:** Celebratorio, positivo
- **Color sugerido:** Verde claro
- **Ubicación en código:** `AccountPendingSection.vue` (no tiene fallback actualmente, pero sería bueno)
- **Contexto:** Si decides agregar un estado vacío para cuando no haya pendientes
- **Nota:** Esto requeriría modificar `AccountPendingSection.vue`

---

## 🎯 GRUPO 3: Medallas/Insignias de Logros (Futura Implementación)

**Ubicación:** `/public/assets/account/achievements/`

Estas serán necesarias cuando implementes el sistema de logros real. Por ahora es información de referencia.

### Tipos de Medallas Sugeridas (ejemplos):
1. **Bronze Badge** (50x50px) - Primer logro alcanzado
2. **Silver Badge** (50x50px) - Múltiples historias leídas
3. **Gold Badge** (50x50px) - Colecciones completadas
4. **Star Badge** (50x50px) - Favoritos guardados
5. **Crown Badge** (50x50px) - Completicionista (todas las historias leídas)

Formato: `achievement-{id}.webp` o similar.

---

## 📐 Especificaciones Técnicas

### Formatos:
- **Formato:** WebP (requerido por el proyecto)
- **Compresión:** Máxima, pero manteniendo calidad visual
- **Fondo:** Transparente (PNG before conversion) o del color del diseño

### Dimensiones Sugeridas:
- **Iconos Dashboard:** 128x128px
- **Estados Vacíos:** 200x200px (responsivo, se reduce a 150x150px en móvil)
- **Medallas:** 50x50px a 100x100px según uso

### Requerimientos CSS:
- Las imágenes deben verse bien con `object-fit: contain`
- Deben tener suficiente contraste para legibilidad
- Deben ser escalables (SVG convertido a WebP es ideal)

### Consideraciones de Rendimiento:
- Cada imagen debe ser < 50KB en WebP
- Usar herramientas como `cwebp` para optimización
- Las imágenes se cargan bajo demanda (lazy loading)

---

## 🎨 Guía de Estilo

### Colores Temáticos (según tarjetas):
- **Leídos:** Verde (#4CAF50)
- **Pendientes:** Naranja (#FF9800)
- **Favoritos:** Rosa (#E91E63)
- **Logros:** Dorado (#FFC107)

### Características Visuales:
- Estilo infantil pero no babyish
- Líneas suaves, sin ángulos agresivos
- Colores vibrantes pero no abrumadores
- Animación de flotación en los iconos del dashboard (ya implementada)
- Consistencia con el estilo del resto de la app

### Inspiración:
- Estilo similar a las ilustraciones de carga que ya existen
- Tonos y aesthetic que se ve en `public/assets/illustrations/`
- Personajes amigables si incluyes seres vivos

---

## 🚀 Instrucciones de Instalación

Cuando tengas las ilustraciones listas:

1. **Crea la estructura de carpetas:**
   ```bash
   mkdir -p public/assets/account
   mkdir -p public/assets/account/empty-states
   mkdir -p public/assets/account/achievements
   ```

2. **Coloca los archivos WebP:**
   ```
   public/assets/account/
   ├── read.webp
   ├── pending.webp
   ├── favorites.webp
   ├── achievements.webp
   └── empty-states/
       ├── favorites-empty.webp
       ├── achievements-empty.webp
       └── pending-empty.webp (opcional)
   ```

3. **Verifica que se cargan correctamente:**
   - El dashboard mostrará los 4 iconos con animación flotante
   - Las secciones vacías mostrarán la ilustración correspondiente

---

## 📝 Próximos Pasos

### Cambios Necesarios en el Código (una vez tengas las ilustraciones):

1. **Mejorar AccountFavoritesSection.vue:**
   ```vue
   <!-- Agregar ilustración al estado vacío -->
   <template v-if="stories.length === 0" #fallback>
     <div class="account-favorites-empty">
       <img src="/assets/account/empty-states/favorites-empty.webp" alt="No favorites" />
       <p>{{ t('page.account.favorites.empty') }}</p>
     </div>
   </template>
   ```

2. **Mejorar AccountAchievementsSection.vue:**
   ```vue
   <!-- Agregar ilustración al estado "próximamente" -->
   <div class="account-achievements-section">
     <img src="/assets/account/empty-states/achievements-empty.webp" alt="Coming soon" />
     <p>{{ t('page.account.achievements.comingSoon') }}</p>
   </div>
   ```

3. **Agregar AccountPendingSection.vue fallback** (si no hay historias pendientes)

4. **Implementar sistema de medallas** cuando estén listas las insignias

---

## ✅ Checklist

Cuando hayas preparado las ilustraciones, marca aquí:

- [ ] `read.webp` - Listo
- [ ] `pending.webp` - Listo
- [ ] `favorites.webp` - Listo
- [ ] `achievements.webp` - Listo
- [ ] `favorites-empty.webp` - Listo
- [ ] `achievements-empty.webp` - Listo
- [ ] Carpetas creadas en `public/assets/account/`
- [ ] Archivos convertidos a WebP y optimizados
- [ ] Verificación visual en navegador
- [ ] No hay errores 404 en la consola del navegador

---

## 📞 Notas Importantes

- **Responsive:** Las imágenes se adaptan automáticamente con CSS media queries
- **Animaciones:** Los iconos del dashboard ya tienen animación de flotación implementada
- **Accesibilidad:** Todas las imágenes deben tener `alt` text descriptivo
- **Performance:** El proyecto ya usa lazy loading, no necesitas hacer nada extra

Si necesitas ayuda convertiendo a WebP o optimizando las imágenes después de crearlas, puedo hacerlo automáticamente.
