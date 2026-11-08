# Auditoría de Cache Components y PPR

**Proyecto:** Barre Digital, `C:\Proyectos\Portfolio`  
**Alcance:** inspección de solo lectura. No se ejecutó build ni se modificó la configuración durante esta auditoría.

## Resumen ejecutivo

El proyecto habilita globalmente `cacheComponents` y `partialPrefetching`, pero el código actual no usa directivas ni APIs específicas de Cache Components y no tiene contenido dinámico que requiera PPR. Sus páginas obtienen los datos de un catálogo local. En una segunda prueba temporal anterior, `npm run build` terminó con éxito y exportó `/`, `/productos/nutri` y el 404 al usar `cacheComponents: false`, sin `partialPrefetching` y con `output: "export"`.

**Respuesta:** sí; con la evidencia disponible, se pueden desactivar permanentemente Cache Components/PPR y usar exportación estática sin perder funcionalidades que Barre Digital utiliza actualmente. Se perderían capacidades del framework no utilizadas por este sitio y cambiaría la estrategia de prefetch. La conclusión no equivale a que la configuración ya esté modificada ni a que el sitio esté listo para publicar.

## 1. Configuración actual comprobada

`next.config.ts` conserva:

```ts
cacheComponents: true,
partialPrefetching: true,
```

No contiene `output: "export"`. También define una regla de Turbopack para CSS. `package.json` y `package-lock.json` fijan Next.js `16.4.3`, React y React DOM `19.3.0`; el gestor es npm. TypeScript está en la rama `^5`, con configuración estricta, `noEmit`, resolución `bundler` y alias `@/*` hacia `src/*`. Tailwind CSS 4 se importa desde `src/app/globals.css`, con loader de Turbopack en la configuración. Scripts: `dev` (puerto 3000), `build`, `start` y `lint`.

En Next.js 16, `cacheComponents` agrupa capacidades de Cache Components y PPR; `partialPrefetching` opta por prefetch de las partes estáticas de rutas y requiere `cacheComponents: true`. La documentación local incluida con Next.js 16.4.3 describe que, al omitir `partialPrefetching`, queda el comportamiento previo de prefetch. [Referencia de Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents), [referencia de Partial Prefetching](https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching), [guía de actualización a Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16).

## 2. Búsqueda de funcionalidades

La inspección abarcó los archivos de `src/`, configuración y manifiestos:

| Funcionalidad | Hallazgo | Efecto en este proyecto |
| --- | --- | --- |
| `"use cache"`, `"use cache: private"`, `"use cache: remote"` | No encontrado | No hay componentes, funciones o datos que usen estas capacidades. |
| `cacheLife`, `cacheTag` | No encontrados | No hay política de caché explícita ni invalidación por tags. |
| `connection()` | No encontrada | No se fuerza renderizado en tiempo de petición. |
| `Suspense` | No encontrado | No hay límites de streaming ni fallbacks asociados a PPR. |
| `loading.tsx` | No existe bajo `src/app/` | No hay estados de carga de ruta. |
| APIs dinámicas (`cookies`, `headers`, `draftMode`, `noStore`) | No encontradas | Las páginas no dependen de la solicitud, cookies ni sesión. |
| `fetch`, Server Actions, API/Route Handlers, middleware/proxy | No encontrados | No hay lógica de servidor que necesite un runtime al atender solicitudes. |
| `generateStaticParams` | Presente en la ruta de producto | Enumera localmente slugs de productos con página de detalle; permite generar esos detalles en build. |
| Componentes cliente / hooks | No encontrados en el código de aplicación revisado | No hay estado interactivo cliente dependiente de Cache Components. |

El flag activo sí habilita capacidades del framework aunque el código no invoque sus APIs. Además, el build anterior con la configuración original clasificó rutas con prerenderizado parcial. Eso demuestra que PPR estaba habilitado como modo del framework, no que hubiese una región dinámica concreta usada por la aplicación: no se encontraron `Suspense`, APIs de solicitud ni datos de runtime que creen tal región.

## 3. Análisis de rutas

| Ruta | Generación estática | Dependencia dinámica | Uso efectivo de Cache Components/PPR | Cambios / riesgos para Pages estático |
| --- | --- | --- | --- | --- |
| `/` | Sí. Renderiza catálogo y contenido local. | Ninguna en tiempo de solicitud. | No usa APIs de Cache Components ni límites PPR. El flag global habilita el modo, pero la página se puede prerenderizar completa. | No requiere cambio de contenido. La prueba temporal exportó `index.html`. |
| `/productos/[slug]` | Sí para los slugs devueltos por `generateStaticParams()`. Hoy el catálogo incluye el detalle `nutri`. | `params` es una entrada del segmento dinámico, pero se conoce en build para los slugs enumerados. Metadatos y cuerpo se calculan con el catálogo local. | No usa caché explícita, datos remotos ni Suspense. El componente es `async` para leer la promesa `params`, no para solicitar datos de runtime. | Requiere seguir generando todos los slugs publicables en build. Slugs no generados no pueden renderizarse bajo demanda en un sitio estático; el hosting debe servir un 404. La prueba generó `productos/nutri.html`. |
| `/_not-found` / 404 | Sí; Next.js generó `404.html` en la prueba de exportación. No hay `not-found.tsx` propio. | Ninguna. | Sin uso de APIs dinámicas o caché explícita. | El archivo 404 existe en el artefacto probado. El comportamiento exacto de rutas desconocidas debe confirmarse con el hosting/configuración de Pages. |

