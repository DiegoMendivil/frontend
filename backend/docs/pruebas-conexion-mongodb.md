# Pruebas de conexión con MongoDB Atlas

## Entorno verificado

- Rama: `feature/mongodb-atlas` (crear/cambiar con Git si el repositorio está inicializado).
- Comando de tipos: `pnpm check` — pendiente de ejecutar.
- Comando de compilación: `pnpm build` — pendiente de ejecutar.
- Resultado de arranque: pendiente de configurar y verificar Atlas.
- Seguridad: no copiar aquí la URI, contraseña, host privado ni capturas que los muestren.

## Casos ejecutados

Registra el código y `X-Request-Id` que realmente devuelva cada solicitud; no marques pruebas sin ejecutar.

| Tipo | Método y ruta/condición | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | GET /health | No aplica | 200, status ok | Pendiente | Pendiente | Pendiente |
| Positiva | GET /health/database | No aplica | 200, connected | Pendiente | Pendiente | Pendiente |
| Regresión | GET /api/tasks | No aplica | 200, lista inicial | Pendiente | Pendiente | Pendiente |
| Regresión | POST /api/tasks | JSON con title válido | 201 | Pendiente | Pendiente | Pendiente |
| Regresión | GET /api/tasks/:id | ID creado | 200 | Pendiente | Pendiente | Pendiente |
| Regresión | PATCH /api/tasks/:id/complete | ID creado | 200, completed true | Pendiente | Pendiente | Pendiente |
| Regresión | DELETE /api/tasks/:id | ID creado | 204 | Pendiente | Pendiente | Pendiente |
| Negativa | GET /api/tasks/abc | No aplica | 400 INVALID_ID | Pendiente | Pendiente | Pendiente |
| Negativa | GET /api/tasks/999 | No aplica | 404 TASK_NOT_FOUND | Pendiente | Pendiente | Pendiente |
| Negativa | POST /api/tasks | raw Text | 415 UNSUPPORTED_MEDIA_TYPE | Pendiente | Pendiente | Pendiente |
| Negativa | POST /api/tasks | title vacío | 422 VALIDATION_ERROR | Pendiente | Pendiente | Pendiente |
| Negativa | GET /ruta-inexistente | No aplica | 404 ROUTE_NOT_FOUND | Pendiente | Pendiente | Pendiente |
| Infraestructura | Reinicio con contraseña temporal incorrecta | No aplica | Proceso falla sin abrir puerto ni mostrar secreto | Pendiente | No aplica | Pendiente |
| Apagado | Ctrl+C / SIGINT | No aplica | HTTP y Mongoose cierran sin error no controlado | Pendiente | No aplica | Pendiente |

## Evidencias por agregar

1. Captura de Atlas con el despliegue disponible, ocultando usuarios/credenciales.
2. Captura de GET /health/database.
3. Capturas de respuesta correcta, validación y regla de negocio.
4. Salida de `pnpm check` y `pnpm build`.
5. Salida de `git check-ignore .env`; `git ls-files .env` debe quedar vacío.
6. Evidencia de apagado con Ctrl+C.

Las evidencias se deben obtener en el entorno propio. No se inventaron resultados ni capturas.