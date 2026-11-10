/**
 * CONTENIDO DEL MEDIA KIT
 * ------------------------------------------------------------------
 * Todo lo que Katha puede editar sin tocar código está en este archivo.
 * Cambia los textos, la galería y las colaboraciones aquí.
 */

const BASE = import.meta.env.BASE_URL;
/** Antepone la base del sitio (/portafolio/) a las rutas de public/. */
export const asset = (path: string) => `${BASE}${path.replace(/^\//, '')}`;
/** Ruta de la miniatura ligera de una foto de public/fotos. */
export const thumbOf = (src: string) => src.replace('/fotos/', '/fotos/thumbs/');

export const profile = {
  name: 'Katha Tenorio',
  role: 'Creadora digital · Accesibilidad, inclusión y movilidad',
  tagline:
    'Convierto experiencias reales en historias que conectan desde las vivencias de una mujer usuaria de silla de ruedas, dándole enfoque a la importancia de la inclusión.',
  location: 'Las Condes · Santiago de Chile',
  languages: ['Español'],
  email: 'kathatrabajos@gmail.com',
  whatsapp: '+56958561105',
  whatsappUrl: 'https://wa.me/56958561105',
  social: {
    instagram: '@kathatenorio',
    instagramUrl: 'https://www.instagram.com/kathatenorio/',
    tiktok: '@kathatenorio',
    tiktokUrl: 'https://www.tiktok.com/@kathatenorio',
  },
  photo: asset('/fotos/katha-1.webp'),
  photos: [
    { src: asset('/fotos/katha-1.webp'), alt: 'Katha en silla de ruedas' },
    { src: asset('/fotos/katha-2.webp'), alt: 'Primer plano de Katha' },
    { src: asset('/fotos/katha-3.webp'), alt: 'Katha sentada de blanco' },
    { src: asset('/fotos/katha-4.webp'), alt: 'Katha de negro con collar dorado' },
    { src: asset('/fotos/katha-5.webp'), alt: 'Retrato de Katha' },
    { src: asset('/fotos/katha-6.webp'), alt: 'Katha de blanco sentada' },
    { src: asset('/fotos/katha-7.webp'), alt: 'Katha sonriendo con la mano en la mejilla' },
    { src: asset('/fotos/katha-8.webp'), alt: 'Katha de negro con tenis blancos' },
    { src: asset('/fotos/katha-9.webp'), alt: 'Katha con salida de pelo' },
    { src: asset('/fotos/katha-10.webp'), alt: 'Retrato de Katha' },
    { src: asset('/fotos/katha-11.webp'), alt: 'Katha en la sesion de fotos 11' },
    { src: asset('/fotos/katha-12.webp'), alt: 'Katha en la sesion de fotos 12' },
    { src: asset('/fotos/katha-13.webp'), alt: 'Katha en la sesion de fotos 13' },
    { src: asset('/fotos/katha-14.webp'), alt: 'Katha en la sesion de fotos 14' },
    { src: asset('/fotos/katha-15.webp'), alt: 'Katha en la sesion de fotos 15' },
    { src: asset('/fotos/katha-16.webp'), alt: 'Katha en la sesion de fotos 16' },
    { src: asset('/fotos/katha-17.webp'), alt: 'Katha en la sesion de fotos 17' },
    { src: asset('/fotos/katha-18.webp'), alt: 'Katha en la sesion de fotos 18' },
    { src: asset('/fotos/katha-19.webp'), alt: 'Katha en la sesion de fotos 19' },
    { src: asset('/fotos/katha-20.webp'), alt: 'Katha en la sesion de fotos 20' },
    { src: asset('/fotos/katha-21.webp'), alt: 'Katha en la sesion de fotos 21' },
    { src: asset('/fotos/katha-22.webp'), alt: 'Katha en la sesion de fotos 22' },
    { src: asset('/fotos/katha-23.webp'), alt: 'Katha en la sesion de fotos 23' },
    { src: asset('/fotos/katha-24.webp'), alt: 'Katha en la sesion de fotos 24' },
    { src: asset('/fotos/katha-25.webp'), alt: 'Katha en la sesion de fotos 25' },
    { src: asset('/fotos/katha-26.webp'), alt: 'Katha en la sesion de fotos 26' },
    { src: asset('/fotos/katha-27.webp'), alt: 'Katha en la sesion de fotos 27' },
    { src: asset('/fotos/katha-28.webp'), alt: 'Katha en la sesion de fotos 28' },
    { src: asset('/fotos/katha-29.webp'), alt: 'Katha en la sesion de fotos 29' },
    { src: asset('/fotos/katha-30.webp'), alt: 'Katha en la sesion de fotos 30' },
  ],
  portrait: asset('/fotos/katha-retrato.webp'),
};

