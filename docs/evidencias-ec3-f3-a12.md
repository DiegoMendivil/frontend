# Evidencias EC3 F3 A12

## Entorno
- Rama: `ec3-a12-pruebas-despliegue`
- React: 19
- Vite: 8
- React Router: 7.18.4
- Backend local: `http://localhost:3000`

## Validaciones ejecutadas

| Caso | Resultado |
|---|---|
| `pnpm lint` | Correcto |
| `pnpm test` | Correcto |
| `pnpm build` | Correcto |
| `pnpm verify` | Correcto |

## Cobertura de pruebas
- Validación de título de tarea: 4 pruebas
- Gestión de sesión: 3 pruebas
- Redirección de rutas protegidas y públicas: 2 pruebas
- Total: 9 pruebas Vitest

## Seguridad
- No se almacenan secretos ni tokens completos en el repositorio.
- El token de sesión se guarda en `sessionStorage` únicamente para entorno didáctico.
- La configuración de despliegue usa `VITE_API_URL=/api` y no expone credenciales.

## Despliegue en Render
- Se prepara un archivo `render.yaml` con publicación de `dist`.
- La aplicación usa un servicio de frontend independiente del backend.
- Requiere la variable `VITE_API_URL` y un backend disponible en la ruta configurada.
