import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductByDetailSlug,
  getProductStatusLabel,
  getProductsWithDetailPages,
} from "@/modules/products/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductsWithDetailPages().map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByDetailSlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | Barre Digital`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductByDetailSlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Barre Digital, inicio">
          <span className="brand-mark">b.</span>
          <span>barre<span className="brand-light">digital</span></span>
        </Link>
        <nav aria-label="Navegación principal">
          <Link href="/#aplicaciones">Aplicaciones</Link>
          <Link href="/#plataforma">Plataforma</Link>
          <Link className="nav-cta" href="/#enfoque">
            Qué hacemos <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <main className="product-detail section-wrap">
        <Link className="detail-back-link" href="/#aplicaciones">
          <span aria-hidden="true">←</span> Volver al catálogo
        </Link>
        <article className="product-detail-card">
          <div className="product-detail-hero">
            <div className="product-detail-copy">
              <p className={`status product-detail-status ${product.status === "planned" ? "status-planned" : "status-current"}`}>
                <span /> {getProductStatusLabel(product.status)}
              </p>
              <h1>{product.name}</h1>
              <p className="product-detail-description">{product.description}</p>
            </div>
            <div className="product-detail-art" aria-hidden="true">
              <span className="product-detail-orbit product-detail-orbit-one" />
              <span className="product-detail-orbit product-detail-orbit-two" />
              <div className="nutri-icon product-detail-icon">
                <span /><span /><span />
              </div>
              <span className="product-detail-art-index">N / 01</span>
            </div>
          </div>
          {product.complementaryDescription ? (
            <div className="product-detail-context">
              <p className="eyebrow">Sobre el proyecto</p>
              <p className="product-detail-description">{product.complementaryDescription}</p>
            </div>
          ) : null}
        </article>
      </main>

      <footer className="site-footer section-wrap">
        <Link className="brand" href="/" aria-label="Barre Digital, inicio">
          <span className="brand-mark">b.</span>
          <span>barre<span className="brand-light">digital</span></span>
        </Link>
        <p>Software pensado con intención.</p>
        <span className="footer-end">© Barre Digital</span>
      </footer>
    </>
  );
}
