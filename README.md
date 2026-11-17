# Administrador de tareas Frontend

SPA desarrollada con React, TypeScript, Vite, React Router y Fetch API. Las tareas y las identidades se administran mediante la API REST del proyecto Backend.

## Funciones

- Registro e inicio de sesión.
- Restauración de identidad mediante `/api/auth/me`.
- Rutas públicas y privadas con redirección a la ruta solicitada.
- CRUD remoto de tareas con encabezado Bearer.
- Búsqueda, filtro, ordenamiento y paginación del servidor.
- Detalle remoto por identificador.
- Eliminación visible solo para el rol `admin`; el Backend valida el permiso real.
- Estados de carga, vacío, error y reintento.

## Rutas

- `/`: inicio.
- `/login`: inicio de sesión.
- `/register`: registro.
- `/tasks`: administración protegida.
- `/tasks/:taskId`: detalle protegido.
- `*`: página 404.

## Requisitos

- Node.js y PNPM.
- Backend de tareas en `http://localhost:3000`, con MongoDB configurado.

## Configuración y ejecución local

1. Copia `.env.example` como `.env.local` y deja `VITE_API_URL=/api`.
2. Inicia el Backend desde su proyecto con `pnpm dev` y mantén esa terminal abierta.
3. En este proyecto ejecuta `pnpm install` y `pnpm dev`.
4. Abre la dirección que indique Vite.

El proxy de desarrollo envía `/api` y `/health` a `http://localhost:3000`. Reinicia Vite si cambias la configuración. No guardes credenciales ni URI de MongoDB en el Frontend.

## Validación y despliegue

```bash
pnpm lint
pnpm test
pnpm build
pnpm verify
```

## Pruebas

El proyecto incluye pruebas con Vitest y React Testing Library para validar el comportamiento de validación de formularios, gestión de sesión y redirecciones de rutas públicas y privadas.

## Render

Para desplegar la aplicación en Render como sitio estático:

1. Crea un nuevo servicio Web o Static Site en Render.
2. Conecta este repositorio.
3. Usa el comando de construcción: `pnpm install && pnpm build`.
4. Define la carpeta de publicación: `dist`.
5. Añade la variable `VITE_API_URL=/api` para que el sitio funcione con el proxy del backend o con la URL del servicio desplegado.

Se recomienda mantener el backend en un servicio separado y no exponer secretos ni tokens en el repositorio.

## Sesión y seguridad

El Frontend conserva únicamente el access token en `sessionStorage` durante la pestaña y recupera el usuario con `/auth/me`. El cierre de sesión elimina el token local, pero no revoca el JWT en el Backend. El token es accesible para JavaScript; este almacenamiento es didáctico y no sustituye una estrategia de producción con cookies HttpOnly/BFF. Nunca copies tokens, contraseñas ni secretos a Git, capturas o documentación.