export const proposal = [
  { title: 'Accesibilidad', text: 'Cómo se vive un mundo pensado sin tener en cuenta a todas las personas.' },
  { title: 'Inclusión', text: 'Marcas, espacios y equipos que suman en vez de excluir.' },
  { title: 'Movilidad', text: 'Desplazarse, recorrer y proponer rutas posibles desde la silla.' },
  { title: 'Lifestyle', text: 'Lo cotidiano con mirada propia: casa, ciudad, tiempo y estilo.' },
  { title: 'Viajes', text: 'Guías reales de destinos, con rutas accesibles y probadas.' },
  { title: 'Tecnología', text: 'Herramientas y productos que amplían la autonomía.' },
  { title: 'Belleza', text: 'Belleza, moda y cuidado sin escaquearse de la silla de ruedas.' },
  { title: 'Experiencias', text: 'Contenido que se vive, no solo que se ve.' },
  { title: 'Productos', text: 'Reseñas honestas de productos que sí funcionan en la vida diaria.' },
  { title: 'Mirada desde la silla', text: 'Contenido con perspectiva propia: accesibilidad real, no simulada.' },
];

export const services = [
  {
    title: 'Colaboración',
    tag: 'Paquete 1',
    text: '1 reel IG o TikTok.\n+3 historias.\n1 revisión.\nUso orgánico 30 días.',
  },
  {
    title: 'Campaña',
    tag: 'Paquete 2',
    text: '1 Reel IG.\n+1 TikTok.\n+5 historias.\n+1 carrusel.\n2 revisiones.\nUso orgánico 60 días.\nInforme de resultados.',
  },
  {
    title: 'Embajadora',
    tag: 'Paquete 3',
    text: '2 Reels.\n+2 TikToks.\n+10 historias al mes.\nExclusividad de categoría durante la vigencia del contrato.\nInforme mensual.',
  },
];

export interface Talk {
  tag: string;
  title: string;
  text: string;
}

/** Formatos de conferencias, ponencias y talleres. */
export const talks: Talk[] = [
  {
    tag: 'Opción 1',
    title: 'Charla corta (20 minutos)',
    text: 'Ponencia.\n+10 minutos de preguntas.',
  },
  {
    tag: 'Opción 2',
    title: 'Charla completa (40 minutos)',
    text: 'Ponencia.\n+Preguntas.\n+ Sesión de fotos para promocionar en evento.',
  },
  {
    tag: 'Opción 3',
    title: 'Taller de inclusión (2,5 horas)',
    text: 'Dinámicas prácticas para equipos.\n+Material de apoyo.',
  },
  {
    tag: 'Opción 4',
    title: 'Presentación de proyecto empresarial de inclusión laboral o estructural',
    text: 'Reunión previa.\n+Diagnóstico básico de accesibilidad.\n+Ponencia a directivos.\n+Informe con recomendaciones.',
  },
  {
    tag: 'Opción 5',
    title: 'Internacional presencial',
    text: 'Charla completa.\n+ Honorarios.',
  },
  {
    tag: 'Opción 6',
    title: 'Internacional virtual',
    text: 'Charla en vivo.\n+Ensayo técnico previo.',
  },
  {
    tag: 'Opción 7',
    title: 'Universidades privadas y entes públicos no gubernamentales',
    text: '40% de descuento.\na cambio de difusión.',
  },
  {
    tag: 'Opción 8',
    title: 'Universidades públicas y ONG',
    text: 'Charla corta gratuita.\na cambio de difusión.',
  },
  {
    tag: 'Opción 9',
    title: 'Podcasts',
    text: 'A. Sin patrocinio.\nEnviarme audiencia por países, tema, formato, alcance real (oyentes o visitas).\nCharla gratuita 15 minutos a cambio de difusión.\n+ Viáticos.\nB. Con patrocinio, marcas o evento corporativo cuenta como charla.',
  },
];

