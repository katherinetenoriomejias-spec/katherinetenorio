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
  photo: asset('/fotos/katha-1.jpg'),
  photos: [
    { src: asset('/fotos/katha-1.jpg'), alt: 'Katha en silla de ruedas' },
    { src: asset('/fotos/katha-2.jpg'), alt: 'Primer plano de Katha' },
    { src: asset('/fotos/katha-3.jpg'), alt: 'Katha sentada de blanco' },
    { src: asset('/fotos/katha-4.jpg'), alt: 'Katha de negro con collar dorado' },
    { src: asset('/fotos/katha-5.jpg'), alt: 'Retrato de Katha' },
    { src: asset('/fotos/katha-6.jpg'), alt: 'Katha de blanco sentada' },
    { src: asset('/fotos/katha-7.jpg'), alt: 'Katha sonriendo con la mano en la mejilla' },
    { src: asset('/fotos/katha-8.jpg'), alt: 'Katha de negro con tenis blancos' },
    { src: asset('/fotos/katha-9.jpg'), alt: 'Katha con salida de pelo' },
    { src: asset('/fotos/katha-10.jpg'), alt: 'Retrato de Katha' },
    { src: asset('/fotos/katha-11.jpg'), alt: 'Katha en la sesion de fotos 11' },
    { src: asset('/fotos/katha-12.jpg'), alt: 'Katha en la sesion de fotos 12' },
    { src: asset('/fotos/katha-13.jpg'), alt: 'Katha en la sesion de fotos 13' },
    { src: asset('/fotos/katha-14.jpg'), alt: 'Katha en la sesion de fotos 14' },
    { src: asset('/fotos/katha-15.jpg'), alt: 'Katha en la sesion de fotos 15' },
    { src: asset('/fotos/katha-16.jpg'), alt: 'Katha en la sesion de fotos 16' },
    { src: asset('/fotos/katha-17.jpg'), alt: 'Katha en la sesion de fotos 17' },
    { src: asset('/fotos/katha-18.jpg'), alt: 'Katha en la sesion de fotos 18' },
    { src: asset('/fotos/katha-19.jpg'), alt: 'Katha en la sesion de fotos 19' },
    { src: asset('/fotos/katha-20.jpg'), alt: 'Katha en la sesion de fotos 20' },
    { src: asset('/fotos/katha-21.jpg'), alt: 'Katha en la sesion de fotos 21' },
    { src: asset('/fotos/katha-22.jpg'), alt: 'Katha en la sesion de fotos 22' },
    { src: asset('/fotos/katha-23.jpg'), alt: 'Katha en la sesion de fotos 23' },
    { src: asset('/fotos/katha-24.jpg'), alt: 'Katha en la sesion de fotos 24' },
    { src: asset('/fotos/katha-25.jpg'), alt: 'Katha en la sesion de fotos 25' },
    { src: asset('/fotos/katha-26.jpg'), alt: 'Katha en la sesion de fotos 26' },
    { src: asset('/fotos/katha-27.jpg'), alt: 'Katha en la sesion de fotos 27' },
    { src: asset('/fotos/katha-28.jpg'), alt: 'Katha en la sesion de fotos 28' },
    { src: asset('/fotos/katha-29.jpg'), alt: 'Katha en la sesion de fotos 29' },
    { src: asset('/fotos/katha-30.jpg'), alt: 'Katha en la sesion de fotos 30' },
  ],
  portrait: asset('/fotos/katha-retrato.jpg'),
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
    title: 'Campañas publicitarias',
    text: 'Concepto, guion y piezas para campañas donde la inclusión es el eje, no un adorno.',
  },
  {
    title: 'Videos cortos (Reels)',
    text: 'Video corto con ritmo y mensaje claro.',
  },
  {
    title: 'Reviews',
    text: 'Reseñas de producto con experiencia real de uso y accesibilidad comprobada.',
  },
  {
    title: 'Fotografías',
    text: 'Sesiones de fotografía para marcas, prensa y redes sociales.',
  },
  {
    title: 'Creación de contenido',
    text: 'Dirección creativa, guion, edición y calendario editorial.',
  },
  {
    title: 'Cobertura de eventos',
    text: 'Presencia en eventos como presentadora o expositora de proyectos de inclusión.',
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
  type: string;
  description: string;
  result: string;
  image: string;
  href: string;
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
  price: string;
  featured?: boolean;
  items: string[];
  notes: string[];
}

