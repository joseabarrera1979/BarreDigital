import Link from "next/link";
import {
  getProductStatusLabel,
  products,
} from "@/modules/products/catalog";

const planningAreas = [
  "Clientes",
  "Productos",
  "Licencias",
  "Activaciones",
  "Versiones",
  "Instaladores",
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Barre Digital, inicio">
          <span className="brand-mark">b.</span>
          <span>barre<span className="brand-light">digital</span></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#aplicaciones">Aplicaciones</a>
          <a href="#plataforma">Plataforma</a>
          <a className="nav-cta" href="#enfoque">Qué hacemos <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
      <section className="hero section-wrap" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Tecnología con propósito</p>
          <h1>Ideas claras.<br /><span>Soluciones digitales.</span></h1>
          <p className="hero-text">Diseñamos y desarrollamos herramientas digitales que ayudan a resolver necesidades concretas, con foco en la experiencia y el uso cotidiano.</p>
          <a className="text-link" href="#aplicaciones">Conocé nuestras aplicaciones <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-label="Composición abstracta con formas geométricas" role="img">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-disc"><span className="disc-cut" /><span className="disc-dot" /></div>
          <div className="art-label label-top">IDEA <span>→</span> PRODUCTO</div>
          <div className="art-label label-bottom">HECHO PARA EL DÍA A DÍA <span>✳</span></div>
          <span className="art-index">01 / 03</span>
        </div>
        <div className="hero-foot"><span>Desarrollo independiente</span><span>Buenos Aires · Argentina</span><span className="scroll-cue">DESLIZÁ <span>↓</span></span></div>
      </section>

      <section className="intro section-wrap" id="enfoque">
        <p className="eyebrow">01 — Nuestro enfoque</p>
        <div className="intro-content"><h2>Lo digital funciona mejor cuando <em>hace simple</em> lo importante.</h2><p>Barre Digital crea soluciones de software con una mirada práctica: entender el problema, cuidar cada interacción y construir productos que puedan evolucionar con el tiempo.</p></div>
      </section>

      <section className="apps section-wrap" id="aplicaciones">
        <div className="section-heading"><div><p className="eyebrow">02 — Aplicaciones</p><h2>Productos en camino.</h2></div><p>Un conjunto de herramientas pensadas para acompañar tareas reales.</p></div>
        {products.map((product, index) => (
          <article className="app-card" key={product.id}>
            <div className="app-number">A / {String(index + 1).padStart(2, "0")}</div>
            <div
              className={product.icon === "nutrition" ? "nutri-icon" : "agenda-icon"}
              aria-hidden="true"
            >
              {product.icon === "nutrition" ? (
                <><span /><span /><span /></>
              ) : (
                <><span>15</span><i /><i /><i /><i /><i /><i /><i /></>
              )}
            </div>
            <div className="app-description">
              <p className={`status ${product.status === "planned" ? "status-planned" : "status-current"}`}>
                <span /> {getProductStatusLabel(product.status)}
              </p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {product.hasDetailPage && (
                <Link className="product-detail-link" href={`/productos/${product.id}`}>
                  Ver detalle de {product.name}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </article>
        ))}
        <p className="section-note"><span aria-hidden="true">✳</span> Cada producto evoluciona a su propio ritmo. La disponibilidad puede variar.</p>
      </section>

      <section className="platform section-wrap" id="plataforma">
        <div className="platform-copy"><p className="eyebrow">03 — Próximos pasos</p><h2>Una base para<br /><em>crecer con orden.</em></h2><p>También está en planificación una plataforma de administración para acompañar el ciclo de vida de los productos digitales.</p><div className="planning-badge"><span /> ÁREA EN PLANIFICACIÓN</div></div>
        <div className="platform-panel"><div className="panel-top"><span>BARRE / ADMINISTRACIÓN</span><span>VISIÓN INICIAL</span></div><h3 className="panel-title">Áreas contempladas</h3><ul>{planningAreas.map((area, index) => <li key={area}><span className="area-index">0{index + 1}</span>{area}<span className="area-state">POR DEFINIR</span></li>)}</ul><div className="panel-foot"><span>Alcance sujeto a definición</span><span>↗</span></div></div>
        <p className="platform-disclaimer">Estas áreas representan una planificación inicial. No son funciones disponibles ni implementadas.</p>
      </section>

      </main>
      <footer className="site-footer section-wrap"><a className="brand" href="#inicio"><span className="brand-mark">b.</span><span>barre<span className="brand-light">digital</span></span></a><p>Software pensado con intención.</p><span className="footer-end">© Barre Digital</span></footer>
    </>
  );
}
