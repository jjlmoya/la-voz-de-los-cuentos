/**
 * Mapping of Tags/Categories to Stories (English)
 *
 * Quick search system to find stories by theme
 * when you're creating blog posts.
 *
 * Usage:
 * - If you need stories about "fear": search in the 'fear' key
 * - If you need stories about "adventure": search in the 'adventure' key
 * - etc.
 */

export const storyTags: Record<string, string[]> = {
  // Emotions and Feelings
  fear: [
    'the-finisher', // Fear of failure, not finishing
    'lighteater-a-tale-of-mystery-and-light', // Fear of the unknown
    'the-shadow-experiment-in-the-darkness', // Fear of darkness
    'the-light-that-fades', // Fear of losing things
  ],

  courage: [
    'flamerina-the-brave-water-drop', // Courage of a small drop
    'the-lost-jaguar-adventure', // Team courage
    'lluc\'s-adventure-and-the-almond-dragon', // Facing fears
    'willie-and-the-enchanted-forest-a-magical-adventure', // Brave exploration
  ],

  love: [
    'the-feelingsmith', // Romantic love
    'the-soul-reaper-a-story-of-friendship-and-balance', // Love and sacrifice
    'the-radiant-ground-and-the-shells-of-love', // Unconditional love
  ],

  friendship: [
    'the-soul-reaper-a-story-of-friendship-and-balance', // Deep friendship
    'the-demon-and-the-lost-spoon', // Unexpected friendship
    'delimencia-the-city-between-two-worlds', // Friendship and teamwork
    'the-lost-jaguar-adventure', // Friendship in teams
  ],

  loneliness: [
    'lighteater-a-tale-of-mystery-and-light', // Loneliness and desire for connection
    'the-soul-reaper-a-story-of-friendship-and-balance', // Guardian's loneliness
  ],

  empathy: [
    'lighteater-a-tale-of-mystery-and-light', // Understanding others' pain
    'the-demon-and-the-lost-spoon', // Compassion towards the unknown
  ],

  // Adventure and Exploration
  adventure: [
    'the-lost-jaguar-adventure', // Adventurous search
    'delimencia-the-city-between-two-worlds', // Epic exploration
    'lluc\'s-adventure-and-the-almond-dragon', // Adventurous journey
    'willie-and-the-enchanted-forest-a-magical-adventure', // Magical adventure
    'the-adventure-of-the-star-cookie-and-the-avogadro-enigma', // Scientific adventure
    'the-forgotten-kingdom-adventures-under-the-couch', // Adventure in the everyday
  ],

  mystery: [
    'lighteater-a-tale-of-mystery-and-light', // Wrapped mystery
    'the-mystery-of-quantum-island', // Scientific mystery
    'luna-and-the-mystery-of-the-spectral-galaxy', // Cosmic mystery
    'the-secret-of-the-ancient-clock', // Revealed secret
    'the-secret-of-the-crimson-bottle', // Guarded mystery
  ],

  // Magical and Fantasy Themes
  magic: [
    'the-demon-and-the-lost-spoon', // Casual magic
    'willie-and-the-enchanted-forest-a-magical-adventure', // Enchanted forest
    'the-mischievous-gravity-a-magical-adventure-in-the-park', // Everyday magic
    'lunas-secret-workshop-the-star-inventor', // Creative magic
    'the-adventures-of-the-mischievous-keys', // Magical objects
    'delimencia-the-city-between-two-worlds', // Magic and technology
    'the-rite-of-the-arcane', // Ritualistic magic
    'the-magical-mobile-phone-and-the-game-monsters', // Modern magic
  ],

  transformation: [
    'the-finisher', // Personal transformation
    'the-mischievous-gravity-a-magical-adventure-in-the-park', // Change of perspective
    'the-unicorn-with-the-removable-horn', // Flexible identity
  ],

  // Personal Growth
  overcoming: [
    'the-finisher', // Overcoming fears and completing
    'flamerina-the-brave-water-drop', // Overcoming limitations
    'the-shadow-experiment-in-the-darkness', // Overcoming darkness
  ],

  responsibility: [
    'the-demon-and-the-lost-spoon', // Responsibility when using magic
    '458-the-robot-with-a-heart', // Emotional responsibility
  ],

  learning: [
    'the-feelingsmith', // Learning about emotions
    'rickyteen-the-caveman-stone-counter', // Learning to count
    'the-adventure-of-the-star-cookie-and-the-avogadro-enigma', // Learning science
  ],

  // Technology and Science
  technology: [
    'delimencia-the-city-between-two-worlds', // Magic and technology
    '458-the-robot-with-a-heart', // Robot with emotions
    'the-magical-mobile-phone-and-the-game-monsters', // Modern technology
    'the-mystery-of-quantum-island', // Quantum science
    'the-adventure-of-the-star-cookie-and-the-avogadro-enigma', // Chemistry and science
  ],

  intelligence: [
    'the-adventure-of-the-star-cookie-and-the-avogadro-enigma', // Puzzle solving
    'rickyteen-the-caveman-stone-counter', // Mathematical thinking
    'the-kingdom-of-luckoria-and-the-dice-of-discord', // Strategy and games
  ],

  // Diversity and Inclusion
  diversity: [
    'delimencia-the-city-between-two-worlds', // Beings from different worlds
    'the-lost-jaguar-adventure', // Diverse team
  ],

  // Nature and Environment
  nature: [
    'willie-and-the-enchanted-forest-a-magical-adventure', // Forest
    'the-valley-of-the-golden-fireflies', // Magical nature
    'the-blue-coin', // Nature and values
    'flamerina-the-brave-water-drop', // Water and nature
  ],

  // Curiosity and Discovery
  curiosity: [
    'the-feelingsmith', // Curiosity about emotions
    'the-story-of-clayby', // Discovery of purpose
    'find-my-that-lia\'s-adventure-in-rainbow', // Self-discovery
  ],

  // Redemption and Second Chance
  redemption: [
    'lighteater-a-tale-of-mystery-and-light', // Redemption through empathy
    'the-misstep-of-the-magician', // Learning from mistakes
  ],

  // For Specific Ages (optional, but useful)
  'little-ones': [
    'the-demon-and-the-lost-spoon', // Very simple, fun
    'the-forgotten-kingdom-adventures-under-the-couch', // Simple imagination
    'flap-flap', // Rhythm and sound
  ],

  'middle-children': [
    'the-mischievous-gravity-a-magical-adventure-in-the-park', // For the curious
    'the-magical-mobile-phone-and-the-game-monsters', // Contemporary
    'the-adventures-of-the-mischievous-keys', // Personified objects
  ],

  'older-children': [
    'delimencia-the-city-between-two-worlds', // Complex but fascinating
    'the-lost-jaguar-adventure', // Deep adventure
    '458-the-robot-with-a-heart', // Complex emotions
  ],
};
