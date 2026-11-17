# Evidencias EC3 F3 A11

## Entorno
- Rama: `ec3-a11-autenticacion`
- React: 19
- React Router: 7.18.4
- Frontend local: completar con la dirección mostrada por Vite
- Backend local: `http://localhost:3000`

## Casos ejecutados

| Caso | HTTP esperado | Obtenido | Resultado |
|---|---:|---|---|
| Registro válido | 201 | Pendiente de prueba real | Pendiente |
| Correo duplicado | 409 | Pendiente de prueba real | Pendiente |
| Login válido | 200 | Pendiente de prueba real | Pendiente |
| `/auth/me` autenticado | 200 | Pendiente de prueba real | Pendiente |
| Listado autenticado | 200 | Pendiente de prueba real | Pendiente |
| DELETE con user | 403 | Pendiente de prueba real | Pendiente |
| DELETE con admin | 204 | Pendiente de prueba real | Pendiente |

## Rutas y sesión
- Redirección a login:
- Recuperación de la ruta solicitada:
- Restauración de sesión tras recargar:
- Cierre de sesión y botón Atrás:

## Calidad
- `pnpm lint`:
- `pnpm build`:
- Consola del navegador:

## Protección de datos
Confirma después de probar que las evidencias no muestran contraseñas, tokens completos, `JWT_SECRET` ni `MONGODB_URI`.
