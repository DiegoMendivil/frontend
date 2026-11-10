# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz `Task`?
La interfaz define el contrato de una tarea: especifica que cada objeto debe tener identificador, título, estado y fechas de creación y actualización con los tipos correspondientes.

## 2. ¿Qué diferencia existe entre `Task` y `TaskStatus`?
`Task` describe la estructura completa del objeto de tarea. `TaskStatus` es un tipo unión que limita el estado a los valores `pending` o `completed`.

## 3. ¿Qué significa declarar un arreglo como `Task[]`?
Significa que el arreglo puede contener elementos que deben cumplir la estructura definida por la interfaz `Task`.

## 4. ¿Qué hace el método `map`?
`map` recorre los elementos de un arreglo y devuelve un nuevo arreglo con el resultado de aplicar una función a cada elemento, sin modificar el arreglo original.

## 5. ¿Qué resultado produce `map` dentro de `TaskList`?
Produce un componente `TaskItem` por cada tarea, para que toda la colección se muestre dinámicamente en la lista.

## 6. ¿Para qué utiliza React la propiedad `key`?
React utiliza `key` para identificar de forma estable cada elemento de una lista y detectar cuáles se agregaron, eliminaron o cambiaron.

## 7. ¿Por qué se utiliza `task.id` y no el índice?
El identificador pertenece a la tarea y permanece asociado a ella aunque cambie el orden de la lista. El índice depende de la posición y puede causar asociaciones incorrectas al actualizar listas.

## 8. ¿Cómo se envía una tarea de `TaskList` a `TaskItem`?
`TaskList` pasa el objeto completo mediante la propiedad `task`, por ejemplo: `<TaskItem key={task.id} task={task} />`.

## 9. ¿Cómo se comunican `App`, `TaskSummary` y `TaskList`?
`App` importa la colección local y la entrega a `TaskSummary` y `TaskList` mediante la propiedad `tasks`. Ambos componentes reciben los datos de su padre y los presentan o calculan información derivada.

## 10. ¿Qué es el renderizado condicional?
Es mostrar una parte distinta de la interfaz según se cumpla una condición. En esta actividad, `TaskList` muestra las tareas si hay elementos o un mensaje informativo si el arreglo está vacío.

## 11. ¿Por qué el resumen se calcula a partir de la colección?
Así los totales siempre corresponden a los datos reales. Se evita duplicar cantidades manuales que podrían quedar desactualizadas si cambia la colección.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?
La dificultad fue cambiar los componentes que antes usaban datos escritos directamente en la interfaz para que recibieran objetos tipados mediante props. La resolví definiendo `Task`, pasando el mismo arreglo desde `App` y usando sus propiedades para renderizar la lista y calcular el resumen.
