import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPageChrome } from "@/components/products/ProductPageChrome";
import {
  getProductByDetailSlug,
  getProductsWithDetailPages,
  type ProductId,
} from "@/modules/products/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const nutriFeatures = [
  {
    number: "01",
    symbol: "◌",
    title: "Pacientes y seguimiento",
    text: "Fichas, historial y controles para acompañar la evolución de cada persona.",
  },
  {
    number: "02",
    symbol: "⌁",
    title: "Evaluación nutricional",
    text: "Anamnesis alimentaria y evaluaciones para reunir el contexto de cada consulta.",
  },
  {
    number: "03",
    symbol: "↗",
    title: "Mediciones antropométricas",
    text: "Registro de medidas y consulta de su evolución a lo largo del tiempo.",
  },
  {
    number: "04",
    symbol: "▤",
    title: "Planes de alimentación",
    text: "Organización de comidas y alimentos, con resumen nutricional e ideas de menú.",
  },
  {
    number: "05",
    symbol: "◷",
    title: "Agenda y continuidad",
    text: "Gestión de turnos y seguimientos, con recordatorios por WhatsApp sujetos a consentimiento y configuración.",
  },
  {
    number: "06",
    symbol: "⌗",
    title: "Gestión profesional",
    text: "Reportes de rendimiento y control de caja y honorarios para la práctica cotidiana.",
  },
];

const sectors = [
  { number: "01", symbol: "✳", title: "Belleza y cuidado personal", examples: "Peluquerías · Barberías · Estética · Cuidado personal" },
  { number: "02", symbol: "＋", title: "Salud y atención profesional", examples: "Consultorios · Profesionales · Centros de atención" },
  { number: "03", symbol: "↗", title: "Servicios profesionales", examples: "Asesorías · Estudios · Consultorías" },
  { number: "04", symbol: "⌁", title: "Educación y clases", examples: "Clases particulares · Academias · Institutos" },
  { number: "05", symbol: "⌘", title: "Talleres y servicios técnicos", examples: "Mecánica · Reparaciones · Mantenimiento" },
  { number: "06", symbol: "◉", title: "Deportes y bienestar", examples: "Entrenamientos · Clases grupales · Actividades" },
  { number: "07", symbol: "▦", title: "Alquiler de espacios", examples: "Canchas · Salas · Espacios de trabajo" },
];

const turnosCore = [
  { title: "Organizaciones y equipo", text: "Cada organización cuenta con integrantes, perfiles de acceso y una zona horaria propia." },
  { title: "Servicios y prestaciones", text: "Definí duración, tiempos de preparación y qué personas o recursos requiere cada servicio." },
  { title: "Personas y recursos", text: "Administrá clientes y unidades asignables como profesionales, espacios o capacidad." },
  { title: "Agendas y horarios", text: "Configurá horarios generales y por unidad, además de cierres para días o períodos concretos." },
  { title: "Consulta de disponibilidad", text: "Calculá horarios posibles considerando duración, márgenes, agenda y zona horaria." },
];

const transversalIdeas = [
  "Reservas públicas", "Formularios personalizados", "Notificaciones", "Documentos",
  "Pagos y señas", "Clases grupales", "Recurrencias", "Reportes",
];

const specializedIdeas = [
  { title: "Salud", text: "Historia clínica, consultas y consentimientos." },
  { title: "Talleres", text: "Vehículos, equipos y órdenes de trabajo." },
  { title: "Educación", text: "Herramientas de gestión académica." },
  { title: "Deportes y bienestar", text: "Actividades y membresías." },
  { title: "Servicios profesionales", text: "Expedientes y documentación." },
  { title: "Alquileres", text: "Tarifas y reglas para usar espacios." },
];

type NewProductId = Extract<ProductId, "clubes-torneos" | "automotores" | "facturacion">;

type ProductArea = {
  title: string;
  symbol: string;
  items: string[];
  description?: string;
};

