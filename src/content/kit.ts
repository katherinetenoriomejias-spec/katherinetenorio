/**
 * CONTENIDO DEL MEDIA KIT
 * ------------------------------------------------------------------
 * Todo lo que Katha puede editar sin tocar código está en este archivo.
 * Cambia los textos, la galería y las colaboraciones aquí.
 */

export const profile = {
  name: 'Katha Tenorio',
  role: 'Creadora digital · Accesibilidad, inclusión y movilidad',
  tagline:
    'Convierto experiencias reales en historias que conectan. Contenido sobre accesibilidad, inclusión, movilidad, lifestyle y viajes desde la mirada de una persona que usa silla de ruedas.',
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
  photo: '/fotos/katha-1.jpg',
  photos: [
    { src: '/fotos/katha-1.jpg', alt: 'Katha en silla de ruedas' },
    { src: '/fotos/katha-2.jpg', alt: 'Primer plano de Katha' },
    { src: '/fotos/katha-3.jpg', alt: 'Katha sentada de blanco' },
    { src: '/fotos/katha-4.jpg', alt: 'Katha de negro con collar dorado' },
    { src: '/fotos/katha-5.jpg', alt: 'Retrato de Katha' },
    { src: '/fotos/katha-6.jpg', alt: 'Katha de blanco sentada' },
    { src: '/fotos/katha-7.jpg', alt: 'Katha sonriendo con la mano en la mejilla' },
    { src: '/fotos/katha-8.jpg', alt: 'Katha de negro con tenis blancos' },
    { src: '/fotos/katha-9.jpg', alt: 'Katha con salida de pelo' },
    { src: '/fotos/katha-10.jpg', alt: 'Retrato de Katha' },
    { src: '/fotos/katha-11.jpg', alt: 'Katha en la sesion de fotos 11' },
    { src: '/fotos/katha-12.jpg', alt: 'Katha en la sesion de fotos 12' },
    { src: '/fotos/katha-13.jpg', alt: 'Katha en la sesion de fotos 13' },
    { src: '/fotos/katha-14.jpg', alt: 'Katha en la sesion de fotos 14' },
    { src: '/fotos/katha-15.jpg', alt: 'Katha en la sesion de fotos 15' },
    { src: '/fotos/katha-16.jpg', alt: 'Katha en la sesion de fotos 16' },
    { src: '/fotos/katha-17.jpg', alt: 'Katha en la sesion de fotos 17' },
    { src: '/fotos/katha-18.jpg', alt: 'Katha en la sesion de fotos 18' },
    { src: '/fotos/katha-19.jpg', alt: 'Katha en la sesion de fotos 19' },
    { src: '/fotos/katha-20.jpg', alt: 'Katha en la sesion de fotos 20' },
    { src: '/fotos/katha-21.jpg', alt: 'Katha en la sesion de fotos 21' },
    { src: '/fotos/katha-22.jpg', alt: 'Katha en la sesion de fotos 22' },
    { src: '/fotos/katha-23.jpg', alt: 'Katha en la sesion de fotos 23' },
    { src: '/fotos/katha-24.jpg', alt: 'Katha en la sesion de fotos 24' },
    { src: '/fotos/katha-25.jpg', alt: 'Katha en la sesion de fotos 25' },
    { src: '/fotos/katha-26.jpg', alt: 'Katha en la sesion de fotos 26' },
    { src: '/fotos/katha-27.jpg', alt: 'Katha en la sesion de fotos 27' },
    { src: '/fotos/katha-28.jpg', alt: 'Katha en la sesion de fotos 28' },
    { src: '/fotos/katha-29.jpg', alt: 'Katha en la sesion de fotos 29' },
    { src: '/fotos/katha-30.jpg', alt: 'Katha en la sesion de fotos 30' },
  ],
  portrait: '/fotos/katha-retrato.jpg',
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

export interface Collaboration {
  brand: string;
  campaign: string;
  type: string;
  description: string;
  result: string;
  image: string;
  href: string;
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

export const collaborations: Collaboration[] = [
  {
    brand: 'Moving Life México',
    campaign: 'Embajadora de Movinglife. México 2025 - 2027.',
    type: 'Embajadora / Creadora de contenido',
    description:
      'Creadora de contenido para Instagram y TikTok, con libertad de creación, edición y calendario de publicación.',
    result:
      'Serie de videos sobre el beneficio del uso de la triciclo, destacando la facilidad de desplazamiento con mínimo esfuerzo para personas con limitaciones físicas.',
    image: '/fotos/colab-moving-life.jpg',
    href: '',
    video: {
      src: '/videos/moving-life-1.mp4',
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
    image: '/fotos/colab-reskin.jpg',
    href: '',
    video: {
      src: '/videos/reskin-pamela.mp4',
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
    image: '/fotos/colab-inclusion.jpg',
    href: '',
    video: {
      src: '/videos/inclusion.mp4',
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
    image: '/fotos/colab-viajes.jpg',
    href: '',
    video: {
      src: '/videos/viajes.mp4',
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
    image: '/fotos/colab-tecnologia.jpg',
    href: '',
    video: {
      src: '/videos/tecnologia.mp4',
      url: 'https://www.instagram.com/reel/CsVGRKWNmmg/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==',
    },
  },
  {
    brand: 'Conferencia',
    campaign: 'Alianza del Pacífico · Nestlé México',
    type: 'Ponente',
    description:
      'Frente a más de 300 personas de forma presencial y cámaras de TV nacional para diferentes países del Pacífico, expuse el proyecto de inclusión que tendría Nestlé México. Asimismo, rueda de prensa para dar respuestas a dudas sobre el proyecto del que yo era imagen de inclusión.',
    result: '',
    image: '/fotos/colab-sexta.jpg',
    href: '',
    video: {
      src: '/videos/sexta.mp4',
      url: 'https://www.instagram.com/reel/Cj9F5kYjQkF/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
  },
];

export const gallery = [
  { src: '/fotos/galeria-1.jpg', alt: 'Katha en la costa de Lechería' },
  { src: '/fotos/galeria-2.jpg', alt: 'Ruta accesible por Ciudad de México' },
  { src: '/fotos/galeria-3.jpg', alt: 'Katha frente a la cordillera de los Andes' },
  { src: '/fotos/galeria-4.jpg', alt: 'Detalle de la silla de ruedas' },
  { src: '/fotos/galeria-5.jpg', alt: 'Sesión de fotos para una campaña' },
  { src: '/fotos/galeria-6.jpg', alt: 'Presentación de una experiencia accesible' },
];

export const purpose = {
  title: 'MÁS QUE CONTENIDO',
  text: 'La discapacidad no limita las experiencias que podemos vivir; muchas veces lo que limita es la falta de accesibilidad.',
  body: 'Trabajo con marcas que quieren decir algo real sobre inclusión, y con personas que necesitan ver que también tienen un lugar en el mundo. Cada pieza nace de una experiencia vivida: la silla no es un detalle de la historia, es la historia.',
};
