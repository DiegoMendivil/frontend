# Reflexión sobre las consultas de tareas

1. **¿Qué responsabilidad nueva cumple el repositorio?**
   Encapsula el acceso a MongoDB: construye filtros y ordenamientos, ejecuta las consultas paginadas, cuenta resultados y conserva las operaciones por ID, creación, actualización y eliminación. El servicio ya no importa `TaskModel`.

2. **¿Por qué el middleware debe validar `req.query` antes del controlador?**
   Los parámetros vienen del cliente y pueden ser cadenas, arreglos, objetos o valores inválidos. El middleware limita los campos permitidos, valida sus valores y deja un `TaskListQuery` normalizado para las capas siguientes.

3. **¿Cómo se calcula `skip` para una página?**
   Con `skip = (page - 1) × limit`. Por ejemplo, la página 3 con límite 10 omite los primeros 20 documentos.

4. **¿Por qué `find` y `countDocuments` usan el mismo filtro?**
   Para que `data` y `meta.total` describan el mismo conjunto. Si uno omite el filtro por estado o texto, el total de páginas no coincidiría con los resultados.

5. **¿Qué problema evita `escapeRegex`?**
   Hace que los caracteres especiales de la búsqueda se interpreten como texto literal y no como operadores de una expresión regular.

6. **¿Por qué `sortBy` utiliza una lista permitida?**
   Para aceptar solo `createdAt`, `updatedAt`, `title` o `status`; el cliente no puede inyectar nombres de campos arbitrarios en el ordenamiento.

7. **¿Qué diferencia existe entre `data.length`, `meta.total` y `meta.totalPages`?**
   `data.length` cuenta los elementos de la página actual; `meta.total` cuenta todos los documentos que cumplen el filtro; `meta.totalPages` es el número de páginas necesario para mostrarlos con el límite elegido.

8. **¿Cómo llega un error asíncrono al manejador central en Express 5?**
   El controlador async espera al servicio. Si el repositorio rechaza su promesa, Express 5 dirige el error al middleware central, que produce el formato uniforme de error.

9. **¿Qué prueba demuestra que A8 no rompió el CRUD de A7?**
   Ejecutar POST, GET por ID, PATCH general, PATCH de completar y DELETE, comprobando sus códigos de éxito y el 404 al consultar un documento eliminado.

10. **¿Qué limitación tiene la paginación con `skip` en colecciones grandes?**
    MongoDB debe recorrer y descartar documentos anteriores a la página solicitada; en páginas muy profundas puede ser menos eficiente que una paginación basada en cursor.
