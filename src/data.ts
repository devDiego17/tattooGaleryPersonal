export type Page =
  | "home"
  | "gallery"
  | "archive"
  | "news"
  | "shop"
  | "about"
  | "contact"
  | "studio"
  | "book";

export interface Work {
  id: string;
  title: string;
  year: number;
  category: string;
  technique: string;
  image: string;
  description: string;
  span?: "wide" | "tall" | "normal";
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  month: string;
  year: number;
  image: string;
  excerpt: string;
  tag: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  edition: string;
  image: string;
  description: string;
  sizes?: string[];
  available: boolean;
}

export const works: Work[] = [
  {
    id: "0001",
    title: "Charmander",
    year: 2023,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/charmander.jpeg",
    description: "Charmander tattoo en full color",
    span: "tall",
  },
  {
    id: "0002",
    title: "Samurai",
    year: 2025,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/Samurai.mp4",
    description: "Samurai tattoo en blackwork",
    span: "wide",
  },
  {
    id: "0003",
    title: "Perrito Naranja",
    year: 2026,
    category: "Tattoo",
    technique: "Neo-traditional",
    image: "/works/perrito.mp4",
    description: "Perrito naranja tattoo en neo-traditional",
    span: "normal",
  },
  {
    id: "0004",
    title: "Santa Muerte",
    year: 2026,
    category: "tattoo",
    technique: "Shadows",
    image: "/works/muerte.mp4",
    description: "Large-format painting exploring displacement and memory through abstracted geographic forms.",
    span: "tall",
  },
  {
    id: "0005",
    title: "Diptico vida y muerte",
    year: 2024,
    category: "Tattoo",
    technique: "Realism",
    image: "/works/skull.mp4",
    description: "representacion de la dualidad humana parte 2.",
    span: "wide",
  },
  {
    id: "0006",
    title: "Diptico de vida y muerte parte 1",
    year: 2024,
    category: "Tattoo",
    technique: "Realism",
    image: "/works/Vida.mp4",
    description: "Representacion de la dualidad humana parte 1.",
    span: "normal",
  },
  {
    id: "0007",
    title: "Daga",
    year: 2025,
    category: "Tattoo",
    technique: "Shadows",
    image: "/works/daga.mp4",
    description: "Daga tattoo en sombras ",
    span: "normal",
  },
  {
    id: "0008",
    title: "Soledad",
    year: 2026,
    category: "Tattoo",
    technique: "Lettering",
    image: "/works/Soledad.mp4",
    description: "Letras y sombra ",
    span: "normal",
  },
  {
    id: "0009",
    title: "Puñal",
    year: 2025,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/Puñal.mp4",
    description: "Tatuaje de puñal",
    span: "normal",
  },
  {
    id: "0010",
    title: "Carnero",
    year: 2026,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/carnero.mp4",
    description: "Tatuaje de carnero",
    span: "normal",
  },
  {
    id: "0011",
    title: "Escudo de Legend of Zelda",
    year: 2022,
    category: "Tattoo",
    technique: "Color",
    image: "/works/escudodelegendofzelda.jpg",
    description: "Escudo Hylian",
    span: "normal",
  },
  {
    id: "0012",
    title: "Golondrina",
    year: 2024,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/golondrina.mp4",
    description: "Tatuaje de golondrina",
    span: "normal",
  },
  {
    id: "0013",
    title: "Hongo",
    year: 2021,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/hongo.jpg",
    description: "Tatuaje de hongo",
    span: "normal",
  },
  {
    id: "0014",
    title: "Mapache",
    year: 2026,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/mapache.mp4",
    description: "Tatuaje de mapache",
    span: "normal",
  },
  {
    id: "0015",
    title: "Máscara 1",
    year: 2024,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/mascara1.mp4",
    description: "Tatuaje de máscara",
    span: "normal",
  },
  {
    id: "0016",
    title: "Máscara 2",
    year: 2025,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/mascara2.mp4",
    description: "Tatuaje de máscara",
    span: "normal",
  },
  {
    id: "0017",
    title: "Mujer Afro",
    year: 2026,
    category: "Tattoo",
    technique: "Realism",
    image: "/works/mujerafro.mp4",
    description: "Tatuaje de retrato",
    span: "normal",
  },
  {
    id: "0018",
    title: "Rosa",
    year: 2025,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/rosa.mp4",
    description: "Tatuaje de rosa",
    span: "normal",
  },
  {
    id: "0019",
    title: "Serpiente 1",
    year: 2025,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/serpiente1.mp4",
    description: "Tatuaje de serpiente",
    span: "normal",
  },
  {
    id: "0020",
    title: "Serpiente 2.1",
    year: 2022,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/serpiente2.1.jpg",
    description: "Detalle de serpiente",
    span: "normal",
  },
  {
    id: "0021",
    title: "Serpiente 2",
    year: 2022,
    category: "Tattoo",
    technique: "Blackwork",
    image: "/works/serpiente2.jpg",
    description: "Tatuaje de serpiente",
    span: "normal",
  },
  {
    id: "0022",
    title: "Spiderman",
    year: 2023,
    category: "Tattoo",
    technique: "Color",
    image: "/works/spiderman.jpg",
    description: "Tatuaje de Spiderman",
    span: "normal",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "flash-coleccion-agosto",
    title: "Nueva Serie ''Valores''",
    date: "Agosto 2026",
    month: "AGO",
    year: 2026,
    image: "/news/flash-coleccion.png",
    excerpt: "Nueva serie de tauajes insipirados en valores morales, disponible para agendar. Consulta disponibilidad ",
    tag: "Flash",
  },
  {
    id: "prints-julio",
    title: "Nuevos Prints Disponibles",
    date: "Julio 2026",
    month: "JUL",
    year: 2026,
    image: "/news/prints-julio.png",
    excerpt: "Edición limitada de cinco impresiones de la serie Flora Oscura. Papel de algodón 300g, tiraje de 30 copias numeradas y firmadas.",
    tag: "Shop",
  },
  {
    id: "exposicion-junio",
    title: "Exposición Colectiva — Galería Ñ",
    date: "Junio 2026",
    month: "JUN",
    year: 2026,
    image: "/news/exposicion-junio.png",
    excerpt: "Participación en la exposición colectiva 'Cuerpos y Territorios' en Galería Ñ, Medellín. Inauguración 14 de junio.",
    tag: "Eventos",
  },
  {
    id: "estudio-nuevo",
    title: "Nuevo Espacio de Estudio",
    date: "Abril 2026",
    month: "ABR",
    year: 2026,
    image: "/news/estudio-nuevo.png",
    excerpt: "El estudio se traslada a un nuevo espacio en Robledo. Un lugar más amplio para trabajar, recibir clientes y desarrollar proyectos.",
    tag: "Estudio",
  },
];

