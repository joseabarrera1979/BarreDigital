# 0001 — Arquitectura inicial

- **Estado:** Aceptada
- **Contexto:** Barre Digital necesita una presencia web inicial que explique su propuesta y permita crecer sin presentar como existentes productos o servicios aún no implementados.

## Decisión

Usar Next.js App Router y React para el sitio. Mantener la página de inicio en `src/app/page.tsx`, el layout raíz y sus metadatos en `src/app/layout.tsx`, y los estilos globales en `src/app/globals.css`. Reservar `src/modules/` para módulos de producto cuando el alcance esté definido. Documentar arquitectura y decisiones bajo `docs/`.

La primera interfaz presenta Nutri, identifica la Agenda de turnos como futura y muestra las áreas administrativas como planificación. El texto y la estructura deben distinguir claramente estos estados.

## Consecuencias

- La entrega inicial es una experiencia de presentación, adaptable a móvil y escritorio.
- No se introduce una capa de datos ni servicios para una página que aún no los necesita.
- Las decisiones sobre módulos funcionales se toman cuando se definan requisitos concretos.
- Cualquier evolución debe mantener una descripción veraz del estado de cada producto.
