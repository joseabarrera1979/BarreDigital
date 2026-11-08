# Configuración de exportación estática

**Proyecto:** Barre Digital (`C:\Proyectos\Portfolio`)  
**Fecha de validación:** 8 de noviembre de 2026

## Configuración definitiva adoptada

`next.config.ts` ahora establece:

```ts
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};
```

Se mantuvo intacta la configuración de Turbopack existente. `partialPrefetching` se eliminó porque requiere `cacheComponents: true`; el prerenderizado parcial (PPR) queda desactivado al desactivar Cache Components.

## Motivos técnicos

La prueba temporal anterior demostró que Next.js 16.4.3 exporta las rutas actuales cuando Cache Components está desactivado y `partialPrefetching` no está presente. La auditoría de código no encontró uso de directivas `use cache`, `cacheLife`, `cacheTag`, `connection()`, `Suspense`, datos dinámicos de servidor, Server Actions o APIs que dependan de un runtime al recibir solicitudes. El catálogo de productos usado para generar páginas es local.

La prueba con la configuración original y `output: "export"` falló al finalizar con `Invariant: PPR cannot be enabled in export mode`. Con la configuración adoptada, el build de exportación finalizó correctamente. La decisión evita incorporar un runtime de servidor para una web de presentación que actualmente es estática.

## Resultado de `npm run build`

**Correcto, código de salida 0.** Next.js 16.4.3 compiló con Turbopack, terminó la validación de TypeScript, generó las páginas y finalizó la optimización. No se reportaron advertencias ni errores de rutas durante la compilación.

Next.js reportó:

| Ruta | Resultado |
| --- | --- |
| `/` | Estática |
| `/_not-found` | Estática |
| `/productos/nutri` | SSG, generada con `generateStaticParams()` |

## Archivos exportados y recursos

En `out/` se verificó la presencia de:

- `index.html` para la portada.
- `404.html` y `_not-found.html` para la página no encontrada.
- `productos/nutri.html` para el detalle de Nutri.
- Chunks JavaScript, CSS y manifiestos de Next.js bajo `_next/static/`.

La exportación contiene 28 archivos: 11 archivos JavaScript, un CSS y los HTML/manifiestos de las rutas. Se comprobaron las referencias locales `/_next/` de la portada, 404 y detalle de Nutri; no hubo referencias faltantes. No hay imágenes o fuentes externas independientes en el contenido actual. Esta fue una inspección de archivos, no una prueba de navegación visual en navegador.

Las rutas corresponden a las páginas del código: la portada y la ruta dinámica de productos. `generateStaticParams()` proporciona `nutri`, que se exporta como HTML. Los slugs nuevos deberán incluirse en esa generación durante el build.

## Archivos modificados y generados

- **Modificado intencionalmente:** `next.config.ts`, con tres cambios semánticos: `cacheComponents` pasó a `false`, se quitó `partialPrefetching` y se añadió `output: "export"`. La configuración de Turbopack se conservó.
- **Creado:** este informe, `docs/configuracion-exportacion-estatica.md`.
- **Generado/actualizado por el build:** `.next/` y `out/`.
- **Sin cambios detectados por hash:** `next-env.d.ts`, `package.json`, `package-lock.json` y el resto de los archivos existentes fuera de `.next/`, `out/` y `node_modules/`.

Antes del build, `out/` contenía 12 archivos incompletos de una prueba anterior. Se copió fuera del proyecto y se verificó íntegramente por rutas, tamaños y SHA-256. El build reemplazó el contenido del `out/` activo por la exportación completa; el resultado anterior se conservó en la copia de seguridad fuera del proyecto.

El diff semántico de `next.config.ts` se limita a los tres cambios autorizados. Su hash actual es `0B0DA28376D24B171EAC2DE731E6D4603BC1717D5DA732FCC90FA913BE794368`.

## Limitaciones y tareas previas a publicar

- La salida es estática: no ejecuta un servidor Next.js en cada solicitud. Contenido nuevo requiere reconstruir y volver a publicar.
- Solo se generan los slugs enumerados por `generateStaticParams()`. Las rutas no generadas deberán responder mediante el 404 del hosting.
- No se probó la navegación visual ni se verificó el comportamiento del 404 en una implementación alojada en Cloudflare.
- No se creó un proyecto Pages, no se vinculó una cuenta ni se configuró un dominio, variables, previews o integraciones.
- La ubicación del proyecto no tiene un repositorio Git detectable. Si se elige integración Git para builds automáticos, habrá que definir y preparar el repositorio. La modalidad de carga debe decidirse durante la preparación de Cloudflare.

Cloudflare documenta para Next.js Static HTML Export el comando `npx next build` y el directorio `out`. La configuración local tiene `npm run build`, que ejecuta `next build`; en Cloudflare se deberá escoger el preset o configurar esos valores y verificar el flujo desde la raíz correcta. [Configuración oficial de build de Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/build-configuration/), [guía de exportación estática de Next.js en Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

## Conclusión

La configuración permanente de exportación estática quedó aplicada y validada localmente. La compilación generó las páginas y recursos esperados sin errores. **Esto no significa que el sitio esté publicado ni que esté listo para producción:** quedan la preparación de la integración o carga elegida, la comprobación del comportamiento alojado y cualquier decisión pendiente sobre dominio y previews.
