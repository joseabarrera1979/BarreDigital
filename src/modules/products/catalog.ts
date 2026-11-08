export const productStatusLabels = {
  development: "En desarrollo",
  planned: "En planificación",
} as const;

export type ProductId = "nutri" | "agenda-turnos";
export type ProductStatus = keyof typeof productStatusLabels;
export type ProductIcon = "nutrition" | "calendar";

export type Product = {
  id: ProductId;
  name: string;
  status: ProductStatus;
  description: string;
  complementaryDescription?: string;
  icon: ProductIcon;
  hasDetailPage: boolean;
};

export const products: Product[] = [
  {
    id: "nutri",
    name: "Nutri",
    status: "development",
    description: "Una herramienta digital enfocada en nutrición y organización cotidiana.",
    complementaryDescription:
      "El proyecto contempla módulos relacionados con pacientes, evaluaciones nutricionales y mediciones antropométricas. Sus funcionalidades continúan sujetas a verificación y desarrollo.",
    icon: "nutrition",
    hasDetailPage: true,
  },
  {
    id: "agenda-turnos",
    name: "Agenda de turnos",
    status: "planned",
    description: "Iniciativa futura; su alcance está pendiente de definición.",
    icon: "calendar",
    hasDetailPage: false,
  },
];

export function getProductByDetailSlug(slug: string): Product | undefined {
  return products.find((product) => product.id === slug && product.hasDetailPage);
}

export function getProductsWithDetailPages(): Product[] {
  return products.filter((product) => product.hasDetailPage);
}

export function getProductStatusLabel(status: ProductStatus): string {
  return productStatusLabels[status];
}
