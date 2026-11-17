# Reflexión A9

La autenticación es el paso necesario para pasar de una API de tareas aislada a una API con identidad de usuario. El uso de `bcryptjs` evita guardar contraseñas en texto plano y `jose` centraliza la firma y validación de tokens de acceso. La validación inicial de correo y contraseña reduce errores y evita entradas inconsistentes.

La parte más importante fue separar claramente el dominio del usuario del controlador y la capa HTTP: el modelo define la estructura de datos, el repositorio gestiona la persistencia, y el servicio aplica la lógica de negocio. Esto mantiene el proyecto más mantenible y prepara la API para rutas futuras protegidas por autenticación.
