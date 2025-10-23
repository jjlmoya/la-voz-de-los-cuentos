import account from './account'
import landing from './landing'
import achievements from './achievements'
import characters from './characters'

const tutorials = {
  'tutorials.progress.title': 'How Does Progress Work?',
  'tutorials.progress.description':
    'As you dive into these fun stories, they will start to appear here. Each story has its own progress bar, like a little adventure tracker at the bottom of the image!',
  'tutorials.progress.toStart': 'Not Started Yet',
  'tutorials.progress.started': 'You have Begun!',
  'tutorials.progress.finished': 'Story Finished!'
}

const story = {
  'story.related.title': 'Related Stories',
  'story.related.from_saga': 'From saga',
  'story.breadcrumb.home': 'Home',
  'story.breadcrumb.stories': 'Stories'
}

export default {
  ...characters,
  ...tutorials,
  ...story,
  ...landing,
  ...account,
  ...achievements,
  'menu.home': 'Home',
  'menu.stories': 'Stories',
  'menu.sagas': 'Sagas',
  'menu.songs': 'Songs',
  'menu.characters': 'Characters',
  'menu.account': 'Account',
  'menu.custom': 'Create a Story',
  'menu.newsletter': 'Newsletter',

  'section.news': "What's New",
  'section.sagas': 'Featured Sagas',
  'section.songs': 'Songs',

  'footer.newsletter': 'Monthly Newsletter',
  'footer.newsletter.button': 'Subscribe',

  'footer.sagas': 'Sagas',

  'footer.community': 'Join Our Communities',
  'footer.sites': 'Our Sites',

  'footer.interesting': 'Useful Links',
  'footer.interesting.custom': 'Make a Custom Story',
  'footer.interesting.newsletter': 'Previous Newsletters',
  'footer.interesting.contact': 'Contact',

  'page.stories.h1': 'Browse All Stories',
  'page.stories.searcher.placeholder': 'Search for a story...',
  'page.stories.description':
    'Our magical story collection, with hundreds of tales waiting to be discovered.',

  'page.stories.changeview': 'Change view mode',
  'page.stories.order.date': 'Date',
  'page.stories.order.duration': 'Duration',
  'page.stories.order.name': 'Title',

  'page.songs.h1': 'Songs',
  'page.songs.description':
    'Discover all our magical songs based on the stories',
  'page.songs.searcher.placeholder': 'Search for a song...',
  'page.songs.order.date': 'Date',
  'page.songs.order.duration': 'Duration',
  'page.songs.order.name': 'Title',

  'loading.adventure': 'Preparing your adventure...',
  'loading.book': 'Opening the magic book...',
  'loading.characters': 'Waking up the characters...',
  'loading.worlds': 'Creating fantastic worlds...',
  'loading.potions': 'Mixing word potions...',
  'loading.treasures': 'Searching for literary treasures...',

  'page.story.font.aria': 'Choose text size',

  'page.story.share': 'Share and Enjoy',
  'page.story.related': 'More Stories Like This',
  'page.story.share.aria': 'Share on',
  'page.story.listenSong': 'Listen to Song',

  'page.song.playlist': 'Songs',
  'page.song.lyrics': 'Lyrics',
  'page.song.fromStory': 'From the story',
  'page.song.repeat': 'Repeat',
  'page.song.autoplay': 'Autoplay',
  'page.song.shuffle': 'Shuffle',
  'page.song.readStory': 'Read the Story',
  'page.song.description': 'Enjoy singing this musical adaptation of the story {name}. Sing and have fun with this magical children\'s song.',
  'page.song.description.withSaga': 'Enjoy singing this musical adaptation of the story {name} from the {saga} saga. Sing and have fun with this magical children\'s song.',

  'page.sagas.h1': 'Our Magical Sagas',
  'page.sagas.description':
    'Explore all of our enchanting sagas and dive into magical worlds of adventure.',

  'page.saga.stories': 'Stories in This Saga',

  'page.custom.input.name': "Protagonist's Name",
  'page.custom.input.story': 'Tell us about your story',
  'page.custom.input.email': 'Where should we send it?',
  'page.custom.input.email.placeholder': 'example@email.com',
  'page.custom.input.newsletter':
    "We'll email your story to you. Would you like to also get our Monthly Newsletter?",

  'page.custom.button.loading': 'Sending your magical story request...',
  'page.custom.button.success':
    'Your request is on its way! We’ll start working on it and it might take a few days.',
  'page.custom.button.error':
    'Oops! Something went wrong. Please try again or contact us directly.',

  'page.custom.button.accept': 'Yes',
  'page.custom.button.decline': 'No',
  'page.custom.button.next': 'Next',
  'page.custom.button.prev': 'Previous',

  'page.newsletters.h1': 'News Audio Letters',
  'page.newsletters.description':
    "Discover what's new and what's coming next! Get a sneak peek into the world of Bubo Boo and all the exciting adventures ahead.",

  'page.404.title': 'They Stole Our Story!',
  'page.404.message': 'Can you help us find it? Look in these sections',
  'page.404.stories': 'Stories',
  'page.404.sagas': 'Sagas',
  'page.404.songs': 'Songs',
  'page.404.home': 'Home',

  'cmp.text':
    'To improve your experience, we need third-party cookies. We only use Google Analytics. Do you accept cookies?',
  'cmp.accept': 'Accept Cookies',
  'cmp.decline': 'Decline',

  'footer.newsletters.thanks': 'Thank you for subscribing!',
  'footer.newsletters.error': 'Invalid email',

  'sections.default.more': 'See More',

  'page.custom.h1': 'Create Your Personalized Story',
  'page.custom.description':
    'Welcome to our magical story creation page! Here, you can request a personalized story for free. Let your imagination run wild and let us craft a special story just for you!',

  'schema.type': "Children's Literature",

  'page.home.h1': 'Home',
  'page.home.description':
    'Welcome to Bubo Boo! Here, every tale turns into a magical adventure. Explore stories full of wonder and mystery, where imagination soars high and the fun never ends.',

  'spotify.voice': 'Voice',

  'language.switch': 'Leer en Español',
  'language.switch.aria': 'Switch language',

  'achievement.unlocked': 'Achievement Unlocked',
  'achievement.view': 'View Achievement',

  'streak.title': 'Daily Streak',
  'streak.current': 'Current',
  'streak.best': 'Best',
  'streak.days_since': 'Days Since',
  'streak.frozen': '(frozen)',
  'streak.last_read': 'Last read:',
  'streak.no_data': 'Start reading or listening to begin your streak!',
  'streak.legacy_data': 'Unknown streak ({count} items without timestamps)',
  'streak.label': 'day streak',
  'streak.today': 'Today',
  'streak.mon': 'Mon',
  'streak.tue': 'Tue',
  'streak.wed': 'Wed',
  'streak.thu': 'Thu',
  'streak.fri': 'Fri',
  'streak.sat': 'Sat',
  'streak.sun': 'Sun',

  // Custom Story Flow - Welcome
  'page.custom.welcome.start': 'Start',
  'page.custom.welcome.step1.title': 'Give it a Name',
  'page.custom.welcome.step1.description': 'Choose the name of your story\'s main character',
  'page.custom.welcome.step2.title': 'Tell Us Your Story',
  'page.custom.welcome.step2.description': 'Describe what kind of story you\'d like us to create for you',
  'page.custom.welcome.step3.title': 'Receive It by Email',
  'page.custom.welcome.step3.description': 'We\'ll send it to you in 3-5 days, completely ready',

  // Custom Story Flow - Step Name
  'page.custom.step.name.subtitle': 'This will be the name of your story\'s main character',
  'page.custom.step.name.placeholder': 'e.g.: Lucas, Elena, Milo...',
  'page.custom.step.name.suggestions': 'Popular names:',
  'page.custom.step.name.preview': 'Your name will look like this:',

  // Custom Story Flow - Step Story
  'page.custom.step.story.subtitle': 'Describe what kind of story you want. Be creative and include as much detail as you like.',
  'page.custom.step.story.placeholder': 'e.g.: An adventure story where the protagonist travels to a magical forest and meets fantastic creatures...',
  'page.custom.step.story.themes': 'Popular themes:',
  'page.custom.step.story.info': 'Your description will be used to create a unique and personalized story',
  'page.custom.theme.adventure': 'Adventure',
  'page.custom.theme.fantasy': 'Fantasy',
  'page.custom.theme.animals': 'Animals',
  'page.custom.theme.nature': 'Nature',
  'page.custom.theme.space': 'Space',
  'page.custom.theme.pirates': 'Pirates',
  'page.custom.theme.royalty': 'Royalty',
  'page.custom.theme.circus': 'Circus',

  // Custom Story Flow - Step Email
  'page.custom.step.email.subtitle': 'We need your email to send you the story when it\'s ready',
  'page.custom.step.email.valid': 'Valid email',
  'page.custom.step.email.invalid': 'Invalid email',
  'page.custom.step.email.privacy': 'Your email is safe and we\'ll never share it with anyone',
  'page.custom.step.email.timeline': '⏱️ When will you receive it?',
  'page.custom.step.email.timeline.1': 'We receive your request',
  'page.custom.step.email.timeline.2': 'Our creators work on your story',
  'page.custom.step.email.timeline.3': 'We send it to you in 3-5 days',
  'page.custom.step.email.timeline.note': 'Estimated time based on request volume',

  // Custom Story Flow - Step Newsletter
  'page.custom.step.newsletter.subtitle': 'Get more magical stories delivered to your email every month',
  'page.custom.step.newsletter.title': 'Monthly Newsletter',
  'page.custom.step.newsletter.benefit1': 'New stories every month',
  'page.custom.step.newsletter.benefit2': 'Exclusive stories',
  'page.custom.step.newsletter.benefit3': 'Activities and games',
  'page.custom.step.newsletter.benefit4': 'No spam, no ads',
  'page.custom.step.newsletter.disclaimer': 'You can unsubscribe anytime from the emails you receive',

  // Custom Story Flow - Share Gate
  'page.custom.sharegate.title': 'One More Thing to Unlock',
  'page.custom.sharegate.description': 'Help us share the magic with more people. Share the page or a story/song to unlock your personalized story.',
  'page.custom.sharegate.option1': 'Option 1: Share this page',
  'page.custom.sharegate.option2': 'Option 2: Share a story or song',
  'page.custom.sharegate.option2.description': 'Go to any story or song and share it from there',
  'page.custom.sharegate.or': 'Or',
  'page.custom.sharegate.exploreStories': 'Explore Stories',
  'page.custom.sharegate.timesShared': 'times shared',
  'page.custom.sharegate.helped': 'People helped',
  'page.custom.sharegate.shareText': 'Create your own personalized story on La Voz de los Cuentos',
  'page.custom.sharegate.success': 'Thank you! Your story is ready to be submitted.',
  'page.custom.sharegate.continue': 'Submit My Story',

  // Custom Story Flow - Success
  'page.custom.success.message': 'We\'ll get started right away! Your story will be ready in 3-5 days.',
  'page.custom.success.step1': 'Request Received',
  'page.custom.success.step1.desc': 'We\'ve saved all the details of your story',
  'page.custom.success.step2': 'Creation',
  'page.custom.success.step2.desc': 'Our creators write your story',
  'page.custom.success.step3': 'Delivery',
  'page.custom.success.step3.desc': 'We\'ll send it to you by email, completely ready',
  'page.custom.success.email': 'Check your email (including spam) for your story',
  'page.custom.success.home': 'Back to Home',
  'page.custom.success.explore': 'Explore Stories',
  'page.custom.success.footer': 'Thank you for choosing us! If you have any questions, contact us.',

  // Custom Story Flow - Draft & Saving
  'page.custom.draft.saved': 'You have a saved draft',
  'page.custom.draft.continue': 'Continue',
  'page.custom.draft.discard': 'Discard',
  'page.custom.draft.close': 'Close',
  'page.custom.saving': 'Saving...'
}
