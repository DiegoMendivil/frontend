# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?
Una variable local vuelve a inicializarse cuando se ejecuta de nuevo el componente y cambiarla no actualiza la interfaz. El estado se conserva entre renderizados y su setter solicita a React volver a renderizar.

## 2. ¿Qué valores devuelve `useState`?
Devuelve un arreglo con el valor actual del estado y una función para solicitar su actualización.

## 3. ¿Por qué `useState` se declara en el nivel superior del componente?
Los Hooks deben llamarse siempre en el mismo orden en cada renderizado. Por eso no se colocan dentro de condiciones, ciclos o funciones anidadas.

## 4. ¿Qué significa que un campo sea controlado?
Significa que su valor proviene del estado de React y que los cambios del usuario actualizan ese estado mediante `onChange`.

## 5. ¿Por qué `handleSubmit` utiliza `preventDefault`?
Evita que el envío normal del formulario recargue la página, permitiendo manejar el registro desde React.

## 6. ¿Cómo comunica `TaskForm` una nueva tarea a `App`?
`App` entrega a `TaskForm` la función `onAddTask`. El formulario la llama con el título validado al enviarse.

## 7. ¿Por qué `App` funciona como fuente de verdad?
Porque almacena la colección en un solo estado y pasa ese mismo arreglo a los componentes que lo muestran o calculan información. Así se mantiene sincronizada la lista con el resumen.

## 8. ¿Cómo se implementa Create sin utilizar `push`?
Se construye la tarea nueva y se crea un arreglo nuevo con spread, agregándola al inicio junto con las tareas actuales.

## 9. ¿Cómo permite `map` actualizar una sola tarea?
`map` recorre todas las tareas y devuelve una copia modificada únicamente cuando el identificador coincide; las demás se conservan.

## 10. ¿Cómo utiliza `filter` la operación Delete?
`filter` crea un arreglo nuevo que conserva las tareas cuyo identificador no coincide con el que se desea eliminar.

## 11. ¿Por qué se emplea una función actualizadora en `setTasks`?
Porque la operación depende del estado anterior. React proporciona el valor más reciente a la función, evitando actualizar a partir de una copia desactualizada.

## 12. ¿Qué información conserva `TaskItem` como estado local?
Conserva si está en modo edición y el título temporal escrito en el formulario de edición. La colección principal permanece en `App`.

## 13. ¿Por qué los cambios desaparecen al recargar la página?
Porque las tareas nuevas y las modificaciones solo están guardadas en el estado en memoria. Esta actividad aún no usa `localStorage` ni una API.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?
La dificultad fue conectar las acciones de los componentes hijos con el estado central sin modificar directamente el arreglo. La resolví pasando funciones mediante props y usando spread, `map` y `filter` para crear colecciones nuevas.
