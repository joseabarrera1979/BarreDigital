import Link from "next/link";
import { products, type ProductIcon } from "@/modules/products/catalog";

function ProductMark({ icon }: { icon: ProductIcon }) {
  if (icon === "nutrition") {
    return (
      <span className="product-mark product-mark--nutri" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    );
  }

  if (icon === "calendar") {
    return (
      <span className="product-mark product-mark--agenda" aria-hidden="true">
        <span>15</span>
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    );
  }

  const illustrations = {
    clubs: (
      <>
        <path d="M37 8 54 14v15c0 12-7 21-17 27-10-6-17-15-17-27V14L37 8Z" />
        <path d="m37 19 2.5 5 5.5.8-4 3.8 1 5.5-5-2.6-5 2.6 1-5.5-4-3.8 5.5-.8 2.5-5Z" className="product-mark__accent" />
        <circle cx="51" cy="46" r="7" />
        <path d="m48 41 6 10m1-11-8 12" />
      </>
    ),
    automotive: (
      <>
        <path d="m15 39 4-13c1-3 3-5 6-5h23c3 0 5 2 6 5l4 13v9H15v-9Z" />
        <path d="m21 37 3-10h25l4 10H21Z" className="product-mark__accent" />
        <path d="M15 39h43M23 48v5m32-5v5" />
        <circle cx="24" cy="43" r="2" />
        <circle cx="50" cy="43" r="2" />
      </>
    ),
    billing: (
      <>
        <path d="M22 10h22l10 10v34H22V10Z" />
        <path d="M44 10v11h10" />
        <path d="M29 29h18m-18 8h18m-18 8h10" />
        <path d="M29 22h8" className="product-mark__accent" />
      </>
    ),
  } as const;

  return (
    <span className={`product-mark product-mark--${icon}`} aria-hidden="true">
      <svg viewBox="0 0 72 72" focusable="false">
        {illustrations[icon]}
      </svg>
    </span>
  );
}

const processSteps = [
  { number: "01", title: "Entender", text: "Partimos de necesidades concretas." },
  { number: "02", title: "Diseñar", text: "Cuidamos la solución y cada interacción." },
  { number: "03", title: "Desarrollar", text: "Convertimos ideas claras en herramientas digitales." },
  { number: "04", title: "Evolucionar", text: "Construimos productos que pueden crecer con el tiempo." },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Barre Digital, inicio">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>barre<span className="brand-light">digital</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#productos">Productos</a>
          <a href="#servicios">Servicios</a>
          <a className="nav-cta" href="#contacto">Contacto <span aria-hidden="true">↗</span></a>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="Abrir menú de navegación">
            <span>Menú</span><span className="menu-symbol" aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Navegación móvil">
            <a href="#productos">Productos</a>
            <a href="#servicios">Servicios</a>
            <a href="#contacto">Contacto <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </header>

      <main>
        <section className="hero section-wrap" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Tecnología con propósito</p>
            <h1 id="hero-title"><span className="title-line title-line--primary">Diseñamos,</span><span className="title-line title-line--secondary">desarrollamos y</span><span className="title-line title-line--primary">evolucionamos</span><span className="title-line title-line--secondary">soluciones digitales.</span></h1>
            <p className="hero-text">Creamos software con una mirada práctica: entender el problema, cuidar cada interacción y hacer simple lo importante.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#productos">Explorar productos <span aria-hidden="true">↓</span></a>
              <a className="button button-quiet" href="#servicios">Qué hacemos <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="art-ring art-ring--outer" />
            <div className="art-ring art-ring--inner" />
            <div className="art-core"><span>b.</span><i /></div>
            <span className="art-tag art-tag--top">IDEA <b>↗</b> SOLUCIÓN</span>
            <span className="art-tag art-tag--bottom">BARRE DIGITAL <b>—</b> 01</span>
            <span className="art-cross art-cross--one">+</span>
            <span className="art-cross art-cross--two">+</span>
          </div>

          <div className="hero-foot"><span>Desarrollo independiente</span><span>Buenos Aires · Argentina</span><a href="#productos">Deslizá <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="products section-wrap" id="productos" aria-labelledby="products-title">
          <div className="section-heading">
            <div><p className="eyebrow"><span>01</span> / Productos</p><h2 id="products-title"><span className="title-line title-line--primary">Ideas que toman</span><span className="title-line title-line--secondary"><em>forma propia.</em></span></h2></div>
            <p>Herramientas digitales pensadas para acompañar tareas reales y necesidades cotidianas.</p>
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <article className={`product-entry product-entry--${product.id}`} key={product.id}>
                <div className="product-meta"><span>0{index + 1}</span><span>Producto digital</span></div>
                <ProductMark icon={product.icon} />
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  {product.detailPath ? (
                    <Link className="inline-link inline-link--button" href={product.detailPath}>
                      {product.id === "nutri" ? `Conocer ${product.name}` : "Conocer más"} <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    null
                  )}
                </div>
                {product.detailPath ? <span className="product-arrow" aria-hidden="true">↗</span> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="services" id="servicios" aria-labelledby="services-title">
          <div className="services-inner section-wrap">
            <div className="services-heading">
              <p className="eyebrow"><span>02</span> / Qué hacemos</p>
              <h2 id="services-title"><span className="title-line title-line--primary services-title-primary">Tecnología útil.</span><span className="title-line title-line--secondary"><em className="editorial-italic">Diseñada con intención.</em></span></h2>
              <p>Barre Digital crea soluciones de software desde una mirada práctica: comprender el problema, diseñar con cuidado y construir productos que puedan evolucionar.</p>
            </div>
            <ol className="process-list">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className="process-mark" aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact section-wrap" id="contacto" aria-labelledby="contact-title">
          <div className="contact-index"><span>03 / Cierre</span><span className="contact-cross" aria-hidden="true">✳</span></div>
          <p className="eyebrow">Barre Digital</p>
          <h2 id="contact-title"><span className="title-line title-line--primary">Las buenas soluciones</span><span className="title-line title-line--secondary">empiezan por <em>entender.</em></span></h2>
          <p className="contact-copy">Diseñamos, desarrollamos y evolucionamos soluciones digitales para necesidades concretas.</p>
          <span className="contact-rule" aria-hidden="true" />
          <span className="contact-signature">Soluciones digitales, con intención.</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner section-wrap">
          <a className="brand" href="#inicio" aria-label="Barre Digital, volver al inicio">
            <span className="brand-mark" aria-hidden="true">b.</span>
            <span>barre<span className="brand-light">digital</span></span>
          </a>
          <nav aria-label="Navegación secundaria">
            <a href="#productos">Productos</a>
            <a href="#servicios">Qué hacemos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <p>© Barre Digital</p>
        </div>
      </footer>
    </>
  );
}
