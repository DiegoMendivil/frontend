# Pruebas de consultas de tareas

## Entorno
- Rama: (registrar rama real)
- Base: `task_api`
- Colección: `tasks`
- Resultado de `pnpm check`: pendiente de ejecutar
- Resultado de `pnpm build`: pendiente de ejecutar
- Mongoose requerido por la guía: `8.24.4`

## Datos preparados
- Total de tareas: (registrar resultado de Atlas/Postman)
- Tareas `pending`: (registrar resultado)
- Tareas `completed`: (registrar resultado)

## Casos ejecutados
| Tipo | Método y ruta | Esperado | Obtenido | requestId | Resultado |
|---|---|---:|---:|---|---|
| Positiva | `GET /api/tasks?page=1&limit=2` | 200 | Pendiente | — | Pendiente |
| Positiva | `GET /api/tasks?status=completed` | 200 | Pendiente | — | Pendiente |
| Positiva | `GET /api/tasks?search=api` | 200 | Pendiente | — | Pendiente |
| Positiva | `GET /api/tasks?sortBy=title&order=asc` | 200 | Pendiente | — | Pendiente |
| Positiva | `GET /api/tasks?status=pending&search=entrega&page=1&limit=2&sortBy=title&order=asc` | 200 | Pendiente | — | Pendiente |
| Negativa | `GET /api/tasks?page=0` | 422 `QUERY_VALIDATION_ERROR` | Pendiente | — | Pendiente |
| Negativa | `GET /api/tasks?sortBy=priority` | 422 `QUERY_VALIDATION_ERROR` | Pendiente | — | Pendiente |
| Negativa | `GET /api/tasks?owner=ana` | 422 `QUERY_VALIDATION_ERROR` | Pendiente | — | Pendiente |
| Regresión | `PATCH /api/tasks/:id/complete` | 200 | Pendiente | — | Pendiente |
| Regresión | `DELETE /api/tasks/:id` | 204 | Pendiente | — | Pendiente |

> Completar “Obtenido”, `requestId` y “Resultado” con valores reales de Postman; no se registran evidencias no ejecutadas.

## Evidencias por capturar
1. `pnpm check` y `pnpm build` exitosos.
2. Dos páginas distintas sin elementos repetidos.
3. Filtro y búsqueda combinados.
4. Orden ascendente y descendente.
5. Error 422 con `details` y `requestId`.
6. Regresión del CRUD heredado.
7. Persistencia después de reiniciar la API.

No incluir URI, usuario, contraseña ni host de MongoDB en capturas o documentación.
