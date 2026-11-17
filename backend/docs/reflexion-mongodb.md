# Reflexión: MongoDB Atlas

Completa y personaliza estas respuestas con tus propias palabras y ejemplos de la ejecución. No compartas secretos.

1. **¿Qué diferencia existe entre tu cuenta de Atlas y el usuario de base de datos?** La cuenta de Atlas administra el proyecto y sus recursos desde la plataforma; el usuario de base de datos autentica las conexiones de la aplicación y debe tener solo los permisos necesarios sobre `task_api`.
2. **¿Por qué MONGODB_URI es un secreto aunque el repositorio sea privado?** Incluye credenciales y ubicación del servicio. Una persona con acceso al repositorio, una copia o un registro accidental podría usarla; por eso va en `.env`, fuera del control de versiones.
3. **¿Qué riesgo introduce permitir 0.0.0.0/0?** Acepta intentos de conexión desde cualquier IP. Aunque se requiera contraseña, aumenta la superficie de ataque; se debe autorizar solo la IP/rango necesario.
4. **¿Por qué la API espera connectDatabase antes de ejecutar app.listen?** Para que el servidor no acepte solicitudes si no puede satisfacer la dependencia de base de datos configurada, y para fallar temprano con un diagnóstico seguro.
5. **¿Qué comprueba readyState y qué añade el comando ping?** `readyState` indica el estado local de conexión que mantiene Mongoose. El ping realiza una operación ligera contra el servidor para confirmar comunicación efectiva.
6. **¿Por qué una falla de MongoDB corresponde a infraestructura y no a validación HTTP?** No depende del formato de la solicitud; es una falla de una dependencia externa. Por ello se comunica como `DATABASE_UNAVAILABLE` con estado 503.
7. **¿Cómo llega un AppError lanzado por getDatabaseHealth al manejador central en Express 5?** Express 5 captura el rechazo de la promesa de un controlador async y lo pasa al middleware de errores, que serializa el error conocido sin exponer detalles internos.
8. **¿Qué pruebas demuestran que la incorporación de Atlas no rompió la API anterior?** Ejecutar el CRUD completo y los casos heredados de ID inválido, tarea inexistente, Content-Type incorrecto, título inválido y ruta inexistente; anotar resultados reales en el registro de pruebas.
9. **¿Por qué el arreglo en memoria se conserva todavía en esta actividad?** El objetivo es configurar y comprobar infraestructura. El modelado persistente y el traslado de operaciones se reservan para las actividades siguientes.
10. **¿Qué información debe ocultarse al cliente cuando ocurre un error de conexión?** URI, contraseña, host, stack y objeto original del controlador. El cliente recibe solo un mensaje genérico, código y requestId.

## Ejemplo propio de esta ejecución

Agrega aquí una observación real de tu prueba de salud o del apagado ordenado, indicando qué ocurrió sin incluir credenciales. Reescribe las respuestas anteriores de acuerdo con lo que aprendiste.