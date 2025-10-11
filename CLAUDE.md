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
- **NO ICONS OR EMOJIS EVER** - Do not add any icons, emojis, or unicode symbols (BUT custom illustrations/PNGs are ENCOURAGED)
- Use design system variables consistently
- Follow existing component patterns
- Make components feel integrated, not like "pegotes"
- Site is for children - colorful but not overwhelming
- Always use VContainer for proper layout integration
- Respect existing spacing and color patterns

## Design Philosophy (Lessons Learned)

### 1. NO SER COBARDE - Don't Fear Success
- When asked for "bigger", go MUCH BIGGER, not slightly bigger
- Take risks, be bold, embrace extreme solutions
- The first "safe" solution is usually boring as fuck

### 2. MOBILE FIRST - Forget About Hovers
- Kids use touch screens, not mouse hovers
- Permanent animations > hover states
- Design for fingers, not cursors
- Think dopamine, not desktop

### 3. VISUAL ELEMENTS > CSS Tricks
- Don't waste hours on typography, colors, borders alone
- Custom illustrations change EVERYTHING
- Show, don't just style
- One good illustration > 100 lines of fancy CSS

### 4. KIDS NEED DOPAMINE
- Movement, life, attention-grabbing elements
- Esquizo energy > Corporate minimalism
- Subtle is boring for kids
- Make things ALIVE and constantly moving

### 5. FUCK THE FRAMEWORKS When Needed
- If a component library is fighting you, drop it
- Native HTML + clean CSS > fighting with `!important`
- Don't be afraid to bypass abstractions

### 6. ITERATE FAST > PERFECT PLANNING
- Try 20 versions, fail in 19
- Quick failures > slow perfection
- Build → Test → Fail → Repeat
- Speed beats overthinking

### 7. LISTEN TO HARSH FEEDBACK
- Every brutal critique usually has truth
- Being "safe" and "conservative" = being boring
- Push boundaries based on feedback

### 8. BREAKING RULES IS GOOD
- Elements can overflow containers
- Giant icons > perfectly aligned boxes
- Controlled chaos > rigid grids
- Sometimes messy is better