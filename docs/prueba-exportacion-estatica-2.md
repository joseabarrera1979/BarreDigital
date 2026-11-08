# Segunda prueba controlada de exportación estática

## Alcance

Se realizó una prueba temporal en `C:\Proyectos\Portfolio` con Next.js 16.4.3. No se instalaron dependencias, no se modificaron manifiestos o archivos fuente de la aplicación y no se configuró ni publicó nada en Cloudflare.

## Configuración original

`next.config.ts` contenía:

- `cacheComponents: true`
- `partialPrefetching: true`
- Reglas de Turbopack existentes para CSS.
- No tenía la opción `output`.

`next-env.d.ts` contenía las referencias de tipos de Next.js y las rutas generadas. Antes de la prueba se registraron estos SHA-256:

| Archivo | SHA-256 original |
| --- | --- |
| `next.config.ts` | `17145A9822EC351B92B8A5F8D3A709A531C8690ED92D397A4405AE084EA9ACC7` |
| `next-env.d.ts` | `1862AC4BBBC5192D4BF562161DF66EA547ED3E67173100656AB606AE9797DB2B` |

El `out` previo existía por la primera prueba. Se copiaron íntegramente sus 12 archivos a una carpeta temporal fuera del proyecto y se compararon rutas relativas, tamaños y SHA-256 antes de proceder.

## Cambios temporales

Para esta prueba, `next.config.ts` se cambió únicamente para:

- Establecer `cacheComponents: false`.
- Quitar temporalmente `partialPrefetching`.
- Agregar `output: "export"`.

Se conservaron las reglas de Turbopack. No se cambiaron otros archivos de configuración o código fuente.

## Resultado de `npm run build`

La compilación terminó correctamente con **código de salida 0**. Next.js compiló con Turbopack, completó TypeScript, generó las páginas y finalizó la optimización. No se reportaron advertencias ni errores.

Rutas informadas por Next.js:

| Ruta | Resultado |
| --- | --- |
| `/` | Estática |
| `/_not-found` | Estática |
| `/productos/nutri` | SSG, generada con `generateStaticParams` |

## Inspección del resultado exportado

La exportación temporal contenía:

- `index.html` para `/`.
- `404.html` y `_not-found.html` para el estado 404.
- `productos/nutri.html` para `/productos/nutri`.
- Chunks JavaScript y un archivo CSS bajo `_next/static/`.
- Manifiestos y archivos `.txt` de segmentos generados por Next.js.

Se encontraron 28 archivos en total. Se comprobaron las referencias `/_next/` de los tres HTML principales; todos los recursos CSS y JavaScript referenciados existían en la exportación. No se encontraron imágenes o fuentes independientes, consistente con el uso actual de CSS/HTML para la composición visual. Esta inspección fue estática: no se realizó navegación visual en navegador.

El resultado de esta segunda prueba se conservó fuera del proyecto para poder restaurar el `out` que existía antes de la prueba.

## Comparación con la primera prueba

La primera prueba usó `output: "export"` manteniendo activado el prerenderizado parcial. Compiló las páginas, pero falló al finalizar con `Invariant: PPR cannot be enabled in export mode`; dejó un `out` incompleto con chunks, pero sin HTML de rutas.

En esta segunda prueba se desactivó `cacheComponents`, se retiró `partialPrefetching` y se activó exportación. La compilación terminó correctamente y generó HTML para la portada, el 404 y el detalle Nutri. Esto demuestra viabilidad técnica de exportación estática **con la configuración temporal probada**.

## Restauración e integridad

Después de la compilación se restauraron `next.config.ts` y `next-env.d.ts` desde sus copias exactas. Los hashes posteriores coincidieron con los valores originales indicados arriba; la configuración final conserva `cacheComponents: true` y `partialPrefetching: true`, y no contiene `output: "export"`.

El `out` anterior se devolvió al proyecto. La comparación de sus 12 archivos con la copia de seguridad confirmó coincidencia de rutas, tamaños y hashes. El resultado exitoso de esta prueba quedó conservado aparte, fuera del proyecto.

## Limitaciones y conclusión

La prueba confirma que las rutas actuales pueden generarse como HTML estático cuando se desactivan temporalmente Cache Components y Partial Prefetching. No confirma que la configuración original pueda exportarse, ni que el sitio esté listo para publicación. Tampoco verifica la respuesta de Cloudflare Pages, navegación en producción, dominio, cabeceras o comportamiento visual en navegador.

La exportación estática es **técnicamente viable con la configuración temporal probada**. Para preparar una publicación habría que decidir si mantener permanentemente desactivadas esas opciones y realizar una validación posterior del artefacto y del flujo de Pages. No se hicieron esos cambios permanentes.
