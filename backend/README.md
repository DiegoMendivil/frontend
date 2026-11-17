# Task API — EC2 F1 A5

API de tareas con Express 5 y TypeScript. El CRUD permanece en memoria; MongoDB Atlas se usa para verificar la conexión y disponibilidad.

## Preparación local

1. Instala Node.js y PNPM.
2. Ejecuta `pnpm install`.
3. Copia `.env.example` a `.env` y sustituye los marcadores con la URI privada de tu clúster Atlas. No compartas ni confirmes `.env` en Git.
4. En Atlas, crea el usuario de base de datos de la aplicación con rol `readWrite` limitado a `task_api`, y permite solo la IP de desarrollo necesaria.
5. Ejecuta `pnpm check`, `pnpm build` y luego `pnpm dev`.

La API abre el puerto únicamente después de conectarse a Atlas. No se incluyó una URI real ni un archivo `.env`: debes introducir tus propias credenciales privadas.

## Rutas

- `GET /health`: salud del proceso.
- `GET /health/database`: ejecuta ping a MongoDB; responde 503 si la base no está disponible.
- `GET /api/tasks`, `POST /api/tasks`, `GET /api/tasks/:id`, `PATCH /api/tasks/:id/complete`, `DELETE /api/tasks/:id`: CRUD temporal en memoria.

`Ctrl+C` y `SIGTERM` detienen primero el servidor HTTP y después cierran Mongoose.

## Verificación y entrega

Registra resultados reales y request IDs en [docs/pruebas-conexion-mongodb.md](docs/pruebas-conexion-mongodb.md). Completa y personaliza con tus propias palabras [docs/reflexion-mongodb.md](docs/reflexion-mongodb.md). La configuración de Atlas, la prueba en Postman, las capturas, Git y la rama no se pueden completar de forma segura sin tu cuenta y tus credenciales.