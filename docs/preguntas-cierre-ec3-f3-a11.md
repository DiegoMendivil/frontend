# Preguntas de cierre EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?
La autenticación confirma quién es la persona que realiza la solicitud. La autorización determina qué operaciones permite el rol de esa identidad.

## 2. ¿Qué información guarda `sessionStorage` y qué información no debe guardar?
En esta actividad guarda únicamente el access token. No guarda la contraseña, el hash de contraseña, ni el objeto de usuario; la identidad se consulta en `/auth/me`.

## 3. ¿Por qué se consulta `/api/auth/me` al recargar?
Porque tener un token guardado no demuestra que todavía sea válido. El Backend verifica el token y devuelve la identidad actual.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?
Decodificar solo permite leer datos; no comprueba la firma ni la vigencia. El Backend es quien valida el token y sus permisos.

## 5. ¿Qué responsabilidad tiene `AuthProvider`?
Coordina el estado de sesión, registro, login, restauración de identidad, cierre local y reacción a respuestas 401.

## 6. ¿Qué beneficio ofrece `useAuth`?
Permite que páginas y componentes lean el contexto de autenticación sin pasar usuario y token por muchas propiedades.

## 7. ¿Qué representa el estado `checking`?
Que existe un token previo y la aplicación está esperando que `/auth/me` confirme si la sesión sigue siendo válida.

## 8. ¿Qué diferencia existe entre 401 y 403?
401 significa que falta una identidad aceptable o que el token no es válido. 403 significa que la identidad es válida pero no tiene permiso para esa operación.

## 9. ¿Por qué `ProtectedRoute` no sustituye la seguridad del Backend?
La guarda solo controla qué pantalla presenta el Frontend. Una solicitud directa puede evitar esa interfaz, así que la API debe verificar el token y los permisos en cada operación.

## 10. ¿Por qué ocultar Eliminar a `user` no constituye autorización?
Ocultarlo mejora la experiencia, pero el usuario podría construir una solicitud manual. El Backend debe rechazarla con 403.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?
El token existente contiene las afirmaciones del momento en que fue emitido. Iniciar sesión de nuevo obtiene un JWT con el rol actualizado.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?
El Frontend elimina el token de `sessionStorage`, limpia el usuario y el estado de React, y navega al login. No revoca una copia del JWT en el servidor.

## 13. ¿Qué riesgo conserva `sessionStorage` ante XSS?
JavaScript ejecutado en el mismo origen puede leer el token. Por eso se evita guardar otras credenciales y se advierte que esto no es una solución de producción.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?
El modelo del Backend no incluye un `userId` asociado a cada tarea; por eso las identidades autenticadas comparten la colección según el contrato actual.

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?
La dificultad fue compatibilizar el contrato que devuelve el Backend con el contrato de la guía y proteger las operaciones sin perder el CRUD. Se centralizó la normalización del token y se pasó la identidad por el contexto.
