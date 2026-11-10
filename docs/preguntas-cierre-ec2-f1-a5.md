# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?
React ayuda a dividir una interfaz en partes reutilizables y a mantener organizada la presentación de la información.

## 2. ¿Qué es un componente?
Es una función que devuelve una parte de la interfaz y que se puede combinar con otros componentes.

## 3. ¿Por qué los componentes comienzan con mayúscula?
La mayúscula permite que React distinga los componentes de las etiquetas HTML integradas.

## 4. ¿Qué diferencia existe entre HTML y TSX?
TSX permite escribir una estructura parecida a HTML dentro de TypeScript y también insertar expresiones de JavaScript. Además, usa convenciones como `className` y `htmlFor`.

## 5. ¿Para qué se utiliza `className`?
Se utiliza para asignar clases CSS a los elementos de TSX.

## 6. ¿Qué son las propiedades o props?
Son valores que un componente padre entrega a un componente hijo para que los use al mostrar su contenido.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?
Permite declarar las propiedades esperadas y sus tipos, de modo que se detecten valores incorrectos durante el análisis del código.

## 8. ¿Cuál es la responsabilidad de `App.tsx`?
Coordinar la composición de la pantalla e incluir los componentes que forman la aplicación.

## 9. ¿Por qué la interfaz se dividió en varios componentes?
Para separar responsabilidades, facilitar la lectura y reutilizar piezas como la representación de cada tarea.

## 10. ¿Por qué los botones todavía están deshabilitados?
Porque esta actividad se enfoca en la estructura visual y los componentes; el estado y las acciones se desarrollarán después.

## 11. ¿Qué componente consideras más reutilizable y por qué?
`TaskItem`, porque representa tareas distintas usando las mismas propiedades tipadas para el título y el estado.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?
La primera instalación no pudo conectarse al registro de paquetes por un problema temporal de certificado TLS. Volví a intentar `pnpm install` sin desactivar la verificación segura y la instalación terminó correctamente. Después ejecuté `pnpm lint` y `pnpm build`, y ambos finalizaron sin errores.