export interface Project {
  title: string;
  text: string;
}

/** Proyectos desarrollados con Nestlé México entre 2022 y 2024. */
export const projects2022: Project[] = [
  {
    title: 'Unidos por el propósito',
    text: 'Creando oportunidades, cultura del trabajo sin obstáculos y desarrollo de habilidades para un futuro joven digital.',
  },
  {
    title: 'Jóvenes construyendo el futuro',
    text: 'Conferencias nacionales y concientización con el equipo Nestlé sobre la importancia de la inclusión laboral.',
  },
  {
    title: 'B2B Exponencial',
    text: 'Conferencias nacionales y grabación de contenido audiovisual.',
  },
  {
    title: 'Alianza del Pacífico',
    text: 'Conferencia nacional, rueda de prensa y entrevistas sobre la importancia de la inclusión laboral.',
  },
];

export interface Collaboration {
  brand: string;
  campaign: string;
  type?: string;
  description: string;
  result: string;
  image: string;
  href: string;
  /** Texto para el enlace en la tarjeta (por defecto "Ver proyecto"). */
  linkLabel?: string;
  /** Proyectos o hitos que se listan dentro de la tarjeta. */
  projects?: Project[];
  /** Fotos que acompañan al video en un carrusel dentro de la tarjeta. */
  photos?: StatShot[];
  /** Oculta el rótulo superior (p. ej. "Ponente"). */
  hideType?: boolean;
  /** Oculta la línea de campaña / contexto. */
  hideCampaign?: boolean;
  /** Oculta el título de la tarjeta (cuando la sección ya lo muestra). */
  hideTitle?: boolean;
  /** Pinta la descripción de la tarjeta en fucsia. */
  descriptionAccent?: boolean;
  /** Portada propia del video (si no, se usa la miniatura de `image`). */
  poster?: string;
  /** Video reproducible al hacer clic (MP4 propio o embed de la red). */
  video?: {
    /** Archivo local en public/videos/ */
    src: string;
    /** Enlace al post original en la red */
    url: string;
  };
}

export interface MediaPackage {
  id: string;
  name: string;
  tagline: string;
  featured?: boolean;
  items: string[];
  notes: string[];
}

/** Propuestas para marcas: contenido y condiciones; los precios se cotizan aparte. */
export const packages: MediaPackage[] = [
  {
    id: 'ajam',
    name: 'Plan Ajam',
    tagline: 'Para empezar a trabajar juntos',
    items: [
      '1 video publicado en colaboración en Instagram y TikTok',
      '1 sesión de fotografía (medio día, 4 imágenes finales)',
      '1 contenido UGC para la marca',
      '1 story suite en Instagram',
    ],
    notes: [
      'Uso de imagen por máximo 1 año',
      'Sin firma de exclusividad (negociable)',
    ],
  },
  {
    id: 'bueno',
    name: 'Plan Bueno',
    tagline: 'Más presencia, más contenido',
    featured: true,
    items: [
      '3 videos publicados en colaboración en Instagram y TikTok',
      '2 sesiones de fotografía',
      '3 contenidos UGC (Reels y TikTok)',
      'Reportes de métricas de cada pieza',
    ],
    notes: [
      'Uso de imagen por máximo 1 año',
      'Sin firma de exclusividad (negociable)',
      'Participación en reuniones de marca',
    ],
  },
  {
    id: 'conferencias',
    name: 'Plan Conferencias',
    tagline: 'Tu voz en eventos y conferencias',
    items: [
      '1 conferencia o panel (hasta 45 minutos)',
      'Preparación de contenido y material visual propio',
      'Rueda de prensa y atención de medios',
      '1 sesión de fotografía en el evento',
    ],
    notes: [
      'Uso de imagen por máximo 1 año',
      'Sin firma de exclusividad (negociable)',
      'Viáticos de viaje se cotizan aparte',
    ],
  },
];

