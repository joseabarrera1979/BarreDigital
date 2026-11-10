# Rediseño de la portada de Barre Digital

**Fecha:** 9 de noviembre de 2026
**Alcance:** página principal (`/`)

## Resumen

Se reorganizó la portada con una identidad editorial oscura, acentos naranja eléctrico, una sección clara para dar ritmo y composiciones construidas con CSS. La página presenta la propuesta de Barre Digital, los productos registrados en el catálogo, una síntesis del proceso y un cierre institucional.

## Archivos modificados

- `src/app/page.tsx`: estructura de portada, navegación, hero, productos, propuesta de valor, cierre y footer.
- `src/app/globals.css`: sistema visual, composición responsive, estados de foco y movimiento reducido.
- `docs/rediseño-portada.md`: este informe.

No se modificaron otras rutas, la configuración de Next.js, las dependencias ni la infraestructura.

## Componentes y contenido

- Se reutiliza `products` y `getProductStatusLabel` desde `src/modules/products/catalog.ts`.
- Nutri conserva su enlace de detalle existente (`/productos/nutri`) y su estado definido por el catálogo.
- Agenda de turnos se muestra como iniciativa planificada, sin enlace a una ruta inexistente.
- El bloque de contacto usa un mensaje institucional y un ancla local; no inventa datos de contacto ni incorpora formulario.
- La propuesta y los pasos de trabajo se basan en el contenido vigente del proyecto: comprender necesidades, diseñar con cuidado, desarrollar software y permitir que los productos evolucionen.
- Los elementos geométricos e íconos se construyen con CSS, sin agregar recursos ni dependencias.

## Decisiones visuales

- Fondo carbón y superficies oscuras en el encabezado, hero, productos y footer.
- Naranja eléctrico para la marca, énfasis tipográfico, estados y acciones.
- Sección clara para explicar el enfoque y el proceso de trabajo.
- Presentación editorial de productos mediante jerarquía, numeración e ilustraciones CSS; los estados diferencian Nutri de Agenda de turnos.
- Animaciones limitadas al motivo gráfico del hero y a microinteracciones de enlaces.

## Responsive y accesibilidad

- En escritorio, la navegación es horizontal y el hero combina texto con una composición gráfica.
- En móvil, se usa un menú nativo `<details>/<summary>` operable por teclado; las columnas pasan a una secuencia vertical y se ajustan productos, proceso y footer.
- Se usan encabezados, regiones, listas y enlaces semánticos, nombres accesibles para marca y navegación, foco visible y elementos decorativos ocultos a tecnologías de asistencia.
- `prefers-reduced-motion` reduce las animaciones y transiciones; el desplazamiento suave también se desactiva.
- Los estilos incluyen cortes para 900 px, 640 px y 360 px. No se realizó una revisión visual en navegador ni una auditoría automatizada de contraste.

## Verificaciones

- Guía local de Next.js 16 consultada antes de implementar: App Router, CSS global, navegación, accesibilidad y exportación estática.
- `npm run lint`: correcto, código de salida 0.
- `npm run build`: correcto, código de salida 0. Next.js 16.4.3 completó compilación, validación TypeScript y generación estática.
- Rutas reportadas por Next.js: `/`, `/_not-found` y `/productos/nutri` (SSG).
- Se confirmó la existencia de `out/index.html` y `out/productos/nutri.html`.
- No se inició un servidor local ni se realizaron cambios de configuración o despliegue.

## Limitaciones conocidas

- El proyecto no registra un canal de contacto. El cierre es institucional y no ofrece envío de mensajes hasta que se proporcione un medio real.
- El catálogo actual etiqueta Nutri como «En desarrollo»; ese estado se conserva, aunque se presenta como producto del catálogo.
- La revisión responsive se hizo por estructura y reglas CSS; queda pendiente comprobar visualmente la portada en navegadores y dispositivos reales.
