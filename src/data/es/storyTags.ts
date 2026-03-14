/**
 * Story Tags - Catalogación Manual de Todos los Cuentos
 * Español - 228 cuentos catalogados por temas
 *
 * Sistema: Cada cuento puede estar en múltiples categorías
 * según su contenido principal y temas transversales.
 */

export const storyTags: Record<string, string[]> = {
  // ============================================
  // EMOCIONES Y SENTIMIENTOS
  // ============================================

  miedo: [
    'el-finalizador', // Miedo al fracaso
    'el-traga-luces-un-cuento-de-misterio-y-luz', // Miedo a lo desconocido
    'el-experimento-de-las-sombras-en-la-oscuridad', // Miedo a la oscuridad
    'la-luz-que-se-apaga', // Miedo a perder la luz/esperanza
    'lancelot-y-el-dragon-del-infinito-miedo', // Confrontar el miedo
    'partirse-de-miedo', // Miedo extremo
    'boo-oh-no', // Miedo infantil/fantasmas
    'la-leyenda-del-jinete-sin-cabeza', // Leyenda de miedo
    'el-grito-del-kraken', // Miedo marino
  ],

  valentía: [
    'llamarina-la-gota-de-agua-valiente', // Valentía de lo pequeño
    'equipo-sdg-la-aventura-del-jaguar-perdido', // Coraje en equipo
    'la-aventura-de-lluc-y-el-dragon-de-almendra', // Enfrentar dragón
    'guillermin-y-el-bosque-encantado-una-aventura-magica', // Exploración valiente
    'valiente-y-el-goblin', // Valentía directa
  ],

  amor: [
    'el-metriquista', // Amor romántico
    'el-segador-de-almas-una-historia-de-amistad-y-equilibrio', // Amor y sacrificio
    'el-suelo-radiante-y-las-cascaras-de-amor', // Amor incondicional
    'la-leyenda-de-la-bailarina-de-fuego', // Amor apasionado
    'una-historia-de-escamas-y-suspiros', // Amor épico
  ],

  amistad: [
    'el-segador-de-almas-una-historia-de-amistad-y-equilibrio', // Amistad profunda
    'el-demonio-y-la-cucharita-perdida', // Amistad inesperada
    'delimencia-la-ciudad-entre-dos-mundos', // Amistad y trabajo en equipo
    'equipo-sdg-la-aventura-del-jaguar-perdido', // Equipo de amigos
    'la-union-de-los-reinos', // Amistad que une mundos
    'ricardo-roncador-y-el-gran-concierto-de-suenos', // Amistad musical
    'bastian-y-su-tripulacion-estelar', // Amistad cósmica
  ],

  soledad: [
    'el-traga-luces-un-cuento-de-misterio-y-luz', // Soledad y deseo de conexión
    'el-segador-de-almas-una-historia-de-amistad-y-equilibrio', // Soledad del guardián
    'la-calle-olvidada', // Soledad en la ciudad
    'la-niebla-del-olvido', // Soledad y olvido
  ],

  empatía: [
    'el-traga-luces-un-cuento-de-misterio-y-luz', // Entender el dolor ajeno
    'el-demonio-y-la-cucharita-perdida', // Compasión hacia otros
    'cascara-amarga-corazon-tierno', // Empatía tras dureza
    'las-palabras-calladas', // Entender lo no dicho
  ],

  alegría: [
    'los-22000', // Mundo de colores y alegría
    'el-reino-olvidado-aventuras-bajo-el-sofa', // Diversión y risa
    'flap-flap', // Diversión simple
  ],

  tristeza: [
    'la-cancion-perdida', // Nostalgia y pérdida
    'el-final-del-ayer', // Melancolia del tiempo
    'la-silueta-rota', // Dolor existencial
  ],

  // ============================================
  // AVENTURA Y EXPLORACIÓN
  // ============================================

  aventura: [
    'equipo-sdg-la-aventura-del-jaguar-perdido',
    'delimencia-la-ciudad-entre-dos-mundos',
    'la-aventura-de-lluc-y-el-dragon-de-almendra',
    'guillermin-y-el-bosque-encantado-una-aventura-magica',
    'la-aventura-de-la-galleta-de-estrellas-y-el-enigma-de-avogadro',
    'el-reino-olvidado-aventuras-bajo-el-sofa',
    'el-viaje-del-dragon-de-fuego',
    'la-casa-de-las-1000-puertas',
    'paco-y-el-laberinto-de-los-suenos',
    'llamarada-y-la-isla-de-los-suenos-perdidos',
    'llamarada-y-el-bosque-de-los-mil-colores',
    'eloy-y-el-banquete-del-faraon',
    'eloy-y-la-gran-muralla-de-cuchara',
    'eloy-y-la-gran-travesia-alpina',
    'eloy-y-el-oso-danzarin',
    'eloy-y-los-gladiadores-lanzadores-de-espaguetis',
    'eloy-y-la-hidromiel-vikinga',
    'eloy-y-el-misterio-del-calendario-azteca',
    'eloy-y-la-ciudad-perdida-de-oro',
    'eloy-y-el-ejercito-de-dragones-de-papel',
    'eloy-y-el-tesoro-perdido-de-barbanegra',
    'eloy-y-el-helado-en-mesopotamia',
    'eloy-y-la-sombrilla-gigante-en-pompeya',
    'eloy-y-sushi-de-los-samurais',
    'eloy-y-el-castillo-de-hielo-en-siberia',
    'eloy-y-el-dulce-mosaico-etrusco',
    'llamarada-y-el-arbol-de-colores',
    'llamarada-y-la-luna-perdida',
    'llamarada-y-el-reloj-de-los-tiempos-congelados',
    'liana-y-la-montana-de-los-suenos',
    'la-leyenda-del-joven-pescador',
    'luna-y-el-laberinto-de-espejos',
    'luna-y-las-burbujas-brillantes',
    'luna-y-los-colores-de-la-lluvia',
    'luna-y-el-puente-de-palitos',
    'luna-y-el-espejismo-en-la-carretera',
    'luna-y-el-misterio-del-vuelo',
    'luna-y-el-misterio-de-las-fuerzas-invisibles',
    'luna-y-el-desafio-de-la-friccion',
    'luna-y-las-luces-perdidas',
    'luna-y-el-secreto-de-las-plantas-felices',
    'bastian-y-la-pastilla-de-jabon-espacial',
    'bastian-y-su-tripulacion-estelar',
  ],

  misterio: [
    'el-traga-luces-un-cuento-de-misterio-y-luz',
    'el-misterio-de-la-isla-cuantica',
    'luna-y-el-misterio-de-la-galaxia-espectral',
    'el-secreto-del-antiguo-reloj',
    'el-secreto-del-frasco-carmesi',
    'el-secreto-zumbido-de-la-mosca-maripi',
    'el-misterioso-bosque-de-las-burbujas',
    'el-misterio-del-mate-encantado',
    'el-misterio-del-gato-de-jade',
    'el-misterio-del-gato-de-oro',
    'el-misterio-del-gato-que-amaba-la-lluvia',
    'el-misterio-de-bella-la-gata-ladrona',
    'el-enigma-del-cinturon-de-caramelo',
    'sdg-el-misterio-del-gato-con-botas-rojas',
    'sdg-el-caso-del-misterioso-maullido-medianoche',
    'la-encrucijada-de-sombra-larga',
    'relojmedio-el-misterio-del-reloj-que-nunca-marcaba-la-medianoche',
    'el-enigma-de-mishi-el-gato-alpinista',
    'el-enigma-del-tramuntanasaurio',
    'el-misterio-del-gato-arcoiris',
    'los-mocos-de-misterio',
    'la-desaparicion-de-lunai-la-gata-invisible',
    'la-maldicion-de-sombra-el-gato-negro',
    'el-misterio-de-la-cueva-de-carlota-cucaracha',
  ],

  // ============================================
  // MAGIA Y FANTASÍA
  // ============================================

  magia: [
    'el-demonio-y-la-cucharita-perdida',
    'guillermin-y-el-bosque-encantado-una-aventura-magica',
    'la-traviesa-gravedad-una-aventura-magica-en-el-parque',
    'el-taller-secreto-de-luna-la-inventora-de-estrellas',
    'las-aventuras-de-las-llaves-traviesas',
    'delimencia-la-ciudad-entre-dos-mundos',
    'el-rito-del-arcano',
    'el-telefono-movil-magico-y-los-monstruitos-del-juego',
    'el-kebab-magico-de-milo',
    'el-trenzado-magico',
    'el-show-de-magia-de-carlota-cucaracha',
    'el-dragon-que-queria-ser-bibliotecario',
    'el-cuento-de-golemin',
    'el-domador-de-espiritus',
    'orbe-del-engano',
    'tupi-y-su-sombrero',
    'tupi-y-el-duende-bromista',
    'tupi-y-los-cambios-curiosos',
  ],

  transformación: [
    'el-finalizador', // Transformación personal
    'la-traviesa-gravedad-una-aventura-magica-en-el-parque', // Cambio de perspectiva
    'el-unicornio-de-cuerno-desmontable', // Identidad flexible
    'el-payaso-que-aprendio-a-volar', // Transformación de limitaciones
    'el-trenzado-magico', // Transformación mágica
    'valiente-y-el-goblin', // Transformación del mundo
  ],

  // ============================================
  // CRECIMIENTO PERSONAL
  // ============================================

  superación: [
    'el-finalizador',
    'llamarina-la-gota-de-agua-valiente',
    'el-experimento-de-las-sombras-en-la-oscuridad',
    'el-traspies-del-mago',
    'el-reconstructor-de-finales',
    'cascara-amarga-corazon-tierno',
  ],

  responsabilidad: [
    'el-demonio-y-la-cucharita-perdida',
    '458-el-robot-con-corazon',
    'el-problema-de-transparencia',
    'luna-reflexiones-sobre-reflexiones',
  ],

  aprendizaje: [
    'el-metriquista',
    'riquitin-el-cavernicola-contador-de-piedras',
    'la-aventura-de-la-galleta-de-estrellas-y-el-enigma-de-avogadro',
    'el-viaje-de-nombres-de-almendra',
    'luna-y-el-secreto-del-calor',
    'luna-y-el-centro-de-gravedad',
    'luna-y-la-presion',
    'luna-y-la-aventura-del-sonido',
    'luna-y-el-eco-de-la-montana',
  ],

  descubrimiento: [
    'encuentra-mi-eso-la-aventura-de-lia-en-arcoiris',
    'el-cuento-de-golemin',
    'brizolin-la-brizna-de-hierba-que-sonaba-con-el-cielo',
    'los-recolectores-de-brillos',
    'un-unicornio-de-lo-mas-normal',
    'una-historia-de-escamas-y-suspiros',
  ],

  // ============================================
  // TECNOLOGÍA Y CIENCIA
  // ============================================

  tecnología: [
    'delimencia-la-ciudad-entre-dos-mundos',
    '458-el-robot-con-corazon',
    'el-telefono-movil-magico-y-los-monstruitos-del-juego',
    'el-misterio-de-la-isla-cuantica',
    'la-aventura-de-la-galleta-de-estrellas-y-el-enigma-de-avogadro',
    'el-susurro-de-las-ondas-virtuales',
    '458-y-el-enigma-del-futuro-perdido',
    'bastian-y-su-tripulacion-estelar',
    'la-maquina-de-historias-vivientes',
  ],

  ciencia: [
    'luna-y-el-secreto-del-calor',
    'luna-y-el-centro-de-gravedad',
    'luna-y-la-presion',
    'luna-y-la-aventura-del-sonido',
    'luna-y-el-misterio-del-vuelo',
    'luna-y-el-desafio-de-la-friccion',
    'luna-y-el-misterio-de-las-fuerzas-invisibles',
    'el-misterio-de-la-isla-cuantica',
  ],

  inteligencia: [
    'la-aventura-de-la-galleta-de-estrellas-y-el-enigma-de-avogadro',
    'riquitin-el-cavernicola-contador-de-piedras',
    'el-reino-de-azaralia-y-el-dado-de-la-discordia',
    'los-angulos-perfectos',
    'el-reino-de-las-formas-la-guerra-milenaria',
    'la-danza-de-la-norma',
    'paco-y-el-laberinto-de-los-suenos',
    'la-historia-de-rodolfo-el-raton-ingenioso',
  ],

  // ============================================
  // DIVERSIDAD E INCLUSIÓN
  // ============================================

  diversidad: [
    'delimencia-la-ciudad-entre-dos-mundos',
    'equipo-sdg-la-aventura-del-jaguar-perdido',
    'los-22000',
    'los-habitantes-de-miniapolis',
  ],

  // ============================================
  // NATURALEZA Y MEDIO AMBIENTE
  // ============================================

  naturaleza: [
    'guillermin-y-el-bosque-encantado-una-aventura-magica',
    'el-valle-de-las-luciernagas-doradas',
    'la-moneda-azul',
    'llamarina-la-gota-de-agua-valiente',
    'brizolin-la-brizna-de-hierba-que-sonaba-con-el-cielo',
    'la-travesia-de-la-nube-viajera',
    'el-vuelo-del-pajaro-de-cristal',
    'el-bosque-de-los-susurros',
    'el-bosque-de-los-suenos-olvidados',
    'la-leyenda-de-baba-yaga',
    'las-mil-grullas-de-papel',
    'el-cuco-y-su-canto-misterioso',
    'luna-y-el-secreto-de-las-plantas-felices',
    'la-ciudad-de-los-relatos-vivientes',
  ],

  agua: [
    'llamarina-la-gota-de-agua-valiente',
    'la-moneda-azul',
    'aris-el-mejillon-sin-rumbo',
    'la-leyenda-del-barco-fantasma',
    'la-leyenda-del-joven-pescador',
    'el-grito-del-kraken',
  ],

  // ============================================
  // CURIOSIDAD Y DESCUBRIMIENTO
  // ============================================

  curiosidad: [
    'el-metriquista',
    'el-cuento-de-golemin',
    'encuentra-mi-eso-la-aventura-de-lia-en-arcoiris',
    'el-bosque-de-los-susurros',
    'el-bosque-de-los-suenos-olvidados',
  ],

  // ============================================
  // REDENCIÓN Y SEGUNDA OPORTUNIDAD
  // ============================================

  redención: [
    'el-traga-luces-un-cuento-de-misterio-y-luz',
    'el-traspies-del-mago',
    'cascara-amarga-corazon-tierno',
    'el-monstruo-del-chirriar',
  ],

  // ============================================
  // HISTORIAS CONECTADAS - SAGAS/SERIES
  // ============================================

  'el-finalizador-saga': [
    'el-finalizador',
    'el-regreso-de-el-finalizador',
    'el-reconstructor-de-finales',
  ],

  'el-traga-luces-saga': [
    'el-traga-luces-un-cuento-de-misterio-y-luz',
    'antes-de-las-sombras-la-llamada-del-traga-luces',
  ],

  'relojmedio-saga': [
    'relojmedio-el-misterio-del-reloj-que-nunca-marcaba-la-medianoche',
    'relojmedio-la-busqueda-de-la-llave-del-tiempo',
    'relojmedio-el-despertar-de-las-sombras-y-la-llave-perdida',
    'relojmedio-viajeros-del-tiempo-y-secretos-desvelados',
  ],

  'paco-el-cacahuete-saga': [
    'paco-el-cacahuete-sonador-y-la-luna-cantarina',
    'paco-el-cacahuete-y-el-dilema-del-sueno-eterno',
    'paco-y-el-laberinto-de-los-suenos',
    'paco-el-cacahuete-y-el-primer-sueno-lucido',
    'paco-y-la-guia-de-los-suenos',
  ],

  'carlota-cucaracha-saga': [
    'el-gran-barrial-de-carlota-cucaracha',
    'el-sotano-de-los-secretos-de-carlota-cucaracha',
    'carlota-cucaracha-y-la-sinfonia-nocturna',
    'el-misterio-de-la-cueva-de-carlota-cucaracha',
    'el-debate-del-monton-de-hojas',
    'el-show-de-magia-de-carlota-cucaracha',
    'el-castillo-de-arena-de-carlota-cucaracha',
    'carlota-cucaracha-y-el-bosque-de-cristal',
    'carlota-cucaracha-y-la-montana-de-cristal',
    'los-desesperados-vecinos-de-carlota-cucaracha',
    'carlota-y-las-carreras-nocturnas-del-caracol',
  ],

  'luna-personaje': [
    'el-taller-secreto-de-luna-la-inventora-de-estrellas',
    'luna-y-el-misterio-de-la-galaxia-espectral',
    'luna-y-el-secreto-del-calor',
    'luna-y-el-centro-de-gravedad',
    'luna-y-la-presion',
    'luna-y-la-aventura-del-sonido',
    'luna-y-el-misterio-del-vuelo',
    'luna-y-el-puente-de-palitos',
    'luna-y-los-colores-de-la-lluvia',
    'luna-y-las-luces-perdidas',
    'luna-y-el-espejismo-en-la-carretera',
    'luna-y-las-burbujas-brillantes',
    'luna-y-el-laberinto-de-espejos',
    'luna-y-el-descanso-del-sol',
    'luna-reflexiones-sobre-reflexiones',
    'luna-y-el-eco-de-la-montana',
  ],

  'llamarada-personaje': [
    'llamarina-la-gota-de-agua-valiente',
    'llamarada-y-la-isla-de-los-suenos-perdidos',
    'llamarada-y-el-bosque-de-los-mil-colores',
    'llamarada-y-el-arbol-de-colores',
    'llamarada-y-la-luna-perdida',
    'llamarada-y-el-reloj-de-los-tiempos-congelados',
  ],

  'eloy-personaje': [
    'eloy-y-el-banquete-del-faraon',
    'eloy-y-la-gran-muralla-de-cuchara',
    'eloy-y-la-gran-travesia-alpina',
    'eloy-y-el-oso-danzarin',
    'eloy-y-los-gladiadores-lanzadores-de-espaguetis',
    'eloy-y-la-hidromiel-vikinga',
    'eloy-y-el-misterio-del-calendario-azteca',
    'eloy-y-la-ciudad-perdida-de-oro',
    'eloy-y-el-ejercito-de-dragones-de-papel',
    'eloy-y-el-tesoro-perdido-de-barbanegra',
    'eloy-y-el-helado-en-mesopotamia',
    'eloy-y-la-sombrilla-gigante-en-pompeya',
    'eloy-y-sushi-de-los-samurais',
    'eloy-y-el-castillo-de-hielo-en-siberia',
    'eloy-y-el-dulce-mosaico-etrusco',
    'eloy-y-el-dragon-del-queso-perdido',
    'el-gran-desierto-y-el-camello-corredor',
    'eloy-y-las-palomitas-renacentistas',
  ],

  'sdg-sistema-distribucion-gatos': [
    'equipo-sdg-la-aventura-del-jaguar-perdido',
    'sdg-el-misterio-del-gato-con-botas-rojas',
    'sdg-el-caso-del-misterioso-maullido-medianoche',
    'la-historia-de-pipo-el-gato-viajero',
    'la-historia-de-buntu-el-gato-bizco',
    'la-banda-de-los-gatos-musicos',
    'el-tesoro-de-barbai-el-gato-pirata',
    'la-busqueda-de-parches-el-gato-de-la-granja',
    'el-misterio-del-gato-de-jade',
    'el-misterio-del-gato-de-oro',
    'el-misterio-del-gato-que-amaba-la-lluvia',
    'el-enigma-de-mishi-el-gato-alpinista',
    'la-fuga-de-diego-el-gato-travieso',
    'el-arte-secreto-de-la-gata-mia',
    'la-desaparicion-de-lunai-la-gata-invisible',
    'la-maldicion-de-sombra-el-gato-negro',
    'la-busqueda-de-rocky-el-gato-escapista',
  ],

  'sombra-larga-ciudad': [
    'la-encrucijada-de-sombra-larga',
    'la-leyenda-de-la-dama-de-la-niebla',
    'los-mocos-de-misterio',
    'ojos-en-la-niebla',
    'entre-sombras-y-maullidos',
    'el-misterio-del-gato-de-jade',
    'el-misterio-del-gato-de-oro',
    'el-misterio-del-gato-que-amaba-la-lluvia',
    'sdg-el-misterio-del-gato-con-botas-rojas',
    'el-enigma-de-mishi-el-gato-alpinista',
    'la-fuga-de-diego-el-gato-travieso',
    'la-maldicion-de-sombra-el-gato-negro',
  ],

  // ============================================
  // POR EDAD - PEQUEÑOS (3-5 años)
  // ============================================

  'infantil-pequenos': [
    'el-demonio-y-la-cucharita-perdida',
    'el-reino-olvidado-aventuras-bajo-el-sofa',
    'flap-flap',
    'boo-oh-no',
    'un-unicornio-de-lo-mas-normal',
    'el-dragon-de-los-cubitos',
    'los-mocos-de-misterio',
    'las-aventuras-de-las-llaves-traviesas',
    'el-payaso-que-aprendio-a-volar',
  ],

  // ============================================
  // POR EDAD - MEDIANOS (6-8 años)
  // ============================================

  'infantil-medianos': [
    'la-traviesa-gravedad-una-aventura-magica-en-el-parque',
    'el-telefono-movil-magico-y-los-monstruitos-del-juego',
    'guillermin-y-el-bosque-encantado-una-aventura-magica',
    'la-aventura-de-lluc-y-el-dragon-de-almendra',
    'riquitin-el-cavernicola-contador-de-piedras',
    'la-aventura-de-la-galleta-de-estrellas-y-el-enigma-de-avogadro',
    'el-taller-secreto-de-luna-la-inventora-de-estrellas',
    '458-el-robot-con-corazon',
    'el-cuento-de-golemin',
    'el-domador-de-espiritus',
  ],

  // ============================================
  // POR EDAD - MAYORES (9+ años)
  // ============================================

  'infantil-mayores': [
    'delimencia-la-ciudad-entre-dos-mundos',
    'equipo-sdg-la-aventura-del-jaguar-perdido',
    'el-segador-de-almas-una-historia-de-amistad-y-equilibrio',
    'el-finalizador',
    'el-metriquista',
    'el-traga-luces-un-cuento-de-misterio-y-luz',
    'la-moneda-azul',
    'el-secreto-del-antiguo-reloj',
    'encuentra-mi-eso-la-aventura-de-lia-en-arcoiris',
    'el-experimento-de-las-sombras-en-la-oscuridad',
  ],

  // ============================================
  // CARACTERÍSTICAS ESPECIALES
  // ============================================

  'historias-con-personajes-animales': [
    'la-historia-de-pipo-el-gato-viajero',
    'la-historia-de-buntu-el-gato-bizco',
    'la-banda-de-los-gatos-musicos',
    'el-tesoro-de-barbai-el-gato-pirata',
    'la-busqueda-de-parches-el-gato-de-la-granja',
    'el-misterio-del-gato-de-jade',
    'el-misterio-del-gato-de-oro',
    'el-misterio-del-gato-que-amaba-la-lluvia',
    'el-enigma-de-mishi-el-gato-alpinista',
    'la-fuga-de-diego-el-gato-travieso',
    'el-arte-secreto-de-la-gata-mia',
    'la-desaparicion-de-lunai-la-gata-invisible',
    'la-maldicion-de-sombra-el-gato-negro',
    'la-busqueda-de-rocky-el-gato-escapista',
    'mia-y-el-secreto-de-las-siete-colas',
    'carlota-cucaracha-y-la-sinfonia-nocturna',
    'la-luz-de-lucia',
    'riquitin-el-cavernicola-contador-de-piedras',
    'el-molino-de-los-zorros-guardianes',
    'aris-el-mejillon-sin-rumbo',
    'el-castillo-encantador-de-arangon-la-chinchilla',
    'las-aventuras-de-sol-y-sombra',
    'la-historia-de-buntu-el-gato-bizco',
    'la-gran-aventura-de-zetsy-y-su-pata-perdida',
    'antonov-el-domador-de-loros',
    'el-gran-barrial-de-carlota-cucaracha',
    'el-sotano-de-los-secretos-de-carlota-cucaracha',
    'el-debate-del-monton-de-hojas',
    'el-tango-argentino-de-los-pinguinos',
    'brizolin-la-brizna-de-hierba-que-sonaba-con-el-cielo',
    'el-cuco-y-su-canto-misterioso',
    'una-historia-de-escamas-y-suspiros',
  ],

  'historias-con-time-travel-reloj': [
    'la-llave-del-tiempo',
    'la-historia-de-tic-el-reloj-que-viajaba-en-el-tiempo',
    'relojmedio-el-misterio-del-reloj-que-nunca-marcaba-la-medianoche',
    'relojmedio-la-busqueda-de-la-llave-del-tiempo',
    'relojmedio-el-despertar-de-las-sombras-y-la-llave-perdida',
    'relojmedio-viajeros-del-tiempo-y-secretos-desvelados',
    'el-juego-del-tiempo',
    'llamarada-y-el-reloj-de-los-tiempos-congelados',
  ],

  'historias-con-musica': [
    'la-cancion-perdida',
    'carlota-cucaracha-y-la-sinfonia-nocturna',
    'ricardo-roncador-y-el-gran-concierto-de-suenos',
    'la-banda-de-los-gatos-musicos',
    'paco-el-cacahuete-sonador-y-la-luna-cantarina',
    'la-leyenda-del-esqueleto-bailarin',
  ],

  'historias-con-suenos': [
    'paco-el-cacahuete-sonador-y-la-luna-cantarina',
    'paco-el-cacahuete-y-el-dilema-del-sueno-eterno',
    'paco-y-el-laberinto-de-los-suenos',
    'paco-el-cacahuete-y-el-primer-sueno-lucido',
    'paco-y-la-guia-de-los-suenos',
    'liana-y-la-montana-de-los-suenos',
    'el-bosque-de-los-suenos-olvidados',
    'llamarada-y-la-isla-de-los-suenos-perdidos',
    'ricardo-roncador-y-el-gran-concierto-de-suenos',
    'ada-y-el-parque-de-los-suenos-insolitos',
  ],

  'historias-con-luz': [
    'el-traga-luces-un-cuento-de-misterio-y-luz',
    'la-luz-de-lucia',
    'la-luz-que-se-apaga',
    'luz-y-sombra-en-el-jardin-de-los-silencios',
    'los-recolectores-de-brillos',
    'antes-de-las-sombras-la-llamada-del-traga-luces',
    'kogi-la-luz-oculta',
    'luna-y-las-luces-perdidas',
    'el-festival-del-arcoiris-perdido',
    'la-chispa-del-asombro',
  ],

  'historias-de-leyendas': [
    'la-leyenda-de-la-dama-de-la-niebla',
    'la-leyenda-del-joven-pescador',
    'la-leyenda-de-la-insomne-sombra',
    'la-leyenda-de-baba-yaga',
    'la-leyenda-del-pasadizo-celeste',
    'la-leyenda-del-hombre-del-sombrero',
    'la-leyenda-del-jinete-sin-cabeza',
    'la-leyenda-del-gnomo-malhumorado',
    'la-leyenda-del-esqueleto-bailarin',
    'la-leyenda-de-melusina',
    'la-leyenda-del-barco-fantasma',
    'la-leyenda-de-los-caballos-fantasma',
    'la-leyenda-de-los-rokurokubi',
    'la-leyenda-de-anansi',
    'la-leyenda-del-dragon-federico',
    'la-leyenda-de-la-bailarina-de-fuego',
    'la-leyenda-de-la-reina-de-la-noche',
  ],

  'historias-con-dragones': [
    'la-aventura-de-lluc-y-el-dragon-de-almendra',
    'el-viaje-del-dragon-de-fuego',
    'lancelot-y-el-dragon-del-infinito-miedo',
    'el-dragon-que-queria-ser-bibliotecario',
    'el-misterioso-bosque-de-las-burbujas',
    'una-historia-de-escamas-y-suspiros',
    'el-dragon-de-los-cubitos',
    'el-dragon-de-wiltz',
    'la-leyenda-del-dragon-federico',
  ],

  // ============================================
  // NUEVAS CATEGORÍAS - 43 CUENTOS FALTANTES
  // ============================================

  'poesia-lirica': [
    'la-estrella-errante',
    'el-susurro-del-tiempo',
    'el-murmullo-del-silencio',
    'la-estrella-marchita',
    'susurros-cosmicos',
    'la-gota-de-miel-estelar',
    'la-chispa-del-asombro',
  ],

  'filosofia-reflexion': [
    'el-problema-de-transparencia',
    'los-secretos-que-deja-el-sol',
    'las-palabras-calladas',
    'la-silueta-rota',
    'la-danza-de-la-norma',
    'el-juego-del-tiempo',
    'el-arco-infinito',
  ],

  'artesania-creacion': [
    'el-tapiz-de-la-tejedora',
    'la-marana-de-secretos',
    'la-ciudad-de-los-relatos-vivientes',
    'la-maquina-de-historias-vivientes',
    'estallido-primordial',
  ],

  'supernatural-gotico': [
    'estela-espectral',
    'la-leyenda-de-la-dama-de-la-niebla',
    'la-leyenda-de-la-insomne-sombra',
    'la-luna-roja',
    'el-monstruo-del-chirriar',
  ],

  'geometria-formas': [
    'los-angulos-perfectos',
    'el-reino-de-las-formas-la-guerra-milenaria',
  ],

  'historias-con-libros': [
    'la-ciudad-de-los-relatos-vivientes',
    'la-sonrisa-del-tintero-vacio',
  ],

  'viajes-epicos': [
    'el-eco-de-los-pasos-de-unicornio',
    'el-camino-sin-fin',
    'el-viaje-de-nombres-de-almendra',
    'kronar-el-susurro-del-tiempo-roto',
  ],

  'insomnio-noche': [
    'las-horas-sombreadas',
    'el-gran-apagon',
    'la-leyenda-de-la-insomne-sombra',
    'polilla-negra',
  ],

  'identidad-existencia': [
    'la-silueta-rota',
    'las-palabras-calladas',
    'la-danza-de-la-norma',
    'el-problema-de-transparencia',
  ],

  'atardecer-crepusculo': [
    'los-secretos-que-deja-el-sol',
    'el-final-del-ayer',
  ],

  'objetos-magicos-animados': [
    'la-danza-del-destino',
    'el-castillo-encantador-de-arangon-la-chinchilla',
  ],

  'animales-personajes-principales': [
    'antonov-el-domador-de-loros',
    'el-molino-de-los-zorros-guardianes',
    'el-castillo-encantador-de-arangon-la-chinchilla',
    'crispin-y-la-manzana-dorada',
  ],

  'humor-comedia': [
    'crispin-y-la-manzana-dorada',
    'la-danza-del-destino',
  ],

  'eventos-extraordinarios': [
    'impacto-atronador',
    'el-fragmento-perdido',
  ],

  'moraleja-orgullo': [
    'pompas-de-orgullo',
  ],

  'momentos-especiales': [
    'momentos-robados',
    'el-claro-de-las-plumas-danzarinas',
  ],

  'fuego-danza': [
    'la-leyenda-de-la-bailarina-de-fuego',
  ],

  'frio-extremo': [
    'cuarto-de-frio-infernal',
  ],

  'tradicion-leyendas-popul ares': [
    'la-leyenda-de-la-dama-de-la-niebla',
    'la-leyenda-de-la-insomne-sombra',
    'la-leyenda-de-la-bailarina-de-fuego',
  ],

  'misterio-antiguo': [
    'el-fragmento-perdido',
    'la-chispa-del-asombro',
  ],

  'sonido-musica-extraordinaria': [
    'el-monstruo-del-chirriar',
  ],

  'aventura-descubrimiento': [
    'viento-estelar',
    'el-viaje-de-nombres-de-almendra',
    'crispin-y-la-manzana-dorada',
  ],

  'reinos-fantasticos': [
    'el-reino-del-sombrero-torcido',
  ],

  'juguetes-vida': [
    'la-isla-de-los-juguetes-rebeldes',
  ],

  'planetas-mundos': [
    'supermegafrio',
    'los-tiempos-congelados',
  ],

  'mundo-invertido': [
    'los-olvidosos',
  ],

  'objetos-misteriosos': [
    'el-secreto-del-siurell',
    'las-migajas-de-un-secreto',
  ],

  'gigantes-seres-colosales': [
    'el-gigante-de-hollenfels',
  ],

  'mentiras-enganos': [
    'el-sandwich-de-mentiras',
  ],

  'matematicas-correlacion': [
    'correlacion-dulce-en-crunchopolis',
  ],

  'oficio-trabajo': [
    'el-clasificador-de-tornillos',
  ],
};
