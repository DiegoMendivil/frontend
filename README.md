# Administrador de tareas - Frontend

Aplicación SPA desarrollada con React, TypeScript, Vite, PNPM y React Router para administrar tareas.

## Alcance actual

La aplicación administra una colección local de tareas mediante React y TypeScript. Incluye:

- Operaciones CRUD de tareas.
- Validación accesible al registrar y editar títulos.
- Búsqueda por título, filtro por estado y ordenamiento.
- Resumen general calculado con toda la colección.
- Persistencia local con `localStorage`.
- Navegación entre inicio, tareas y detalle dinámico.
- Página 404 para direcciones o tareas inexistentes.
- Diseño adaptable.

Las tareas se guardan en el almacenamiento local del navegador y se restauran al volver a abrir la aplicación. La búsqueda, filtro y orden solo afectan la vista; no se guardan ni modifican la colección principal. La integración con la API REST se realizará posteriormente.

## Tecnologías

- React
- TypeScript
- React Router 7.18.4
- Vite
- PNPM
- CSS
- Git y GitHub

## Requisitos

- Node.js
- PNPM

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
pnpm dev
```

## Validación

```bash
pnpm lint
pnpm build
```

## Estructura principal

- `src/components`: componentes visuales y reutilizables.
- `src/data`: colección local de tareas.
- `src/layouts`: estructura compartida entre páginas.
- `src/models`: tipos e interfaces.
- `src/pages`: páginas asociadas a rutas.
- `src/services`: consulta y almacenamiento de tareas.
- `src/styles`: estilos globales.
- `src/utils`: validación y utilidades.
- `docs`: preguntas y documentación de las actividades.

## Rutas

- `/`: inicio y resumen.
- `/tasks`: administración de tareas.
- `/tasks/:taskId`: detalle de una tarea.
- `*`: página para rutas inexistentes.

## Modelo `Task`

Cada tarea contiene `id`, `title`, `status`, `createdAt` y `updatedAt`. Las fechas se representan como cadenas ISO y `status` solo admite `pending` o `completed`.

## Operaciones CRUD

- Create: registrar una tarea desde el formulario.
- Read: mostrar las tareas de la colección.
- Update: cambiar el estado o editar el título.
- Delete: eliminar una tarea después de confirmar.

## Búsqueda, filtro y orden

La lista permite buscar por título, filtrar por estado y ordenar por actualización reciente, creación reciente o título. El resumen siempre cuenta todas las tareas, no solo las visibles.

## Persistencia

Las tareas se almacenan en `localStorage` bajo la clave `task-manager.tasks`. Si el contenido guardado no es válido, se inicia con los datos de respaldo.
