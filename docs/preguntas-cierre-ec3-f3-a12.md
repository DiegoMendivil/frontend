# Preguntas de cierre EC3 F3 A12

## 1. ¿Qué aporta Vitest al proyecto?
Permite validar el comportamiento crítico de la aplicación con pruebas rápidas, reutilizables y automatizadas.

## 2. ¿Por qué usar testing-library?
Porque verifica la interfaz como la percibe un usuario real, comprobando texto, redirecciones y estados visuales.

## 3. ¿Qué se valida con las pruebas implementadas?
Se comprueba la validación de títulos, la gestión del token de sesión y la protección de rutas públicas y privadas.

## 4. ¿Qué se necesita para desplegar en Render?
Un build estático generado por Vite, una carpeta de publicación `dist` y una variable `VITE_API_URL` adecuada para el entorno de producción.

## 5. ¿Por qué es importante revisar la seguridad?
Porque un frontend puede filtrar información sensible o reutilizar credenciales si se configura sin control. El código debe evitar secretos en repositorios públicos y documentar el almacenamiento limitado del token.