export const products: Product[] = [
  {
    id: "00000s",
    name: "Gorra Nu-Metal",
    price: 68000,
    category: "Apparel",
    edition: "3ra serie de gorras",
    image: "/shop/gorra-roja.jpg",
    description: "Gorra bordada de algodon ",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: false,
  },
  {
    id: "00001s",
    name: "Gorra Esmeralda",
    price: 80000,
    category: "Apparel",
    edition: "3ra serie de gorras",
    image: "/shop/gorra-esmeralda.jpg",
    description: "Gorra bordada de algodon ",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: false,
  },
  {
    id: "00002s",
    name: "Gorra Crema",
    price: 45000,
    category: "Apparel",
    edition: "3ra serie de gorras",
    image: "/shop/gorra-crema.jpg",
    description: "Gorra bordada de algodon ",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: true,
  },
  {
    id: "00003s",
    name: "3r Coleccion - 2026",
    price: 60000,
    category: "Apparel",
    edition: "3ra serie de gorras",
    image: "/shop/3r coleccion.jpeg",
    description: "Tercera serie de gorras Osiris, disponibles para envio",
    available: true,
  },
];

export const archiveYears: Record<number, Work[]> = {
  2026: works.filter((w) => w.year === 2026),
  2025: works.filter((w) => w.year === 2025),
  2024: works.filter((w) => w.year === 2024),
  2023: works.filter((w) => w.year === 2023),
  2022: works.filter((w) => w.year === 2022),
};

export const galleryCategories = ["All", "Tattoo", "Art", "Illustration", "Design", "Projects", "Drawing"];

export const formatCOP = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
