# Favorite Achievements Images

Este directorio contiene las imágenes de los logros de favoritos (achievements).

## Archivos necesarios

Debes crear/reemplazar los siguientes archivos PNG:

### Logros actuales:
- `1.png` - "Tu Primer Amor" (Mark 1 story as favorite)
- `5.png` - "Cinco Favoritos" (Mark 5 stories as favorites)
- `10.png` - "Coleccionista de Historias" (Mark 10 stories as favorites)
- `25.png` - "Guardián de Veinticinco Joyas" (Mark 25 stories as favorites)
- `50.png` - "Biblioteca Personal de Cincuenta Tesoros" (Mark 50 stories as favorites)

## Especificaciones técnicas

- **Formato**: PNG
- **Tamaño recomendado**: 512x512px o superior (se redimensionará automáticamente)
- **Estilo**: Mantener consistencia con los logros de lectura en `../read/`
- **Tema**: Relacionado con favoritos/amor/tesoros/colecciones

## Instrucciones para reemplazar

1. Crea tus imágenes en PNG
2. Reemplaza los archivos placeholder en este directorio
3. Los nombres deben ser exactamente como se especifica arriba (1.png, 5.png, 10.png, 25.png, 50.png)

## Sistema de logros relacionado

El sistema está configurado en:
- `src/achievements/achievements.config.ts` - Definiciones de logros
- `src/composables/useAchievementListener.ts` - Lógica de detección
- `src/components/Achievement/` - Componentes visuales

Cuando un usuario marque historias como favoritas, los logros se desbloquerán automáticamente cuando alcancen los umbrales especificados.
