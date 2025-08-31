# Claude Instructions for La Voz de los Cuentos

## Design System Variables

### Colors (theme.css)
- `--v-color-primary`: Main brand color (blue ES, green EN)
- `--v-color-accent-primary`: Primary accent color
- `--v-color-accent-primary-hover`: Hover state
- `--v-color-text-high`: High contrast text
- `--v-color-text-medium`: Medium contrast text  
- `--v-color-text-low`: Low contrast text
- `--v-color-background`: Main background
- `--v-color-background-soft`: Soft background variant

### Spacing Units
- `--v-unit-1`: 4px
- `--v-unit-2`: 8px
- `--v-unit-3`: 12px
- `--v-unit-4`: 16px
- `--v-unit-6`: 24px
- `--v-unit-8`: 32px
- `--v-unit-12`: 48px

### Typography
- `--v-font-size-xs`: 12px
- `--v-font-size-sm`: 14px
- `--v-font-size-md`: 16px
- `--v-font-size-lg`: 18px
- `--v-font-size-xl`: 20px

### Border Radius
- `--v-radius-sm`: 4px
- `--v-radius-md`: 8px
- `--v-radius-lg`: 12px
- `--v-radius-xl`: 16px

### Shadows
- `--v-shadow-sm`: Light shadow
- `--v-shadow-md`: Medium shadow
- `--v-shadow-lg`: Large shadow

## Vicius Components Used
- VContainer: Layout container with size="xl"
- VText: Typography with variants (header, subtitle, body, caption)
- VImage: Image component with lazy loading
- VButton: Button component

## Important Rules
- **NO ICONS OR EMOJIS EVER** - Do not add any icons, emojis, or unicode symbols
- Use design system variables consistently
- Follow existing component patterns
- Make components feel integrated, not like "pegotes"
- Site is for children - colorful but not overwhelming
- Always use VContainer for proper layout integration
- Respect existing spacing and color patterns