/** Fotos de los proyectos de inclusión laboral con Nestlé México. */
export const nestlePhotos: StatShot[] = [
  {
    src: asset('/fotos/nestle/nestle-1.webp'),
    title: 'Ecosistema allinN',
    caption: 'Presentación del ecosistema de innovación de Nestlé México.',
    alt: 'Escenario del evento allinN de Nestlé México con pantallas que muestran el ecosistema de innovación',
  },
  {
    src: asset('/fotos/nestle/nestle-2.webp'),
    title: 'Ponencia',
    caption: 'Conferencia sobre inclusión laboral frente al equipo de Nestlé.',
    alt: 'Katha Tenorio en silla de ruedas durante su ponencia en el evento de Nestlé México',
  },
  {
    src: asset('/fotos/nestle/nestle-3.webp'),
    title: 'Reconocimiento',
    caption: 'Reconocimiento al mejor proyecto de inclusión laboral a nivel internacional para Nestlé México.',
    alt: 'Equipo de Nestlé México junto a Katha Tenorio sosteniendo el reconocimiento al mejor proyecto de inclusión laboral a nivel internacional',
  },
  {
    src: asset('/fotos/nestle/nestle-4.webp'),
    title: 'Oficinas Nestlé',
    caption: 'Grabación de contenido audiovisual dentro de las instalaciones de Nestlé México.',
    alt: 'Katha Tenorio con el equipo de Nestlé México dentro de las instalaciones de la empresa',
  },
  {
    src: asset('/fotos/nestle/nestle-5.webp'),
    title: 'Alianza del Pacífico',
    caption: 'Colombia, México y Chile unidos por la inclusión laboral.',
    alt: 'Katha Tenorio y el equipo con las banderas de Colombia, México y Chile en la Alianza del Pacífico',
  },
];

