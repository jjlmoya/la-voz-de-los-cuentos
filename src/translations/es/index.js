import account from './account'
import landing from './landing'

import characters from './characters'

const tutorials = {
  'tutorials.progress.title': '¿Cómo funciona el progreso?',
  'tutorials.progress.description':
    '¡A medida que te sumerjas en estas divertidas historias, empezarán a aparecer aquí! Cada cuento tiene su propia barra de progreso, como un pequeño rastreador de aventuras en la parte de abajo de la imagen.',
  'tutorials.progress.toStart': 'Aún no empezado',
  'tutorials.progress.started': '¡Ya has empezado!',
  'tutorials.progress.finished': '¡Cuento terminado!'
}
export default {
  ...tutorials,
  ...landing,
  ...account,
  ...characters,
  'menu.home': 'Inicio',
  'menu.stories': 'Cuentos',
  'menu.sagas': 'Sagas',
  'menu.characters': 'Personajes',
  'menu.account': 'Cuenta',
  'menu.custom': 'Cuento Personalizado',
  'menu.newsletter': 'NewsLetters',

  'section.news': 'Novedades',
  'section.sagas': 'Sagas Destacadas',

  'footer.newsletter': 'Newsletter Mensual',
  'footer.newsletter.button': 'Enviar',

  'footer.sagas': 'Sagas',

  'footer.community': 'Nuestras Comunidades',
  'footer.interesting': 'Enlaces de Interés',
  'footer.interesting.custom': 'Crear cuento personalizado',
  'footer.interesting.newsletter': 'Pasadas Newsletters',
  'footer.interesting.contact': 'Contactar',

  'page.home.h1': 'Página Principal',
  'page.home.description':
    'Embárcate en un viaje encantado a través de La Voz de los Cuentos, donde cada historia cobra vida y la magia de la narración te envuelve. Descubre relatos antiguos y nuevos, llenos de fantasía, misterio y maravillas, en un reino donde la imaginación no tiene límites.',

  'page.stories.h1': 'Listado de Cuentos',
  'page.stories.description':
    'Nuestra colección de cuentos mágicos, cientos de cuentos esperando a ser descubiertos',
  'page.stories.searcher.placeholder': 'Buscar cuento...',

  'page.stories.changeview': 'Cambiar Modo de Vista',
  'page.stories.order.date': 'Fecha',
  'page.stories.order.duration': 'Duración',
  'page.stories.order.name': 'Nombre',

  'page.story.font.aria': 'Elige el tamaño de fuente',

  'page.story.share': 'Comparte y disfruta',
  'page.story.related': 'Cuentos Relacionados',
  'page.story.share.aria': 'Compartir en',

  'page.sagas.h1': 'Nuestras Sagas Mágicas',
  'page.sagas.description':
    'Explora todas nuestras sagas encantadas y sumérgete en mundos mágicos llenos de aventuras.',

  'page.saga.stories': 'Cuentos de la Saga',

  'page.custom.input.name': 'Nombre del protagonista',
  'page.custom.input.story': 'Cuéntanos los detalles de tu cuento',
  'page.custom.input.email': '¿Donde quieres que lo enviemos?',
  'page.custom.input.email.placeholder': 'ejemplo@email.com',
  'page.custom.input.newsletter':
    'Te enviaremos el cuento al correo electrónico, ¿Quieres suscribirte también a la Newsletter Mensual?',

  'page.custom.button.loading': 'Enviando tu petición de cuento mágico...',
  'page.custom.button.success':
    '¡Tu petición se ha enviado con éxito y nos pondremos a ello pronto! Podemos tardar unos días en prepararlo',
  'page.custom.button.error':
    '¡Hubo un error! Inténtalo de nuevo o contacta con nosotros directamente',

  'page.custom.button.accept': 'Sí',
  'page.custom.button.decline': 'No',
  'page.custom.button.next': 'Siguiente',
  'page.custom.button.prev': 'Anterior',

  'slug.stories': 'cuentos',
  'slug.sagas': 'sagas',

  'page.404.message':
    '¡Oh no! Parece que la página que buscas se ha perdido en un cuento mágico.',
  'page.404.title': '404 - Página No Encontrada',
  'page.404.link': 'Inicio',

  'page.newsletters.h1': 'Listado de News Audio Letter',
  'page.newsletters.description':
    'Las novedades y lo que está por venir, para que conozcas más de los entresijos de La Voz de los Cuentos',

  'cmp.text':
    'Para mejorar la experiencia necesitamos cookies de terceros, sólo usamos Google Analytics ¿Aceptas las cookies?',
  'cmp.accept': 'Aceptar Cookies',
  'cmp.decline': 'Rechazar',

  'footer.newsletters.thanks': '¡Gracias por la suscripción!',
  'footer.newsletters.error': 'Correo no válido',

  'sections.default.more': 'Ver más',

  'page.custom.h1': 'Crea tu Cuento Personalizado',
  'page.custom.description':
    'Bienvenido a nuestra página mágica de creación de cuentos infantiles.Aquí puedes pedir un cuento personalizado de forma gratuita. ¡Deja volar tu imaginación y permítenos crear una historia especial solo para ti!',

  'schema.type': 'Literatura Infantil'
}
