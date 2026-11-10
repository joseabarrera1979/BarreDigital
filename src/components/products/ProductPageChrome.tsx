import Link from "next/link";

export function ProductPageChrome({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/#inicio" aria-label="Barre Digital, inicio">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>barre<span className="brand-light">digital</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link href="/#productos">Productos</Link>
          <Link href="/#servicios">Servicios</Link>
          <Link className="nav-cta" href="/#contacto">Contacto <span aria-hidden="true">↗</span></Link>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="Abrir menú de navegación">
            <span>Menú</span><span className="menu-symbol" aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Navegación móvil">
            <Link href="/#productos">Productos</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/#contacto">Contacto <span aria-hidden="true">↗</span></Link>
          </nav>
        </details>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-inner section-wrap">
          <Link className="brand" href="/#inicio" aria-label="Barre Digital, volver al inicio">
            <span className="brand-mark" aria-hidden="true">b.</span>
            <span>barre<span className="brand-light">digital</span></span>
          </Link>
          <nav aria-label="Navegación secundaria">
            <Link href="/#productos">Productos</Link>
            <Link href="/#servicios">Qué hacemos</Link>
            <Link href="/#contacto">Contacto</Link>
          </nav>
          <p>© Barre Digital</p>
        </div>
      </footer>
    </>
  );
}
