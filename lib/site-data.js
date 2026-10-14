// Contenido editable del sitio.
// Cambiá estos valores para actualizar textos, productos y datos de contacto.

export const brand = {
  name: "Caetano",
  tagline: "Cosmética natural artesanal para el cuidado de tu piel",
  logo: "/images/brand/logo.jpg",
};

export const about = {
  title: "Sobre nosotros",
  paragraphs: [
    "Caetano es una marca de cosmética natural artesanal que nace del amor por lo natural, lo artesanal y el bienestar de la piel. Creamos productos pensados para convertir el cuidado diario de la piel en un momento especial, combinando ingredientes de origen natural, aromas agradables y una elaboración cuidada.",
    "Nuestra línea cuenta con productos para el cuidado corporal y del cabello. Tenemos jabones exfoliantes, mantecas corporales, aceites corporales y capilares, bálsamos labiales y otros productos de cuidado personal, elaborados con dedicación y pensando en las necesidades de cada piel.",
    "En Caetano buscamos que cada producto no solo cuide tu piel, sino que también te permita disfrutar de pequeños momentos de bienestar y autocuidado. Creemos en una belleza sencilla, consciente y cercana, donde cada detalle está pensado para hacer de tu rutina un momento para ti.",
  ],
  // Imagen de apoyo junto al texto (opcional). Dejar en null para ocultarla.
  image: "/images/brand/about.jpg",
};

export const productCategories = [
  {
    id: "jabones-exfoliantes",
    name: "Jabones exfoliantes",
    description:
      "Limpieza suave con textura exfoliante natural, para una piel renovada y luminosa.",
    icon: "soap",
    image: "/images/products/jabones-exfoliantes.jpg",
    presentations: [
      { size: "390 g", price: "140 Bs" },
      { size: "280 g", price: "110 Bs" },
    ],
    aromas: [
      "Maracuyá",
      "Uva",
      "Chicle",
      "Cherry",
      "Melón",
      "Pitahaya",
      "Sandía",
      "Coco",
      "Coco Vainilla",
      "Vainilla",
    ],
  },
  {
    id: "mantecas-corporales",
    name: "Mantecas corporales",
    description:
      "Hidratación profunda y nutritiva que deja la piel suave, sedosa y protegida.",
    icon: "jar",
    image: "/images/products/mantecas-corporales.jpg",
    presentations: [
      { size: "180 g", price: "165 Bs" },
      { size: "110 g", price: "110 Bs" },
      { size: "55 g", price: "70 Bs" },
    ],
    aromas: [
      "Maracuyá",
      "Uva",
      "Chicle",
      "Cherry",
      "Melón",
      "Pitahaya",
      "Sandía",
      "Coco Vainilla",
      "Vainilla",
    ],
  },
  {
    id: "aceites-corporales-capilares",
    name: "Aceites corporales y capilares",
    description:
      "Fórmulas nutritivas que devuelven brillo y vitalidad a la piel y al cabello.",
    icon: "droplet",
    image: "/images/products/aceites-corporales-capilares.jpg",
    presentations: [{ size: "250 ml", price: "90 Bs" }],
    aromas: [],
  },
  {
    id: "balsamos-labiales",
    name: "Bálsamos labiales",
    description:
      "Cuidado intenso para labios suaves, protegidos y con un toque natural.",
    icon: "lipbalm",
    image: "/images/products/balsamos-labiales.jpg",
    presentations: [{ size: "15 g", price: "25 Bs" }],
    aromas: [],
  },
  {
    id: "otros-cuidados",
    name: "Otros cuidados personales",
    description:
      "Pequeños productos artesanales pensados para completar tu ritual de autocuidado.",
    icon: "leaf",
    image: "/images/products/otros-cuidados.jpg",
    presentations: [{ size: "250 ml", price: "50 Bs" }],
    aromas: ["Chicle", "Uva", "Fresa", "Melón", "Maracuyá"],
  },
];

// Completá estos datos con la información real de contacto.
export const contact = {
  phone: "+591 77044557",
  whatsappUrl: "https://wa.me/59177044557",
  email: "caetano.artesanal@gmail.com",
  location: "Santa Cruz - Bolivia",
  instagramHandle: "@caetanobo",
  instagramUrl: "https://instagram.com/caetanobo",
};

export const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Sobre nosotros" },
  { href: "#productos", label: "Productos" },
  { href: "#contacto", label: "Contacto" },
];
