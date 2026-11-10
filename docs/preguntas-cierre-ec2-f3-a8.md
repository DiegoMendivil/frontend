# Preguntas de cierre - EC2 F3 A8

## 1. ¿Por qué las reglas de validación se colocaron en una utilidad?
Para mantener una sola implementación y reutilizar las mismas reglas al registrar y editar tareas.

## 2. ¿Qué significa el retorno `string | null` de `validateTaskTitle`?
La función devuelve un mensaje (`string`) cuando el título es inválido y `null` cuando cumple las reglas.

## 3. ¿Qué función cumplen `aria-invalid`, `aria-describedby` y `role="alert"`?
`aria-invalid` indica que el campo tiene un error; `aria-describedby` asocia el campo con la ayuda o mensaje; `role="alert"` permite anunciar el error a tecnologías de asistencia.

## 4. ¿Por qué `query`, `filter` y `sortBy` son estados controlados?
Porque sus valores deben mantenerse sincronizados con los controles de búsqueda y selección, y sus cambios recalculan los resultados.

## 5. ¿Por qué `visibleTasks` no debe almacenarse como estado independiente?
Porque se obtiene a partir de `tasks` y los criterios de consulta. Calcularlo evita duplicar datos y que la vista quede desincronizada.

## 6. ¿Cómo se normaliza una búsqueda?
Se quitan espacios externos con `trim()` y se convierte el texto a minúsculas con `toLocaleLowerCase('es-MX')` antes de comparar.

## 7. ¿Por qué se crea una copia antes de utilizar `sort`?
Porque `sort` modifica el arreglo en el que se ejecuta. Ordenar una copia evita mutar el arreglo principal almacenado en el estado.

## 8. ¿Qué responsabilidad tiene `task-query.service.ts`?
Busca por título, aplica el filtro de estado y ordena una copia para devolver las tareas visibles sin modificar la colección original.

## 9. ¿Por qué el resultado de `JSON.parse` se trata como `unknown`?
Porque el contenido del almacenamiento puede estar corrupto o tener cualquier estructura; primero debe validarse antes de usarlo como tareas.

## 10. ¿Qué comprueba la función `isTask`?
Comprueba que cada valor tenga identificador y título de texto, un estado permitido y fechas válidas para creación y actualización.

## 11. ¿Qué ventaja ofrece la inicialización diferida de `useState`?
La función inicializadora carga las tareas guardadas al inicializar el estado, en vez de leer el almacenamiento en cada renderizado.

## 12. ¿Por qué `localStorage` se sincroniza mediante `useEffect`?
Porque `localStorage` es externo al estado de React. El efecto guarda la colección cuando `tasks` cambia.

## 13. ¿Por qué `TaskSummary` recibe `tasks` y `TaskList` recibe `visibleTasks`?
El resumen debe mostrar los totales de toda la colección, mientras que la lista presenta solo las tareas que coinciden con la búsqueda y los criterios.

## 14. ¿Qué información se pierde y cuál permanece al recargar?
Se pierden los criterios actuales de búsqueda, filtro y orden, porque no se guardan. Las tareas y sus cambios permanecen en `localStorage`.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?
La dificultad fue separar la colección original de los resultados visibles y validar de forma segura los datos persistidos. Lo resolví calculando la vista con un servicio independiente y comprobando la estructura recuperada antes de utilizarla.
