# 0002 — Separación de entornos

- **Estado:** Aceptada
- **Contexto:** El desarrollo de la interfaz, las comprobaciones de calidad y una publicación futura tienen propósitos y riesgos distintos.

## Decisión

1. **Desarrollo local:** `npm run dev` inicia el entorno de edición local. Se usa para construir y revisar cambios sin publicar el sitio.
2. **Pruebas:** `npm run lint` y `npm run build` sirven como comprobaciones previas. Sus resultados deben revisarse antes de considerar una publicación. En esta etapa no hay un entorno de pruebas desplegado.
3. **Publicación futura:** la publicación queda como etapa posterior, sujeta a una decisión explícita sobre hosting y proceso. Este proyecto no configura despliegues ni servicios externos.

## Consecuencias

- Los cambios se pueden desarrollar localmente y validar antes de una publicación.
- Una compilación local exitosa no implica que el sitio esté publicado.
- La infraestructura y el flujo de publicación quedan pendientes de definición.
