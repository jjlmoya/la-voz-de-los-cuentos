# Custom Story Icons Specification

## Overview
Replace all emojis in the custom story flow with personalized SVG/PNG icons. All icons should follow the same design language and color scheme.

## Icons Needed

### Progress Bar Icons (CustomProgressBar.vue)
Used in the top progress indicator showing the 7 steps of the flow.

1. **Welcome Step** (👋)
   - File: `icon-welcome.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Initial greeting/welcome
   - Usage: Step indicator in progress bar

2. **Name Step** (✏️)
   - File: `icon-name.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Character name input
   - Usage: Step indicator in progress bar

3. **Story Step** (📖)
   - File: `icon-story.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Story description input
   - Usage: Step indicator in progress bar

4. **Email Step** (✉️)
   - File: `icon-email.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Email contact
   - Usage: Step indicator in progress bar

5. **Newsletter Step** (🎁)
   - File: `icon-newsletter.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Newsletter subscription
   - Usage: Step indicator in progress bar

6. **Share Step** (🔄)
   - File: `icon-share.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Share gate requirement
   - Usage: Step indicator in progress bar

7. **Success Step** (🎉)
   - File: `icon-success.png`
   - Size: Multiple (40px, 80px variants)
   - Purpose: Completion celebration
   - Usage: Step indicator in progress bar

### Share Gate Icons (CustomShareGate.vue)

8. **Lock Icon** (🔒)
   - File: `icon-lock.png`
   - Size: 48px, 96px
   - Purpose: "Share requirement" visual indicator
   - Usage: Large centered icon in share gate container

9. **Sparkles/Stars** (✨)
   - File: `icon-sparkles.png`
   - Size: 24px (for multiple decorative instances)
   - Purpose: Decorative animation around lock
   - Usage: Floating animation elements

10. **Pin/Location** (📍)
    - File: `icon-pin.png`
    - Size: 28px
    - Purpose: Statistics indicator for "people helped"
    - Usage: In stats box

### Welcome Step Icons (CustomWelcome.vue)

11. **Pencil/Writing** (✏️)
    - File: `icon-pencil.png`
    - Size: 32px
    - Purpose: "Choose character name" step
    - Usage: Welcome intro cards

12. **Book/Story** (📖)
    - File: `icon-book.png`
    - Size: 32px
    - Purpose: "Tell your story" step
    - Usage: Welcome intro cards

13. **Email/Envelope** (📧)
    - File: `icon-envelope.png`
    - Size: 32px
    - Purpose: "Receive by email" step
    - Usage: Welcome intro cards

### Story Themes (CustomStepStory.vue)

14. **Adventure** (🏰)
    - File: `icon-theme-adventure.png`
    - Size: 16px (in theme chips)
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

15. **Fantasy** (🧙)
    - File: `icon-theme-fantasy.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

16. **Animals** (🦁)
    - File: `icon-theme-animals.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

17. **Nature** (🌲)
    - File: `icon-theme-nature.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

18. **Space** (🚀)
    - File: `icon-theme-space.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

19. **Pirates** (🏴‍☠️)
    - File: `icon-theme-pirates.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

20. **Royalty** (👑)
    - File: `icon-theme-royalty.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

21. **Circus** (🎪)
    - File: `icon-theme-circus.png`
    - Size: 16px
    - Purpose: Theme suggestion
    - Usage: Theme selector buttons

### Newsletter Step Icons (CustomStepNewsletter.vue)

22. **Benefits Checkmark** (✓)
    - File: `icon-check.png`
    - Size: 20px
    - Purpose: Benefit indicator
    - Usage: Newsletter benefits list

23. **Gift** (🎁)
    - File: `icon-gift.png`
    - Size: 18px
    - Purpose: Newsletter benefit
    - Usage: Benefits list item

24. **Lightning/Speed** (⚡)
    - File: `icon-lightning.png`
    - Size: 18px
    - Purpose: Newsletter benefit (speed)
    - Usage: Benefits list item

### Success Page Icons (CustomSuccess.vue)

25. **Checkmark in Circle** (✓ in circle)
    - File: `icon-check-circle.png`
    - Size: 28px
    - Purpose: Step completion indicator
    - Usage: Email info section

26. **Email Icon** (📧)
    - File: `icon-email-outline.png`
    - Size: 28px
    - Purpose: Email confirmation indicator
    - Usage: Email info section

## Directory Structure

All icons should be placed in:
```
src/assets/custom/icons/
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
    ├── icon-lock.png
    ├── icon-sparkles.png
    ├── icon-pin.png
    ├── icon-pencil.png
    ├── icon-book.png
    ├── icon-envelope.png
    ├── icon-check.png
    ├── icon-gift.png
    ├── icon-lightning.png
    ├── icon-check-circle.png
    └── icon-email-outline.png
```

## Design Guidelines

- **Style**: Consistent, modern, playful but professional
- **Color**: Should work with the primary color scheme (can be filled or outlined)
- **Format**: PNG with transparent background (or SVG)
- **Sizes**: 16px, 18px, 20px, 24px, 28px, 32px, 40px, 48px, 96px as needed
- **Consistency**: All icons should share a similar stroke width, corner radius, and visual weight

## Implementation Notes

- Icons will be imported as components or image elements depending on the approach
- Consider creating an Icons.vue component library to centralize icon management
- All emoji references will be replaced with icon imports
- Icons should be responsive and scale appropriately on mobile

## Priority
- **Phase 1**: Progress bar icons (1-7) - Essential for core UI
- **Phase 2**: Share gate icons (8-10) - Important for share flow
- **Phase 3**: Theme and other icons (11-26) - Nice to have, completes the experience
