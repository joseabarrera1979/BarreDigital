# Arquitectura inicial

## Propósito

Barre Digital presenta y desarrolla soluciones digitales. La primera versión del sitio comunica la propuesta, las aplicaciones conocidas y la planificación de una futura plataforma administrativa. La comunicación distingue el producto Nutri de la futura Agenda de turnos y de las áreas que todavía están en definición.

## Aplicación web

El sitio usa Next.js 16.4.3 con App Router y React. `src/app/layout.tsx` contiene el layout raíz, metadatos y configuración del idioma; `src/app/page.tsx` compone la página de inicio y `src/app/globals.css` contiene los estilos globales y reglas adaptables. La página es un componente de servidor y no requiere estado interactivo del navegador en esta etapa.

`src/modules/` queda reservado para organizar lógica de producto cuando existan módulos concretos. La carpeta no implica que hoy haya funciones de administración o servicios de producto implementados.

## Límites de esta etapa

La implementación es una presentación estática. No contiene autenticación, pagos, licenciamiento funcional, base de datos, API, descargas, integraciones externas ni servicios de administración. Las áreas de clientes, productos, licencias, activaciones, versiones e instaladores son conceptos en planificación. Agenda de turnos es una aplicación futura, no una aplicación anunciada como desarrollada.

## Entornos y flujo

El desarrollo local sirve para editar y revisar la interfaz. Las comprobaciones de calidad (`npm run lint` y `npm run build`) se ejecutan antes de considerar el paso a publicación. La publicación es futura y requiere una decisión posterior sobre su proceso e infraestructura. La separación se detalla en [0002 — Entornos](../decisions/0002-environments.md).
