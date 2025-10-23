# TODO: Replace All Remaining Emojis with Custom Icons

## Status
- ✅ CustomProgressBar.vue - DONE (now uses /assets/custom/icons/progress icons)
- ❌ CustomWelcome.vue - PENDING
- ❌ CustomShareGate.vue - PENDING
- ❌ CustomSuccess.vue - PENDING
- ❌ CustomStepStory.vue (themes) - PENDING
- ❌ CustomStepEmail.vue (timeline) - PENDING

## CustomWelcome.vue - 3 Emojis to Replace

Line 73-90: Replace step icons
```vue
// CURRENT (emojis in steps array):
icon: '✏️' → Change to img: /assets/custom/icons/general/icon-pencil.png
icon: '📖' → Change to img: /assets/custom/icons/general/icon-book.png
icon: '📧' → Change to img: /assets/custom/icons/general/icon-envelope.png

// Update template to render images instead of emojis
```

## CustomShareGate.vue - 3 Emojis to Replace

Line 5: `🔒` Lock icon
- Change to: `<img src="/assets/custom/icons/general/icon-lock.png" />`
- CSS class: `custom-share-gate__lock-icon`

Line 7-8: `✨` Sparkles (multiple)
- Change to: `<img src="/assets/custom/icons/general/icon-sparkles.png" />`
- These float around - keep animation but use image

Line 78: `📍` Pin icon
- Change to: `<img src="/assets/custom/icons/general/icon-pin.png" />`
- CSS class: `custom-share-gate__stat-icon`

## CustomSuccess.vue - 2 Emojis to Replace

Line 5: `📧` Email illustration
- Keep as is (this is an illustration, not an icon)

Line 92: `🎉` Celebration icon
- Change to: `<img src="/assets/custom/icons/general/icon-success.png" />`

Line 72: `📧` Email in info section
- Change to: `<img src="/assets/custom/icons/general/icon-email-outline.png" />`

Line 73: Inline icon next to email text
- Add CSS sizing

## CustomStepStory.vue - 8 Theme Icons to Replace

Lines 98-106: Theme suggestion buttons
```javascript
// Current:
{ icon: '🏰', name: 'Aventura' }
{ icon: '🧙', name: 'Fantasía' }
{ icon: '🦁', name: 'Animales' }
{ icon: '🌲', name: 'Naturaleza' }
{ icon: '🚀', name: 'Espacio' }
{ icon: '🏴‍☠️', name: 'Piratas' }
{ icon: '👑', name: 'Realeza' }
{ icon: '🎪', name: 'Circo' }

// Change to:
{ name: 'Aventura', iconName: 'adventure' }
{ name: 'Fantasía', iconName: 'fantasy' }
{ name: 'Animales', iconName: 'animals' }
{ name: 'Naturaleza', iconName: 'nature' }
{ name: 'Espacio', iconName: 'space' }
{ name: 'Piratas', iconName: 'pirates' }
{ name: 'Realeza', iconName: 'royalty' }
{ name: 'Circo', iconName: 'circus' }

// Update template:
<img :src="`/assets/custom/icons/themes/icon-theme-${theme.iconName}.png`" />
```

## CustomStepEmail.vue - 1 Emoji to Replace

Line ~38: `⏱️` Clock icon in timeline label
- Change to: `<img src="/assets/custom/icons/general/icon-clock.png" />`
- Add inline styling for small size

## Implementation Pattern

For each file, follow this pattern:

1. **Remove emoji data** from props/arrays
2. **Add icon names** (string identifiers like 'pencil', 'adventure', etc)
3. **Update template** to use `<img>` tags with proper src paths
4. **Add CSS classes** for sizing and alignment
5. **Test** that icons display correctly

## Icon Paths Reference

```
/assets/custom/icons/
├── progress/
│   ├── icon-welcome.png
│   ├── icon-name.png
│   ├── icon-story.png
│   ├── icon-email.png
│   ├── icon-newsletter.png
│   ├── icon-share.png
│   └── icon-success.png
├── themes/
│   ├── icon-theme-adventure.png
│   ├── icon-theme-fantasy.png
│   ├── icon-theme-animals.png
│   ├── icon-theme-nature.png
│   ├── icon-theme-space.png
│   ├── icon-theme-pirates.png
│   ├── icon-theme-royalty.png
│   └── icon-theme-circus.png
└── general/
    ├── icon-pencil.png
    ├── icon-book.png
    ├── icon-envelope.png
    ├── icon-lock.png
    ├── icon-sparkles.png
    ├── icon-pin.png
    ├── icon-email-outline.png
    ├── icon-clock.png
    ├── icon-info.png
    └── icon-success.png
```

## CSS Sizing Guide

```css
/* Inline icons (themes, benefits) */
.icon-inline {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 4px;
}

/* Medium icons (step descriptions) */
.icon-md {
  width: 32px;
  height: 32px;
  display: block;
  margin-bottom: 8px;
}

/* Large icons (lock, celebration) */
.icon-lg {
  width: 48px;
  height: 48px;
}

/* Extra large (lock animation) */
.icon-xl {
  width: 96px;
  height: 96px;
}
```

## Checklist

- [ ] CustomWelcome.vue - Replace 3 step icons
- [ ] CustomShareGate.vue - Replace 3 icons (lock, sparkles, pin)
- [ ] CustomSuccess.vue - Replace 2 icons (celebration, email)
- [ ] CustomStepStory.vue - Replace 8 theme icons
- [ ] CustomStepEmail.vue - Replace 1 timeline icon
- [ ] Test all pages in browser
- [ ] Verify responsive design on mobile
- [ ] Commit with message: "feat: replace all emojis with custom icons"

## Total Emojis to Replace: 18

Progress: 1/18 (Progress bar done)
