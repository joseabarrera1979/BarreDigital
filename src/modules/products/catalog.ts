export type ProductId =
  | "nutri"
  | "agenda-turnos"
  | "clubes-torneos"
  | "automotores"
  | "facturacion";
export type ProductIcon =
  | "nutrition"
  | "calendar"
  | "clubs"
  | "automotive"
  | "billing";

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  icon: ProductIcon;
  detailPath?: string;
  detailSlug?: string;
};

export const products: Product[] = [
  {
    id: "nutri",
    name: "Nutri",
    description: "Una herramienta digital enfocada en nutrición y organización cotidiana.",
    icon: "nutrition",
    detailPath: "/productos/nutri",
    detailSlug: "nutri",
  },
  {
    id: "agenda-turnos",
    name: "Turnos",
    description: "Una agenda digital para organizar turnos de forma clara.",
    icon: "calendar",
    detailPath: "/productos/turnos",
    detailSlug: "turnos",
  },
  {
    id: "clubes-torneos",
    name: "Clubes y Torneos",
    description:
      "Plataforma de gestión para clubes, instituciones deportivas y organizadores de competencias.",
    icon: "clubs",
    detailPath: "/productos/clubes-y-torneos",
    detailSlug: "clubes-y-torneos",
  },
  {
    id: "automotores",
    name: "Automotores",
    description:
      "Sistema integral de gestión comercial para concesionarias, agencias y compraventas de vehículos.",
    icon: "automotive",
    detailPath: "/productos/automotores",
    detailSlug: "automotores",
  },
  {
    id: "facturacion",
    name: "Facturación",
    description:
      "Sistema integral de facturación y gestión administrativa, diseñado para múltiples actividades y modelos de negocio.",
    icon: "billing",
    detailPath: "/productos/facturacion",
    detailSlug: "facturacion",
  },
];

export function getProductByDetailSlug(slug: string): Product | undefined {
  return products.find((product) => product.detailSlug === slug && product.detailPath);
}

export function getProductsWithDetailPages(): Product[] {
  return products.filter((product) => product.detailPath && product.detailSlug);
}