export const collaborations: Collaboration[] = [
  {
    brand: 'Imagen de inclusión laboral para Nestlé México',
    campaign: 'Alianza del Pacífico · Nestlé México',
    type: 'Ponente',
    description:
      'Proyectos de inclusión laboral desarrollados con Nestlé México entre 2022 y 2024.',
    projects: projects2022,
    photos: nestlePhotos,
    hideType: true,
    hideCampaign: true,
    hideTitle: true,
    descriptionAccent: true,
    result: '',
    image: asset('/fotos/nestle-poster.webp'),
    poster: asset('/fotos/nestle-ig-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/nestle-inclusion.mp4'),
      url: 'https://www.instagram.com/reel/Cj9F5kYjQkF/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Moving Life México',
    campaign: 'Embajadora de Movinglife. México 2025 - 2027.',
    type: 'Embajadora / Creadora de contenido',
    description:
      'Creadora de contenido para Instagram y TikTok, con libertad de creación, edición y calendario de publicación.',
    result:
      'Serie de videos sobre el beneficio del uso de la triciclo, destacando la facilidad de desplazamiento con mínimo esfuerzo para personas con limitaciones físicas.',
    image: asset('/fotos/colab-moving-life.webp'),
    poster: asset('/fotos/moving-life-ig-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/moving-life-full.mp4'),
      url: 'https://www.instagram.com/reel/DIHyEDGA6-j/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Creadora de contenido para TikTok Motorola 2022–2023',
    campaign: 'Motorola México',
    type: 'Creadora de contenido / TikTok',
    description:
      'Mostrar las cualidades de los equipos en un uso cotidiano.',
    result: '',
    image: asset('/fotos/motorola-poster.webp'),
    href: 'https://www.tiktok.com/@motorola_mx',
    linkLabel: 'Ver en TikTok ↗',
    video: {
      src: asset('/videos/motorola-tiktok.mp4'),
      url: '',
    },
  },
  {
    brand: 'Más de tipo podcast · Discapacidades',
    campaign: '',
    type: 'Pódcast de inclusión',
    description:
      '¿Quién pone los límites? Un capítulo en el que hablo desde mi punto de vista lo complicado que es mentalmente afrontar el cambio físico, el cómo te trata ahora la sociedad y los límites estructurales del país cuando se tiene una discapacidad.',
    result: '',
    image: asset('/fotos/colab-inclusion.webp'),
    poster: asset('/fotos/inclusion-ig-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/inclusion.mp4'),
      url: 'https://www.instagram.com/reel/DE01UBUOkG-/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Torikami Matcha Caffee House - Deigo cocina tradicional japonesa',
    campaign: '',
    type: 'Lugares inclusivos',
    description:
      'Es un concepto japonés, un lugar totalmente adaptado para personas con limitaciones físicas, visuales y auditivas entre otras, haciéndolo un espacio inclusivo y amigable con los perros.',
    result: '',
    image: asset('/fotos/colab-viajes.webp'),
    poster: asset('/fotos/viajes-ig-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/viajes.mp4'),
      url: 'https://www.instagram.com/reel/DOMovg2kg5i/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Probando productos',
    campaign: '',
    type: 'Contenido UGC',
    description: 'El cuidado personal, del hogar y moda sigue sintiendo muy importante en las personas usuarias en silla de rueda.',
    result: '',
    image: asset('/fotos/ugc-poster.webp'),
    poster: asset('/fotos/ugc-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/ugc-full.mp4'),
      url: 'https://www.instagram.com/reel/Ddwd8cvhovw/',
    },
  },
  {
    brand: 'Inclusión nacional e internacional',
    campaign: '',
    type: 'Destinos adaptados',
    description: 'Mostrando diferentes puntos turísticos en los países que voy conociendo en silla de ruedas, aplicaría no solo para destinos, si no tambien para el sector hotelero.',
    result: '',
    image: asset('/fotos/destinos-chile-poster.webp'),
    poster: asset('/fotos/destinos-chile-poster.webp'),
    href: '',
    video: {
      src: asset('/videos/destinos-chile-full.mp4'),
      url: 'https://www.instagram.com/reel/DUikHA9jCxM/',
    },
  },
];

export const gallery = [
  { src: asset('/fotos/galeria-1.webp'), alt: 'Katha en la costa de Lechería' },
  { src: asset('/fotos/galeria-2.webp'), alt: 'Ruta accesible por Ciudad de México' },
  { src: asset('/fotos/galeria-3.webp'), alt: 'Katha frente a la cordillera de los Andes' },
  { src: asset('/fotos/galeria-4.webp'), alt: 'Detalle de la silla de ruedas' },
  { src: asset('/fotos/galeria-5.webp'), alt: 'Sesión de fotos para una campaña' },
  { src: asset('/fotos/galeria-6.webp'), alt: 'Presentación de una experiencia accesible' },
];

export interface StatShot {
  src: string;
  title: string;
  caption: string;
  alt: string;
}