const newProductPages: Record<NewProductId, {
  title: string;
  titleLines: [string, string];
  concept: string;
  eyebrow: string;
  caption: string;
  areas: ProductArea[];
}> = {
  "clubes-torneos": {
    title: "Clubes y Torneos",
    titleLines: ["Clubes y", "Torneos"],
    concept: "Una plataforma para organizar la gestión institucional, deportiva y económica, conectar participantes y administrar competencias desde un mismo lugar.",
    eyebrow: "Producto / Gestión deportiva",
    caption: "INSTITUCIONES / COMPETENCIAS",
    areas: [
      { title: "Gestión institucional", symbol: "⌘", items: ["Administración de clubes e instituciones.", "Datos institucionales y configuración.", "Gestión de sedes y espacios."] },
      { title: "Socios y participantes", symbol: "◉", items: ["Registro de socios y participantes.", "Datos personales y de contacto.", "Categorías y pertenencia institucional."] },
      {
        title: "Cuotas, cobranzas y morosidad",
        symbol: "↗",
        description: "Herramientas para administrar las obligaciones económicas de los socios, registrar cobranzas y mantener un seguimiento actualizado de los pagos pendientes, facilitando el control financiero de clubes e instituciones.",
        items: [
          "Administración de cuotas: configuración de cuotas sociales, importes y periodicidad; asignación a socios y categorías; conceptos de cobro y obligaciones por período.",
          "Registro de cobranzas: pagos asociados a socios y conceptos, historial, pagos parciales, saldos y períodos abonados.",
          "Seguimiento de morosidad: cuotas vencidas, saldos adeudados, antigüedad de deudas, listados de pagos pendientes y evolución de la morosidad.",
          "Control e información económica: resúmenes de cuotas emitidas y cobradas, deuda pendiente, indicadores y consultas por período, categoría y socio.",
        ],
      },
      { title: "Disciplinas y actividades", symbol: "✳", items: ["Administración de disciplinas.", "Categorías y divisiones.", "Organización de actividades."] },
      { title: "Equipos y planteles", symbol: "▦", items: ["Gestión de equipos.", "Integrantes y planteles.", "Organización por categorías."] },
      { title: "Torneos y competencias", symbol: "↗", items: ["Creación y configuración de torneos.", "Inscripciones de equipos y participantes.", "Fixture y programación de encuentros.", "Resultados y tablas de posiciones."] },
      { title: "Administración y seguimiento", symbol: "◌", items: ["Panel de gestión.", "Consultas y reportes.", "Seguimiento de actividades y competencias."] },
    ],
  },
  automotores: {
    title: "Automotores",
    titleLines: ["Automotores", "Gestión comercial"],
    concept: "Una solución integral para administrar la actividad comercial de concesionarias, agencias y compraventas de vehículos, desde el ingreso de una unidad hasta el cierre de la operación.",
    eyebrow: "Producto / Gestión automotriz",
    caption: "UNIDADES / OPERACIONES",
    areas: [
      { title: "Inventario de vehículos", symbol: "▦", items: ["Registro de automóviles y otras unidades.", "Marca, modelo, versión y características técnicas.", "Año, kilometraje y estado.", "Fotografías y documentación.", "Disponibilidad y estado comercial."] },
      { title: "Gestión de stock", symbol: "◉", items: ["Ingreso y egreso de unidades.", "Control de disponibilidad.", "Historial de movimientos.", "Clasificación y búsqueda de vehículos."] },
      { title: "Clientes y contactos", symbol: "⌘", items: ["Registro de clientes y potenciales compradores.", "Información de contacto.", "Historial de consultas.", "Seguimiento de oportunidades comerciales."] },
      { title: "Gestión de operaciones", symbol: "↗", items: ["Operaciones de compra y venta.", "Registro de permutas.", "Datos de las operaciones.", "Seguimiento de cada negociación."] },
      { title: "Publicaciones y consultas", symbol: "◌", items: ["Preparación de fichas comerciales de vehículos.", "Información para publicaciones.", "Gestión de consultas recibidas.", "Seguimiento de interesados."] },
      { title: "Administración y reportes", symbol: "✳", items: ["Indicadores comerciales.", "Reportes de stock y operaciones.", "Historial de actividad.", "Información para la toma de decisiones."] },
    ],
  },
  facturacion: {
    title: "Facturación",
    titleLines: ["Facturación", "Gestión multipropósito"],
    concept: "Un sistema integral de facturación y gestión administrativa, pensado para adaptarse a diferentes actividades, organizaciones y modelos de negocio.",
    eyebrow: "Producto / Gestión administrativa",
    caption: "COMPROBANTES / ADMINISTRACIÓN",
    areas: [
      { title: "Facturación y comprobantes", symbol: "▤", items: ["Emisión y administración de comprobantes.", "Gestión de documentos comerciales.", "Historial de comprobantes.", "Configuración de modalidades de facturación."] },
      { title: "Clientes y proveedores", symbol: "⌘", items: ["Registro y administración de clientes.", "Gestión de proveedores.", "Datos fiscales y comerciales.", "Historial de operaciones."] },
      { title: "Productos y servicios", symbol: "◉", items: ["Catálogo de productos.", "Catálogo de servicios.", "Precios y listas de precios.", "Clasificación y configuración."] },
      { title: "Gestión fiscal", symbol: "↗", items: ["Parámetros fiscales.", "Impuestos y alícuotas.", "Integración prevista con servicios fiscales.", "Configuración según las obligaciones aplicables."] },
      { title: "Cuentas corrientes y cobranzas", symbol: "◌", items: ["Seguimiento de saldos.", "Registro de cobros.", "Cuentas corrientes de clientes.", "Control de pagos pendientes."] },
      { title: "Administración y reportes", symbol: "✳", items: ["Resúmenes de facturación.", "Reportes de ventas.", "Consultas administrativas.", "Indicadores de gestión."] },
    ],
  },
};

