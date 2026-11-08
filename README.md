# Barre Digital

Sitio inicial de Barre Digital, un desarrollador de soluciones digitales. Esta primera entrega presenta la identidad, la aplicación Nutri, una futura Agenda de turnos y una visión de áreas administrativas que aún están en planificación.

## Desarrollo local

Requisitos: Node.js y npm instalados. Instala las dependencias existentes con `npm install` y ejecuta `npm run dev` para iniciar el entorno local. Abre `http://localhost:3000` en el navegador. `npm run lint` revisa el código y `npm run build` genera una compilación de producción para validar el proyecto.

El trabajo local es el espacio de edición y exploración. Las pruebas de calidad se ejecutan de forma separada antes de considerar una publicación. La publicación futura es una etapa por definir; este repositorio no configura hosting ni despliegues.

## Estructura inicial

- `src/app/`: página de inicio, layout raíz y estilos globales de Next.js App Router.
- `src/modules/`: espacio reservado para futuros módulos de producto, aún sin implementaciones.
- `docs/architecture/`: descripción de la arquitectura inicial.
- `docs/decisions/`: decisiones de arquitectura y proceso.

Consulta [la visión de arquitectura](docs/architecture/overview.md) y las decisiones [de arquitectura inicial](docs/decisions/0001-initial-architecture.md) y [de entornos](docs/decisions/0002-environments.md).

## Estado del producto

Nutri se presenta como aplicación de Barre Digital. La Agenda de turnos es una iniciativa futura. Clientes, productos, licencias, activaciones, versiones e instaladores son áreas contempladas para una futura plataforma de administración; no se anuncian como funcionalidades disponibles o implementadas.