/** Capturas de las estadísticas de Instagram, en orden narrativo. */
export const instagramShots: StatShot[] = [
  {
    src: asset('/fotos/instagram/perfil.webp'),
    title: 'Perfil',
    caption: '98,8 mil seguidores · 585 publicaciones · 866 seguidos.',
    alt: 'Perfil de Instagram de Katha Tenorio con 98,8 mil seguidores y 585 publicaciones',
  },
  {
    src: asset('/fotos/instagram/seguidores.webp'),
    title: 'Seguidores',
    caption: '98.870 seguidores y una variación de −0,3% en los últimos 30 días.',
    alt: 'Estadísticas de seguidores de Instagram: 98.870 seguidores en los últimos 30 días',
  },
  {
    src: asset('/fotos/instagram/reproducciones.webp'),
    title: 'Reproducciones',
    caption: '2.773.705 reproducciones y 701.214 espectadores en los últimos 90 días.',
    alt: 'Estadísticas de reproducciones de Instagram: 2.773.705 reproducciones en 90 días',
  },
  {
    src: asset('/fotos/instagram/interacciones.webp'),
    title: 'Interacciones',
    caption: '37 mil en Reels, 15 mil en Historias y 8,7 mil en publicaciones.',
    alt: 'Interacciones por tipo de contenido: Reels, Historias y publicaciones',
  },
  {
    src: asset('/fotos/instagram/audiencia-lugares.webp'),
    title: 'Audiencia por país',
    caption: 'México 39,3% · Venezuela 9,5% · EE. UU. 7,9% · Chile 6,6% · Colombia 6,3%.',
    alt: 'Principales países e idiomas de la audiencia de Instagram',
  },
  {
    src: asset('/fotos/instagram/audiencia-genero.webp'),
    title: 'Género y edad',
    caption: '64,7% mujeres; el 52,9% del público tiene entre 25 y 34 años.',
    alt: 'Género y rango de edad de la audiencia de Instagram',
  },
];

/** Capturas de las estadísticas de TikTok, en orden narrativo. */
export const tiktokShots: StatShot[] = [
  {
    src: asset('/fotos/tiktok/perfil.webp'),
    title: 'Perfil',
    caption: '69,2 mil seguidores · 1,5 mill. de me gusta · 156 siguiendo.',
    alt: 'Perfil de TikTok de Katha Tenorio con 69,2 mil seguidores y 1,5 millones de me gusta',
  },
  {
    src: asset('/fotos/tiktok/espectadores.webp'),
    title: 'Espectadores',
    caption: '22,1 mil espectadores y 16,7 mil nuevos en los últimos 28 días.',
    alt: 'Métricas de espectadores de TikTok: 22,1 mil totales y 16,7 mil nuevos',
  },
  {
    src: asset('/fotos/tiktok/rendimiento.webp'),
    title: 'Rendimiento',
    caption: '33 mil visualizaciones, 1,3 mil me gusta y 131 comentarios en 28 días.',
    alt: 'Resumen de métricas clave de TikTok: visualizaciones, me gusta y comentarios',
  },
  {
    src: asset('/fotos/tiktok/audiencia-pais.webp'),
    title: 'Audiencia por país',
    caption: 'Chile 26,6% · México 21,5% · Venezuela 15,7% · Colombia 6,3% · Ecuador 4,4%.',
    alt: 'Ubicaciones de la audiencia de TikTok por país',
  },
  {
    src: asset('/fotos/tiktok/audiencia-edad.webp'),
    title: 'Edad',
    caption: '25 a 34 años 28,4% · 35 a 44 28,2% · 45 a 54 21,8%.',
    alt: 'Rango de edad de la audiencia de TikTok',
  },
  {
    src: asset('/fotos/tiktok/audiencia-sexo.webp'),
    title: 'Sexo',
    caption: '68% hombres · 31% mujeres · 1% otro.',
    alt: 'Distribución por sexo de la audiencia de TikTok',
  },
];

export const purpose = {
  title: 'MÁS QUE CONTENIDO',
  text: 'La discapacidad no limita las experiencias que podemos vivir; muchas veces lo que limita es la falta de accesibilidad.',
  body: 'Trabajo con marcas que quieren decir algo real sobre inclusión, y con personas que necesitan ver que también tienen un lugar en el mundo. Cada pieza nace de una experiencia vivida: la silla no es un detalle de la historia, es la historia.',
};
