# Evidencias A9 — autenticación

## Objetivo
Implementar la capa de autenticación del backend con registro, login y emisión de JWT.

## Cambios realizados
- Se añadió el modelo `User` con correo único, nombre, contraseña cifrada y rol por defecto.
- Se integró `bcryptjs` para el hashing seguro de contraseñas.
- Se incorporó `jose` para firmar y verificar JWT con `HS256`.
- Se crearon validaciones de entrada para registro e inicio de sesión.
- Se añadieron endpoints `POST /api/auth/register` y `POST /api/auth/login`.
- Se documentaron variables `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_ISSUER` y `JWT_AUDIENCE` en `.env.example`.

## Verificación
- La suite de pruebas ejecuta la validación de registro, login y generación de tokens.
- La API responde con errores unificados `422` para entradas inválidas y `401` para credenciales incorrectas.