Next.js static export requiere que las rutas dinámicas tengan parámetros generados y no soporta funciones que necesiten un servidor, como API dinámica, Proxy, cookies, Server Actions, ISR o la optimización de imágenes por defecto. El código inspeccionado no muestra esas funciones. [Guía de exportaciones estáticas de Next.js](https://nextjs.org/docs/app/guides/static-exports).

## 4. Impacto real de desactivar Cache Components y PPR

### Capacidades habilitadas pero no utilizadas

No se utilizan las directivas `use cache`, las funciones `cacheLife`/`cacheTag`, `connection()`, renderizado de datos dinámicos, límites Suspense para streaming ni App Shells. Desactivarlas no elimina una funcionalidad visible o de datos que el sitio implemente hoy.

### Cambio de navegación

`partialPrefetching: true` cambia cómo Next.js prefetches las rutas: obtiene partes estáticas reutilizables como App Shell y puede diferir partes dependientes de URL/datos. Sin esa opción, el framework vuelve al comportamiento anterior. El sitio usa `<Link>` para navegar al detalle Nutri y de vuelta a la portada, así que la estrategia de prefetch puede cambiar; la ruta y el enlace siguen presentes. Los enlaces internos de sección de la portada son anchors HTML y no dependen de prefetch de Next.js.

No se midieron métricas comparativas de velocidad o solicitudes. El efecto de rendimiento no está cuantificado; no hay evidencia de que la experiencia requiera el App Shell parcial.

### Limitaciones inherentes a exportación estática

El sitio deja de tener un servidor Next.js en tiempo de solicitud. Las páginas y los datos cambian mediante una nueva compilación/publicación. No se podrían añadir sin cambiar arquitectura formularios server-side, APIs dinámicas, autenticación basada en request, Server Actions o datos frescos de servidor y mantener solo esta exportación estática. Son limitaciones futuras de la modalidad, no defectos comprobados del proyecto actual.

## 5. Comparación de alternativas

| Criterio | A. Mantener Cache Components con runtime | B. Desactivar Cache Components y exportar estático |
| --- | --- | --- |
| Compatibilidad funcional actual | Puede servir la app Next.js con sus capacidades, aunque la app no usa hoy las funciones dinámicas. | Probada en build temporal: generó las tres salidas esperadas. |
| Complejidad | Requiere adaptador/runtime de Cloudflare y validar compatibilidad y operación del servidor. Cloudflare documenta Workers con integración Next.js para apps full-stack. | Menor: build estático y publicación de archivos. Pages documenta el preset Next.js Static HTML Export, con `npx next build` y salida `out`. |
| Mantenimiento | Más piezas y atención a compatibilidad del adaptador/runtime. | Menos infraestructura; el contenido publicado se actualiza reconstruyendo. |
| Adecuación al sitio actual | Es válido si se anticipa pronto SSR, APIs o funcionalidades dinámicas. | Ajuste directo a la web institucional actual, que es local y prerenderizable. |
| Recomendación | Conservar como alternativa de evolución si los requisitos pasan a full-stack. | Preferida para la primera publicación, condicionada a adoptar de forma explícita la configuración probada y validar Pages. |

Cloudflare documenta exportaciones estáticas de Next.js en Pages y distingue ese caso de Next.js full-stack en Workers. Su documentación actual recomienda vinext en Workers para nuevas aplicaciones full-stack; OpenNext se documenta como ruta para aplicaciones existentes que necesitan runtime. [Cloudflare Pages: Next.js estático](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Cloudflare: Next.js en Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/).

## 6. Riesgos y cuestiones pendientes

- La prueba anterior fue una compilación local; no fue despliegue ni prueba de navegación en Cloudflare Pages.
- El resultado de la prueba estática exitosa se conservó fuera del proyecto y no es la configuración activa. La configuración del proyecto sigue con `cacheComponents: true` y `partialPrefetching: true`, sin `output: "export"`.
- Al crecer el catálogo, `generateStaticParams()` debe seguir proporcionando todos los productos con página de detalle. El comportamiento de slugs desconocidos depende del 404 estático y del servidor de archivos.
- No se probaron previews, dominio, reglas de headers/redirects, rutas con trailing slash, caché del CDN ni despliegues desde Git.
- Si se agregan APIs, autenticación, contenido dependiente de cookies, Server Actions o personalización por usuario, habrá que revisar la decisión arquitectónica.

## 7. Recomendación

Para el alcance actual, se recomienda la alternativa B: exportación estática en Pages. La evidencia muestra que no se sacrifica ninguna capacidad utilizada por la app y que la build de exportación funcionó con Cache Components desactivado y Partial Prefetching omitido. La recomendación es adoptar esa configuración solo después de autorización y mantener una nueva compilación/inspección reproducible como validación previa.

**Conclusión:** sí, podemos desactivar Cache Components permanentemente y adoptar exportación estática sin perder funcionalidades que Barre Digital utiliza actualmente. La respuesta se limita al código y rutas inspeccionados; no declara el sitio listo para despliegue ni descarta requisitos dinámicos futuros.
