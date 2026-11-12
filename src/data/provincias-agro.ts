// Datos agrícolas de referencia por provincia (estimaciones aproximadas).
// Claves = código INDEC/IGN de la provincia, igual al `id` del archivo de límites.

export type Region = "pampeana" | "noa" | "nea" | "cuyo" | "patagonia";

export interface CultivoCosto {
  nombre: string;
  /** Costo de producción estimado por hectárea, en dólares. */
  costoUsdHa: number;
}

export interface ProvinciaAgro {
  nombre: string;
  region: Region;
  recomendado: { cultivo: string; motivo: string };
  masCosechado: { cultivo: string; detalle: string };
  cultivos: CultivoCosto[];
  clima: {
    tipo: string;
    tempMedia: number;
    tempVerano: number;
    tempInvierno: number;
    lluviaAnualMm: number;
  };
}

export const REGIONES: Record<Region, string> = {
  pampeana: "Región Pampeana",
  noa: "Noroeste (NOA)",
  nea: "Noreste (NEA)",
  cuyo: "Cuyo",
  patagonia: "Patagonia",
};

export const PROVINCIAS_AGRO: Record<string, ProvinciaAgro> = {
  "02": {
    nombre: "Ciudad Autónoma de Buenos Aires",
    region: "pampeana",
    recomendado: { cultivo: "Huerta urbana", motivo: "Sin superficie rural: ideal para hortalizas de hoja en terrazas y huertas comunitarias." },
    masCosechado: { cultivo: "Hortalizas de hoja", detalle: "Producción urbana a pequeña escala, sin agricultura extensiva." },
    cultivos: [
      { nombre: "Hortalizas de hoja", costoUsdHa: 3500 },
      { nombre: "Aromáticas", costoUsdHa: 4000 },
    ],
    clima: { tipo: "Templado húmedo", tempMedia: 18, tempVerano: 25, tempInvierno: 11, lluviaAnualMm: 1250 },
  },
  "06": {
    nombre: "Buenos Aires",
    region: "pampeana",
    recomendado: { cultivo: "Trigo", motivo: "Inviernos templados y suelos profundos; clave para rotar con soja y maíz." },
    masCosechado: { cultivo: "Soja", detalle: "Principal cultivo por superficie sembrada en la provincia." },
    cultivos: [
      { nombre: "Soja", costoUsdHa: 380 },
      { nombre: "Maíz", costoUsdHa: 650 },
      { nombre: "Trigo", costoUsdHa: 420 },
      { nombre: "Girasol", costoUsdHa: 400 },
      { nombre: "Cebada", costoUsdHa: 430 },
    ],
    clima: { tipo: "Templado húmedo", tempMedia: 15, tempVerano: 23, tempInvierno: 8, lluviaAnualMm: 900 },
  },
  "14": {
    nombre: "Córdoba",
    region: "pampeana",
    recomendado: { cultivo: "Maní", motivo: "Suelos sueltos del sur cordobés; la provincia concentra casi todo el maní del país." },
    masCosechado: { cultivo: "Maíz", detalle: "Primera productora nacional de maíz." },
    cultivos: [
      { nombre: "Maíz", costoUsdHa: 680 },
      { nombre: "Soja", costoUsdHa: 370 },
      { nombre: "Maní", costoUsdHa: 950 },
      { nombre: "Trigo", costoUsdHa: 400 },
    ],
    clima: { tipo: "Templado subhúmedo", tempMedia: 17, tempVerano: 24, tempInvierno: 10, lluviaAnualMm: 800 },
  },
  "82": {
    nombre: "Santa Fe",
    region: "pampeana",
    recomendado: { cultivo: "Maíz", motivo: "Zona núcleo con alto rinde; mejora el balance de carbono en rotación con soja." },
    masCosechado: { cultivo: "Soja", detalle: "Corazón de la zona núcleo sojera y del complejo exportador." },
    cultivos: [
      { nombre: "Soja", costoUsdHa: 360 },
      { nombre: "Maíz", costoUsdHa: 640 },
      { nombre: "Trigo", costoUsdHa: 410 },
      { nombre: "Algodón", costoUsdHa: 850 },
    ],
    clima: { tipo: "Templado húmedo", tempMedia: 18.5, tempVerano: 26, tempInvierno: 11, lluviaAnualMm: 1000 },
  },
  "30": {
    nombre: "Entre Ríos",
    region: "pampeana",
    recomendado: { cultivo: "Arroz", motivo: "Abundante agua de riego y suelos arcillosos aptos para arroceras." },
    masCosechado: { cultivo: "Soja", detalle: "Cultivo dominante en la superficie agrícola provincial." },
    cultivos: [
      { nombre: "Soja", costoUsdHa: 370 },
      { nombre: "Maíz", costoUsdHa: 620 },
      { nombre: "Arroz", costoUsdHa: 1300 },
      { nombre: "Trigo", costoUsdHa: 400 },
      { nombre: "Cítricos", costoUsdHa: 4200 },
    ],
    clima: { tipo: "Templado húmedo", tempMedia: 18, tempVerano: 25, tempInvierno: 11, lluviaAnualMm: 1100 },
  },
  "42": {
    nombre: "La Pampa",
    region: "pampeana",
    recomendado: { cultivo: "Girasol", motivo: "Tolera bien la sequía y los suelos arenosos del oeste pampeano." },
    masCosechado: { cultivo: "Maíz", detalle: "Lidera la cosecha en el este provincial, junto a trigo y girasol." },
    cultivos: [
      { nombre: "Girasol", costoUsdHa: 380 },
      { nombre: "Trigo", costoUsdHa: 380 },
      { nombre: "Maíz", costoUsdHa: 600 },
      { nombre: "Sorgo", costoUsdHa: 380 },
    ],
    clima: { tipo: "Templado semiárido", tempMedia: 15.5, tempVerano: 24, tempInvierno: 7, lluviaAnualMm: 600 },
  },
  "74": {
    nombre: "San Luis",
    region: "cuyo",
    recomendado: { cultivo: "Sorgo", motivo: "Muy eficiente en el uso del agua para un régimen de lluvias escaso." },
    masCosechado: { cultivo: "Maíz", detalle: "Principal grano, sobre todo en el este provincial." },
    cultivos: [
      { nombre: "Maíz", costoUsdHa: 620 },
      { nombre: "Soja", costoUsdHa: 360 },
      { nombre: "Sorgo", costoUsdHa: 370 },
      { nombre: "Girasol", costoUsdHa: 380 },
    ],
    clima: { tipo: "Templado semiárido", tempMedia: 17, tempVerano: 24, tempInvierno: 9, lluviaAnualMm: 650 },
  },
  "50": {
    nombre: "Mendoza",
    region: "cuyo",
    recomendado: { cultivo: "Ajo", motivo: "Clima seco y amplitud térmica ideales; alto valor de exportación." },
    masCosechado: { cultivo: "Uva (vid)", detalle: "Primera provincia vitivinícola del país." },
    cultivos: [
      { nombre: "Vid", costoUsdHa: 6500 },
      { nombre: "Ajo", costoUsdHa: 7000 },
      { nombre: "Olivo", costoUsdHa: 3200 },
      { nombre: "Durazno", costoUsdHa: 6000 },
      { nombre: "Tomate", costoUsdHa: 7500 },
    ],
    clima: { tipo: "Árido de montaña", tempMedia: 16, tempVerano: 24, tempInvierno: 7, lluviaAnualMm: 220 },
  },
  "70": {
    nombre: "San Juan",
    region: "cuyo",
    recomendado: { cultivo: "Olivo", motivo: "Mucho sol, baja humedad y riego por goteo: aceitunas de gran calidad." },
    masCosechado: { cultivo: "Uva (vid)", detalle: "Segunda productora de uva, para vino, mesa y pasas." },
    cultivos: [
      { nombre: "Vid", costoUsdHa: 6000 },
      { nombre: "Olivo", costoUsdHa: 3200 },
      { nombre: "Tomate", costoUsdHa: 7500 },
      { nombre: "Cebolla", costoUsdHa: 3500 },
    ],
    clima: { tipo: "Árido", tempMedia: 17.5, tempVerano: 27, tempInvierno: 8, lluviaAnualMm: 100 },
  },
  "46": {
    nombre: "La Rioja",
    region: "noa",
    recomendado: { cultivo: "Nogal", motivo: "Valles con inviernos fríos y veranos secos que favorecen la nuez." },
    masCosechado: { cultivo: "Olivo", detalle: "Una de las mayores superficies olivícolas del país." },
    cultivos: [
      { nombre: "Olivo", costoUsdHa: 3000 },
      { nombre: "Vid", costoUsdHa: 5500 },
      { nombre: "Nogal", costoUsdHa: 4500 },
      { nombre: "Jojoba", costoUsdHa: 2500 },
    ],
    clima: { tipo: "Árido", tempMedia: 19, tempVerano: 27, tempInvierno: 10, lluviaAnualMm: 300 },
  },
  "10": {
    nombre: "Catamarca",
    region: "noa",
    recomendado: { cultivo: "Nogal", motivo: "Tradición nogalera en los valles y buena demanda de nuez." },
    masCosechado: { cultivo: "Olivo", detalle: "Gran producción de aceituna y aceite de oliva." },
    cultivos: [
      { nombre: "Olivo", costoUsdHa: 3000 },
      { nombre: "Nogal", costoUsdHa: 4500 },
      { nombre: "Vid", costoUsdHa: 5500 },
      { nombre: "Pimiento (pimentón)", costoUsdHa: 3000 },
    ],
    clima: { tipo: "Árido de sierras", tempMedia: 20, tempVerano: 27, tempInvierno: 11, lluviaAnualMm: 400 },
  },
  "90": {
    nombre: "Tucumán",
    region: "noa",
    recomendado: { cultivo: "Limón", motivo: "Pedemonte húmedo y sin heladas fuertes; líder mundial en limón." },
    masCosechado: { cultivo: "Caña de azúcar", detalle: "Principal provincia azucarera de Argentina." },
    cultivos: [
      { nombre: "Caña de azúcar", costoUsdHa: 1600 },
      { nombre: "Limón", costoUsdHa: 4500 },
      { nombre: "Soja", costoUsdHa: 380 },
      { nombre: "Poroto", costoUsdHa: 500 },
    ],
    clima: { tipo: "Subtropical serrano", tempMedia: 19.5, tempVerano: 25, tempInvierno: 13, lluviaAnualMm: 1000 },
  },
  "66": {
    nombre: "Salta",
    region: "noa",
    recomendado: { cultivo: "Poroto", motivo: "La provincia lidera el poroto seco, muy demandado para exportación." },
    masCosechado: { cultivo: "Soja", detalle: "Principal cultivo extensivo del este salteño." },
    cultivos: [
      { nombre: "Soja", costoUsdHa: 400 },
      { nombre: "Poroto", costoUsdHa: 550 },
      { nombre: "Maíz", costoUsdHa: 650 },
      { nombre: "Tabaco", costoUsdHa: 3500 },
      { nombre: "Caña de azúcar", costoUsdHa: 1600 },
    ],
    clima: { tipo: "Subtropical con estación seca", tempMedia: 18, tempVerano: 23, tempInvierno: 11, lluviaAnualMm: 750 },
  },
  "38": {
    nombre: "Jujuy",
    region: "noa",
    recomendado: { cultivo: "Tabaco", motivo: "Valles templados con tradición tabacalera de tipo Virginia." },
    masCosechado: { cultivo: "Caña de azúcar", detalle: "Ingenios de los valles cálidos (Ledesma, entre otros)." },
    cultivos: [
      { nombre: "Caña de azúcar", costoUsdHa: 1600 },
      { nombre: "Tabaco", costoUsdHa: 3500 },
      { nombre: "Hortalizas", costoUsdHa: 3500 },
      { nombre: "Quinoa", costoUsdHa: 800 },
    ],
    clima: { tipo: "Subtropical serrano y puna", tempMedia: 17, tempVerano: 22, tempInvierno: 10, lluviaAnualMm: 800 },
  },
  "86": {
    nombre: "Santiago del Estero",
    region: "noa",
    recomendado: { cultivo: "Algodón", motivo: "Calor y estación larga; muy adaptado al riego del Río Dulce." },
    masCosechado: { cultivo: "Maíz", detalle: "Crecimiento fuerte del maíz en la frontera agrícola." },
    cultivos: [
      { nombre: "Maíz", costoUsdHa: 620 },
      { nombre: "Soja", costoUsdHa: 370 },
      { nombre: "Algodón", costoUsdHa: 850 },
      { nombre: "Sorgo", costoUsdHa: 380 },
    ],
    clima: { tipo: "Subtropical semiárido", tempMedia: 21.5, tempVerano: 28, tempInvierno: 14, lluviaAnualMm: 600 },
  },
  "22": {
    nombre: "Chaco",
    region: "nea",
    recomendado: { cultivo: "Algodón", motivo: "Primera provincia algodonera; clima cálido y suelos aptos." },
    masCosechado: { cultivo: "Soja", detalle: "Mayor superficie sembrada de la provincia." },
    cultivos: [
      { nombre: "Soja", costoUsdHa: 360 },
      { nombre: "Algodón", costoUsdHa: 850 },
      { nombre: "Girasol", costoUsdHa: 380 },
      { nombre: "Maíz", costoUsdHa: 600 },
    ],
    clima: { tipo: "Subtropical", tempMedia: 21.5, tempVerano: 27.5, tempInvierno: 15, lluviaAnualMm: 1000 },
  },
  "34": {
    nombre: "Formosa",
    region: "nea",
    recomendado: { cultivo: "Arroz", motivo: "Bañados y ríos permiten riego por inundación a bajo costo." },
    masCosechado: { cultivo: "Algodón", detalle: "Cultivo tradicional de los productores formoseños." },
    cultivos: [
      { nombre: "Algodón", costoUsdHa: 820 },
      { nombre: "Arroz", costoUsdHa: 1300 },
      { nombre: "Banana", costoUsdHa: 4000 },
      { nombre: "Zapallo", costoUsdHa: 1200 },
    ],
    clima: { tipo: "Subtropical húmedo", tempMedia: 23, tempVerano: 28, tempInvierno: 17, lluviaAnualMm: 1100 },
  },
  "18": {
    nombre: "Corrientes",
    region: "nea",
    recomendado: { cultivo: "Cítricos", motivo: "Sin heladas severas y con lluvias abundantes: naranja y mandarina." },
    masCosechado: { cultivo: "Arroz", detalle: "Primera provincia arrocera del país." },
    cultivos: [
      { nombre: "Arroz", costoUsdHa: 1350 },
      { nombre: "Yerba mate", costoUsdHa: 1300 },
      { nombre: "Cítricos", costoUsdHa: 4200 },
      { nombre: "Tabaco", costoUsdHa: 3500 },
    ],
    clima: { tipo: "Subtropical húmedo", tempMedia: 21, tempVerano: 27, tempInvierno: 14.5, lluviaAnualMm: 1400 },
  },
  "54": {
    nombre: "Misiones",
    region: "nea",
    recomendado: { cultivo: "Té", motivo: "Suelos rojos ácidos y alta humedad, perfectos para el té." },
    masCosechado: { cultivo: "Yerba mate", detalle: "Produce la mayor parte de la yerba mate del país." },
    cultivos: [
      { nombre: "Yerba mate", costoUsdHa: 1300 },
      { nombre: "Té", costoUsdHa: 1500 },
      { nombre: "Tabaco", costoUsdHa: 3500 },
      { nombre: "Mandioca", costoUsdHa: 900 },
    ],
    clima: { tipo: "Subtropical sin estación seca", tempMedia: 21, tempVerano: 26, tempInvierno: 15, lluviaAnualMm: 1900 },
  },
  "58": {
    nombre: "Neuquén",
    region: "patagonia",
    recomendado: { cultivo: "Vid", motivo: "Gran amplitud térmica para vinos patagónicos de alta gama." },
    masCosechado: { cultivo: "Manzana", detalle: "Fruticultura bajo riego en el Alto Valle." },
    cultivos: [
      { nombre: "Manzana", costoUsdHa: 9500 },
      { nombre: "Pera", costoUsdHa: 9000 },
      { nombre: "Vid", costoUsdHa: 6000 },
      { nombre: "Alfalfa", costoUsdHa: 450 },
    ],
    clima: { tipo: "Frío árido", tempMedia: 14, tempVerano: 22, tempInvierno: 5, lluviaAnualMm: 200 },
  },
  "62": {
    nombre: "Río Negro",
    region: "patagonia",
    recomendado: { cultivo: "Cebolla", motivo: "El Valle Inferior ofrece riego y suelos ideales para exportar cebolla." },
    masCosechado: { cultivo: "Pera", detalle: "Primera región exportadora de peras del hemisferio sur." },
    cultivos: [
      { nombre: "Pera", costoUsdHa: 9000 },
      { nombre: "Manzana", costoUsdHa: 9500 },
      { nombre: "Cebolla", costoUsdHa: 3500 },
      { nombre: "Alfalfa", costoUsdHa: 450 },
    ],
    clima: { tipo: "Templado frío árido", tempMedia: 14, tempVerano: 22, tempInvierno: 6, lluviaAnualMm: 300 },
  },
  "26": {
    nombre: "Chubut",
    region: "patagonia",
    recomendado: { cultivo: "Cereza", motivo: "Cosecha tardía que llega a contraestación a los mercados del norte." },
    masCosechado: { cultivo: "Alfalfa", detalle: "Forraje bajo riego en los valles del río Chubut." },
    cultivos: [
      { nombre: "Alfalfa", costoUsdHa: 450 },
      { nombre: "Cereza", costoUsdHa: 15000 },
      { nombre: "Papa", costoUsdHa: 4500 },
      { nombre: "Avena", costoUsdHa: 300 },
    ],
    clima: { tipo: "Frío árido patagónico", tempMedia: 12, tempVerano: 19, tempInvierno: 4, lluviaAnualMm: 200 },
  },
  "78": {
    nombre: "Santa Cruz",
    region: "patagonia",
    recomendado: { cultivo: "Cereza", motivo: "Microclima de Los Antiguos, con fruta de gran calibre." },
    masCosechado: { cultivo: "Pasturas forrajeras", detalle: "La mayor parte de la tierra se destina a ganadería ovina." },
    cultivos: [
      { nombre: "Cereza", costoUsdHa: 15000 },
      { nombre: "Alfalfa", costoUsdHa: 450 },
      { nombre: "Papa", costoUsdHa: 4500 },
      { nombre: "Hortalizas de invernadero", costoUsdHa: 5000 },
    ],
    clima: { tipo: "Frío árido", tempMedia: 8, tempVerano: 14, tempInvierno: 1, lluviaAnualMm: 200 },
  },
  "94": {
    nombre: "Tierra del Fuego",
    region: "patagonia",
    recomendado: { cultivo: "Hortalizas de invernadero", motivo: "El cultivo protegido evita heladas y vientos fuertes." },
    masCosechado: { cultivo: "Pasturas naturales", detalle: "Uso principalmente ganadero; agricultura muy limitada." },
    cultivos: [
      { nombre: "Hortalizas de invernadero", costoUsdHa: 6000 },
      { nombre: "Papa", costoUsdHa: 4500 },
      { nombre: "Forrajeras", costoUsdHa: 250 },
    ],
    clima: { tipo: "Frío oceánico", tempMedia: 5.5, tempVerano: 10, tempInvierno: 0.5, lluviaAnualMm: 500 },
  },
};