export function generateStaticParams() {
  return getProductsWithDetailPages().map((product) => ({ slug: product.detailSlug! }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByDetailSlug(slug);

  if (!product) return {};

  return {
    title: `${product.name} | Barre Digital`,
    description: product.description,
  };
}

function CatalogLink() {
  return (
    <Link className="product-back-link" href="/#productos">
      <span aria-hidden="true">←</span> Volver al catálogo
    </Link>
  );
}

function NutriPage() {
  return (
    <div className="product-page product-page--nutri">
      <section className="product-hero section-wrap" aria-labelledby="product-title">
        <div className="product-hero-copy">
          <p className="eyebrow"><span>Producto / Nutrición</span></p>
          <h1 id="product-title"><span className="title-line title-line--primary">Nutri.</span><span className="title-line title-line--secondary"><em>Una mirada completa</em></span><span className="title-line title-line--primary">para cada persona.</span></h1>
          <p className="product-lead">Una herramienta para organizar la atención nutricional: desde la primera evaluación hasta el seguimiento y la planificación cotidiana.</p>
          <CatalogLink />
        </div>
        <div className="product-visual product-visual--nutri" aria-hidden="true">
          <div className="product-visual-grid" />
          <span className="nutri-orbit nutri-orbit--outer" />
          <span className="nutri-orbit nutri-orbit--inner" />
          <div className="nutri-seal"><span>n.</span><i /></div>
          <span className="visual-caption visual-caption--top">PERSONA / PROCESO</span>
          <span className="visual-caption visual-caption--bottom">NUTRICIÓN · SEGUIMIENTO</span>
        </div>
        <div className="product-hero-index"><span>BARRE DIGITAL / 01</span><span>Atención nutricional, organizada.</span></div>
      </section>

      <section className="product-story section-wrap" aria-labelledby="nutri-story-title">
        <p className="eyebrow"><span>Sobre el proyecto</span></p>
        <div>
          <h2 id="nutri-story-title"><span className="title-line title-line--primary">Más contexto para</span><span className="title-line title-line--secondary"><em>mejores decisiones.</em></span></h2>
          <p>Nutri reúne información clínica, evaluaciones, medidas y planificación alimentaria en un mismo espacio de trabajo. Así, cada consulta puede apoyarse en una historia más ordenada y dar continuidad al proceso de cada paciente.</p>
        </div>
      </section>

      <section className="product-features section-wrap" aria-labelledby="nutri-features-title">
        <div className="product-section-heading">
          <div><p className="eyebrow"><span>01</span> / Herramientas</p><h2 id="nutri-features-title"><span className="title-line title-line--primary">Un proceso.</span><span className="title-line title-line--secondary"><em className="editorial-italic">Conectado en cada etapa.</em></span></h2></div>
          <p>Funciones que acompañan la práctica profesional, desde la evaluación hasta la gestión del día a día.</p>
        </div>
        <div className="nutri-feature-grid">
          {nutriFeatures.map((feature) => (
            <article className="nutri-feature-card" key={feature.number}>
              <div className="feature-card-top"><span>{feature.number}</span><span aria-hidden="true">{feature.symbol}</span></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
        <p className="product-footnote">La disponibilidad de avisos por WhatsApp depende de la configuración del servicio y del consentimiento de cada paciente.</p>
      </section>

      <section className="product-close section-wrap">
        <p className="eyebrow"><span>Nutri / Barre Digital</span></p>
        <h2><span className="title-line title-line--primary">Organizar también</span><span className="title-line title-line--secondary">es parte de <em>cuidar.</em></span></h2>
        <p>Una práctica más clara empieza con información conectada y accesible.</p>
        <CatalogLink />
      </section>
    </div>
  );
}

function TurnosPage() {
  return (
    <div className="product-page product-page--turnos">
      <section className="product-hero product-hero--turnos section-wrap" aria-labelledby="product-title">
        <div className="product-hero-copy">
          <p className="eyebrow"><span>Producto / Gestión del tiempo</span></p>
          <h1 id="product-title"><span className="title-line title-line--primary">Una plataforma.</span><span className="title-line title-line--secondary"><em>Múltiples formas</em></span><span className="title-line title-line--primary">de organizar el tiempo.</span></h1>
          <p className="product-lead">Turnos está concebido para adaptar servicios, personas, recursos y disponibilidad a organizaciones con necesidades diferentes.</p>
          <CatalogLink />
        </div>
        <div className="product-visual product-visual--turnos" aria-hidden="true">
          <div className="product-visual-grid" />
          <div className="turnos-dial"><span>TIEMPO</span><b>↗</b><i /></div>
          <span className="turnos-node turnos-node--one">PERSONAS</span>
          <span className="turnos-node turnos-node--two">SERVICIOS</span>
          <span className="turnos-node turnos-node--three">ESPACIOS</span>
          <span className="visual-caption visual-caption--bottom">UNA BASE / DISTINTOS CONTEXTOS</span>
        </div>
        <div className="product-hero-index"><span>BARRE DIGITAL / 02</span><span>El tiempo toma distintas formas.</span></div>
      </section>

      <section className="turnos-sectors" aria-labelledby="turnos-sectors-title">
        <div className="section-wrap">
          <div className="product-section-heading">
            <div><p className="eyebrow"><span>01</span> / Muchos contextos</p><h2 id="turnos-sectors-title"><span className="title-line title-line--primary">Distintas actividades.</span><span className="title-line title-line--secondary"><em className="editorial-italic">Una base flexible.</em></span></h2></div>
            <p>Turnos se piensa para organizaciones que coordinan servicios, personas, recursos o espacios en rubros diversos.</p>
          </div>
          <div className="sector-grid">
            {sectors.map((sector) => (
              <article className="sector-card" key={sector.number}>
                <div className="sector-card-top"><span>{sector.number}</span><span aria-hidden="true">{sector.symbol}</span></div>
                <h3>{sector.title}</h3>
                <p>{sector.examples}</p>
              </article>
            ))}
          </div>
          <p className="product-footnote">Estos rubros representan el alcance multipropósito contemplado para la plataforma; no implican que cada especialización esté implementada.</p>
        </div>
      </section>

      <section className="turnos-core section-wrap" aria-labelledby="turnos-core-title">
        <div className="product-section-heading">
          <div><p className="eyebrow"><span>02</span> / Núcleo compartido</p><h2 id="turnos-core-title"><span className="title-line title-line--primary">Lo esencial para</span><span className="title-line title-line--secondary"><em>coordinar cada día.</em></span></h2></div>
          <p>El incremento actual establece herramientas de organización y consulta de disponibilidad para equipos y negocios.</p>
        </div>
        <div className="turnos-core-grid">
          {turnosCore.map((feature, index) => (
            <article className="turnos-core-card" key={feature.title}>
              <span className="core-index">0{index + 1} / BASE</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
        <div className="reservation-note">
          <span aria-hidden="true">↗</span>
          <p>El modelo contempla reservas y estas pueden consultarse en el historial del cliente. El flujo para crear y administrar reservas todavía no está disponible en la aplicación.</p>
        </div>
      </section>

      <section className="turnos-options" aria-labelledby="turnos-options-title">
        <div className="section-wrap">
          <div className="product-section-heading">
            <div><p className="eyebrow"><span>03</span> / Especialización gradual</p><h2 id="turnos-options-title"><span className="title-line title-line--primary">Cada rubro necesita</span><span className="title-line title-line--secondary"><em>sus propias herramientas.</em></span></h2></div>
            <p>La plataforma contempla capacidades que podrían incorporarse según la actividad y las necesidades de cada organización.</p>
          </div>
          <div className="turnos-options-grid">
            <article className="option-panel">
              <p className="eyebrow"><span>Transversales / previstas</span></p>
              <h3>Capacidades configurables</h3>
              <p>Opciones que pueden acompañar distintos flujos de trabajo.</p>
              <ul className="option-chip-list">{transversalIdeas.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="option-panel option-panel--specialized">
              <p className="eyebrow"><span>Por actividad / proyectadas</span></p>
              <h3>Módulos especializados</h3>
              <p>Herramientas propias de cada sector, separadas del núcleo de agenda y disponibilidad.</p>
              <ul className="specialized-list">
                {specializedIdeas.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.text}</span></li>)}
              </ul>
              <p className="clinical-separation">La historia clínica corresponde a un módulo especializado de salud, independiente del núcleo general de Turnos.</p>
            </article>
          </div>
          <p className="product-footnote">Las capacidades y módulos de esta sección son proyecciones de producto; no se presentan como funciones terminadas.</p>
        </div>
      </section>

      <section className="product-close section-wrap">
        <p className="eyebrow"><span>Turnos / Barre Digital</span></p>
        <h2><span className="title-line title-line--primary">Una base flexible</span><span className="title-line title-line--secondary">para organizar <em>más.</em></span></h2>
        <p>Turnos aspira a coordinar actividades, servicios, personas, recursos y espacios desde una estructura adaptable.</p>
        <CatalogLink />
      </section>
    </div>
  );
}

function NewProductIllustration({ productId }: { productId: NewProductId }) {
  if (productId === "clubes-torneos") {
    return (
      <svg viewBox="0 0 120 120" focusable="false">
        <path d="M35 26h50l-6 31c-2 10-10 17-19 17S43 67 41 57l-6-31Z" />
        <path d="M35 34H23v8c0 13 8 20 22 20m40-28h12v8c0 13-8 20-22 20M60 75v15m-17 5h34M50 90h20" />
        <path className="product-illustration-accent" d="m60 36 4 8 9 1-6.5 6.5 1.5 9.5-8.5-4.5-8.5 4.5 1.5-9.5L46 45l9-1 5-8Z" />
      </svg>
    );
  }

  if (productId === "automotores") {
    return (
      <svg viewBox="0 0 120 120" focusable="false">
        <path d="m20 66 8-24c2-6 6-9 12-9h40c6 0 10 3 12 9l8 24v19H20V66Z" />
        <path className="product-illustration-accent" d="m32 60 6-18h43l7 18H32Z" />
        <path d="M20 66h80m-67 19v8m54-8v8" />
        <circle cx="37" cy="73" r="4" />
        <circle cx="83" cy="73" r="4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <path d="M34 18h38l16 16v68H34V18Z" />
      <path d="M72 18v18h16M46 53h30m-30 13h30m-30 13h17" />
      <path className="product-illustration-accent" d="M46 39h12" />
    </svg>
  );
}

function NewProductPage({ productId }: { productId: NewProductId }) {
  const productPage = newProductPages[productId];

  return (
    <div className={`product-page product-page--${productId}`}>
      <section className="product-hero section-wrap" aria-labelledby="product-title">
        <div className="product-hero-copy">
          <p className="eyebrow"><span>{productPage.eyebrow}</span></p>
          <h1 id="product-title" aria-label={productPage.title}>
            <span className="title-line title-line--primary">{productPage.titleLines[0]}</span>
            <span className="title-line title-line--secondary">{productPage.titleLines[1]}</span>
          </h1>
          <p className="product-lead">{productPage.concept}</p>
          <CatalogLink />
        </div>
        <div className={`product-visual product-visual--${productId}`} aria-hidden="true">
          <div className="product-visual-grid" />
          <div className="product-illustration">
            <NewProductIllustration productId={productId} />
          </div>
          <span className="visual-caption visual-caption--top">BARRE DIGITAL / PRODUCTO</span>
          <span className="visual-caption visual-caption--bottom">{productPage.caption}</span>
        </div>
        <div className="product-hero-index"><span>BARRE DIGITAL / PRODUCTO</span><span>{productPage.title}</span></div>
      </section>

      <section className="product-features section-wrap" aria-labelledby="product-areas-title">
        <div className="product-section-heading">
          <div>
            <p className="eyebrow"><span>01</span> / Alcance funcional</p>
            <h2 id="product-areas-title">
              <span className="title-line title-line--primary">Una mirada</span>
              <span className="title-line title-line--secondary"><em>integral.</em></span>
            </h2>
          </div>
          <p>Áreas que organizan la propuesta funcional de {productPage.title}.</p>
        </div>
        <div className="product-feature-grid">
          {productPage.areas.map((area, index) => (
            <article className="product-feature-card" key={area.title}>
              <div className="feature-card-top"><span>0{index + 1}</span><span aria-hidden="true">{area.symbol}</span></div>
              <h3>{area.title}</h3>
              {area.description ? <p>{area.description}</p> : null}
              <ul>
                {area.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="product-footnote">Estas áreas expresan el alcance funcional propuesto para el producto.</p>
      </section>

      <section className="product-close section-wrap">
        <p className="eyebrow"><span>{productPage.title} / Barre Digital</span></p>
        <h2>
          <span className="title-line title-line--primary">Una propuesta para</span>
          <span className="title-line title-line--secondary">{productPage.title}.</span>
        </h2>
        <p>{productPage.concept}</p>
        <CatalogLink />
      </section>
    </div>
  );
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductByDetailSlug(slug);

  if (!product) notFound();

  const productPage = product.id === "nutri"
    ? <NutriPage />
    : product.id === "agenda-turnos"
      ? <TurnosPage />
      : <NewProductPage productId={product.id} />;

  return (
    <ProductPageChrome>
      {productPage}
    </ProductPageChrome>
  );
}