/** Propuestas para marcas: los precios son referenciales y se editan aquí. */
export const packages: MediaPackage[] = [
  {
    id: 'ajam',
    name: 'Plan Ajam',
    tagline: 'Para empezar a trabajar juntos',
    price: 'USD 900',
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
    price: 'USD 2.200',
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
    price: 'USD 3.500',
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
    src: asset('/fotos/nestle/nestle-1.jpg'),
    title: 'Ecosistema allinN',
    caption: 'Presentación del ecosistema de innovación de Nestlé México.',
    alt: 'Escenario del evento allinN de Nestlé México con pantallas que muestran el ecosistema de innovación',
  },
  {
    src: asset('/fotos/nestle/nestle-2.jpg'),
    title: 'Ponencia',
    caption: 'Conferencia sobre inclusión laboral frente al equipo de Nestlé.',
    alt: 'Katha Tenorio en silla de ruedas durante su ponencia en el evento de Nestlé México',
  },
  {
    src: asset('/fotos/nestle/nestle-3.jpg'),
    title: 'Reconocimiento',
    caption: 'Reconocimiento al mejor proyecto de inclusión laboral a nivel internacional para Nestlé México.',
    alt: 'Equipo de Nestlé México junto a Katha Tenorio sosteniendo el reconocimiento al mejor proyecto de inclusión laboral a nivel internacional',
  },
  {
    src: asset('/fotos/nestle/nestle-4.jpg'),
    title: 'Oficinas Nestlé',
    caption: 'Grabación de contenido audiovisual dentro de las instalaciones de Nestlé México.',
    alt: 'Katha Tenorio con el equipo de Nestlé México dentro de las instalaciones de la empresa',
  },
  {
    src: asset('/fotos/nestle/nestle-5.jpg'),
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
    image: asset('/fotos/nestle-poster.jpg'),
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
    image: asset('/fotos/colab-moving-life.jpg'),
    href: '',
    video: {
      src: asset('/videos/moving-life-1.mp4'),
      url: 'https://www.instagram.com/reel/DIHyEDGA6-j/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Reskin.CL — Dra Pamela',
    campaign: '',
    type: 'Colaboración / Belleza - Chile (Agosto 2026)',
    description:
      'Guión y edición del video para la campaña de tratamientos de belleza con doctores.',
    result:
      'Mostrar la importancia de aplicarse tratamientos de belleza con doctores en lugares seguros, para conseguir resultados seguros y lo más naturales posibles.',
    image: asset('/fotos/colab-reskin.jpg'),
    href: '',
    video: {
      src: asset('/videos/reskin-pamela.mp4'),
      url: 'https://www.instagram.com/reel/Dcg6cqqBak4/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Pódcast de inclusión',
    campaign: '',
    type: 'Más de tipo podcast · Discapacidades',
    description:
      '¿Quién pone los límites? Un capítulo en el que hablo desde mi punto de vista lo complicado que es mentalmente afrontar el cambio físico, el cómo te trata ahora la sociedad y los límites estructurales del país cuando se tiene una discapacidad.',
    result: '',
    image: asset('/fotos/colab-inclusion.jpg'),
    href: '',
    video: {
      src: asset('/videos/inclusion.mp4'),
      url: 'https://www.instagram.com/reel/DE01UBUOkG-/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Lugares inclusivos',
    campaign: 'Torikami Matcha Caffee House',
    type: 'Cafetería inclusiva en Ciudad de México',
    description:
      'Es un concepto japonés, un lugar totalmente adaptado para personas con limitaciones físicas, visuales y auditivas entre otras, haciéndolo un espacio inclusivo y amigable con los perros.',
    result: '',
    image: asset('/fotos/colab-viajes.jpg'),
    href: '',
    video: {
      src: asset('/videos/viajes.mp4'),
      url: 'https://www.instagram.com/reel/DOMovg2kg5i/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Conferencia de inclusión',
    campaign: 'Nestlé México',
    type: 'Imagen de inclusión laboral',
    description:
      'Durante 2 años trabajé como imagen de inclusión laboral para Nestlé, en donde se llevaron a cabo diversos proyectos como Alianza del Pacífico, Jóvenes Construyendo el Futuro, B2B Exponencial, entre otras, con mi participación a nivel nacional.',
    result: '',
    image: asset('/fotos/colab-tecnologia.jpg'),
    href: '',
    video: {
      src: asset('/videos/tecnologia.mp4'),
      url: 'https://www.instagram.com/reel/CsVGRKWNmmg/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==',
    },
  },
];

export const gallery = [
  { src: asset('/fotos/galeria-1.jpg'), alt: 'Katha en la costa de Lechería' },
  { src: asset('/fotos/galeria-2.jpg'), alt: 'Ruta accesible por Ciudad de México' },
  { src: asset('/fotos/galeria-3.jpg'), alt: 'Katha frente a la cordillera de los Andes' },
  { src: asset('/fotos/galeria-4.jpg'), alt: 'Detalle de la silla de ruedas' },
  { src: asset('/fotos/galeria-5.jpg'), alt: 'Sesión de fotos para una campaña' },
  { src: asset('/fotos/galeria-6.jpg'), alt: 'Presentación de una experiencia accesible' },
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
    src: asset('/fotos/instagram/perfil.jpg'),
    title: 'Perfil',
    caption: '98,8 mil seguidores · 585 publicaciones · 866 seguidos.',
    alt: 'Perfil de Instagram de Katha Tenorio con 98,8 mil seguidores y 585 publicaciones',
  },
  {
    src: asset('/fotos/instagram/seguidores.jpg'),
    title: 'Seguidores',
    caption: '98.870 seguidores y una variación de −0,3% en los últimos 30 días.',
    alt: 'Estadísticas de seguidores de Instagram: 98.870 seguidores en los últimos 30 días',
  },
  {
    src: asset('/fotos/instagram/reproducciones.jpg'),
    title: 'Reproducciones',
    caption: '2.773.705 reproducciones y 701.214 espectadores en los últimos 90 días.',
    alt: 'Estadísticas de reproducciones de Instagram: 2.773.705 reproducciones en 90 días',
  },
  {
    src: asset('/fotos/instagram/interacciones.jpg'),
    title: 'Interacciones',
    caption: '37 mil en Reels, 15 mil en Historias y 8,7 mil en publicaciones.',
    alt: 'Interacciones por tipo de contenido: Reels, Historias y publicaciones',
  },
  {
    src: asset('/fotos/instagram/audiencia-lugares.jpg'),
    title: 'Audiencia por país',
    caption: 'México 39,3% · Venezuela 9,5% · EE. UU. 7,9% · Chile 6,6% · Colombia 6,3%.',
    alt: 'Principales países e idiomas de la audiencia de Instagram',
  },
  {
    src: asset('/fotos/instagram/audiencia-genero.jpg'),
    title: 'Género y edad',
    caption: '64,7% mujeres; el 52,9% del público tiene entre 25 y 34 años.',
    alt: 'Género y rango de edad de la audiencia de Instagram',
  },
];

/** Capturas de las estadísticas de TikTok, en orden narrativo. */
export const tiktokShots: StatShot[] = [
  {
    src: asset('/fotos/tiktok/perfil.jpg'),
    title: 'Perfil',
    caption: '69,2 mil seguidores · 1,5 mill. de me gusta · 156 siguiendo.',
    alt: 'Perfil de TikTok de Katha Tenorio con 69,2 mil seguidores y 1,5 millones de me gusta',
  },
  {
    src: asset('/fotos/tiktok/espectadores.jpg'),
    title: 'Espectadores',
    caption: '22,1 mil espectadores y 16,7 mil nuevos en los últimos 28 días.',
    alt: 'Métricas de espectadores de TikTok: 22,1 mil totales y 16,7 mil nuevos',
  },
  {
    src: asset('/fotos/tiktok/rendimiento.jpg'),
    title: 'Rendimiento',
    caption: '33 mil visualizaciones, 1,3 mil me gusta y 131 comentarios en 28 días.',
    alt: 'Resumen de métricas clave de TikTok: visualizaciones, me gusta y comentarios',
  },
  {
    src: asset('/fotos/tiktok/audiencia-pais.jpg'),
    title: 'Audiencia por país',
    caption: 'Chile 26,6% · México 21,5% · Venezuela 15,7% · Colombia 6,3% · Ecuador 4,4%.',
    alt: 'Ubicaciones de la audiencia de TikTok por país',
  },
  {
    src: asset('/fotos/tiktok/audiencia-edad.jpg'),
    title: 'Edad',
    caption: '25 a 34 años 28,4% · 35 a 44 28,2% · 45 a 54 21,8%.',
    alt: 'Rango de edad de la audiencia de TikTok',
  },
  {
    src: asset('/fotos/tiktok/audiencia-sexo.jpg'),
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
