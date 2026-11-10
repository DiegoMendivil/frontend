# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?
Es una aplicación web que carga una estructura principal y actualiza las vistas desde JavaScript sin solicitar un documento HTML completo para cada navegación.

## 2. ¿Qué responsabilidad tiene `BrowserRouter`?
Proporciona el contexto de navegación y conecta React Router con el historial del navegador. Se configura una sola vez alrededor de la aplicación.

## 3. ¿Cuál es la diferencia entre `Routes` y `Route`?
`Routes` agrupa las definiciones y selecciona la ruta que coincide con la dirección. `Route` relaciona un patrón de URL con el componente que debe mostrarse.

## 4. ¿Qué es una ruta índice?
Es la página predeterminada de una ruta padre. En este proyecto corresponde a la página de inicio en `/`.

## 5. ¿Qué beneficio ofrece un layout?
Permite reutilizar la estructura compartida, como el encabezado, menú y pie de página, sin repetirla en cada página.

## 6. ¿Qué función cumple `Outlet`?
Indica en el layout el lugar donde React Router renderiza la página hija que coincide con la ruta actual.

## 7. ¿Qué diferencia existe entre `Link` y `NavLink`?
Ambos permiten navegar internamente sin recargar el documento. `NavLink` también permite conocer si su ruta está activa, por lo que resulta apropiado para el menú.

## 8. ¿Por qué no se utilizan enlaces `<a>` para navegar internamente?
Un enlace tradicional solicita una navegación completa del navegador. `Link` y `NavLink` actualizan la ruta dentro de la SPA sin recargar toda la aplicación.

## 9. ¿Qué representa `:taskId`?
Representa un segmento dinámico de la ruta que contiene el identificador de una tarea, por ejemplo `/tasks/abc123`.

## 10. ¿Cómo se recupera un parámetro dinámico?
Se utiliza el hook `useParams` y se lee el campo cuyo nombre coincide con el segmento declarado en la ruta, en este caso `taskId`.

## 11. ¿Cuándo debe utilizarse `useNavigate`?
Cuando la navegación debe ocurrir como resultado de una operación o evento del código, por ejemplo regresar a la lista después de eliminar una tarea.

## 12. ¿Qué función cumple la ruta `*`?
Captura las direcciones que no coinciden con las demás rutas y permite mostrar una página 404.

## 13. ¿Por qué el estado continúa administrado por `App`?
`App` sigue siendo la fuente principal de verdad para la colección y las operaciones. Las páginas reciben los datos y callbacks mediante propiedades, evitando estados duplicados.

## 14. ¿Por qué `localStorage` permanece en esta actividad?
La actividad reorganiza la aplicación y agrega navegación, pero todavía no conecta una API. Se conserva `localStorage` para no perder la persistencia ni el CRUD local.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?
La dificultad fue separar la interfaz en rutas sin perder el estado ni las funciones CRUD. La resolví manteniendo la colección en `App`, creando un layout con `Outlet` y pasando a las páginas los datos y callbacks necesarios.
