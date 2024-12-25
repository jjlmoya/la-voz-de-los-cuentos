import account from './account'
import landing from './landing'
import characters from './characters'

const tutorials = {
  'tutorials.progress.title': 'How Does Progress Work?',
  'tutorials.progress.description':
    'As you dive into these fun stories, they’ll start to appear here. Each story has its own progress bar, like a little adventure tracker at the bottom of the image!',
  'tutorials.progress.toStart': 'Not Started Yet',
  'tutorials.progress.started': 'You’ve Begun!',
  'tutorials.progress.finished': 'Story Finished!'
}

export default {
  ...characters,
  ...tutorials,
  ...landing,
  ...account,
  'menu.home': 'Home',
  'menu.stories': 'Stories',
  'menu.sagas': 'Sagas',
  'menu.characters': 'Characters',
  'menu.account': 'Account',
  'menu.custom': 'Create a Story',
  'menu.newsletter': 'Newsletter',

  'section.news': "What's New",
  'section.sagas': 'Featured Sagas',

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

  'page.story.font.aria': 'Choose text size',

  'page.story.share': 'Share and Enjoy',
  'page.story.related': 'More Stories Like This',
  'page.story.share.aria': 'Share on',

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

  'page.404.message':
    "Oh no! It looks like the page you're looking for is lost in a magical story.",
  'page.404.title': '404 - Page Not Found',
  'page.404.link': 'Home',

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

  'spotify.voice': 'Voice'
}
