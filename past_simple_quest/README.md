# Past Simple Quest — Regular Verbs

Juego educativo interactivo para practicar el **past simple de los verbos regulares en inglés**. Está construido con HTML, CSS y JavaScript sin dependencias ni instalaciones.

## Archivos

- `index.html`: estructura y contenido de la interfaz.
- `styles.css`: estilos, diseño responsive y estados visuales.
- `script.js`: preguntas, puntuación, validación de respuestas, progreso y sonidos.
- `README.md`: este manual de uso.

## Cómo ejecutar el juego

1. Descarga y descomprime el paquete ZIP, o guarda los cuatro archivos en la misma carpeta.
2. Abre `index.html` con un navegador actualizado (Chrome, Edge, Firefox o Safari).
3. ¡Empieza a responder! No necesitas instalar nada ni conectarte a internet.

> Importante: `index.html`, `styles.css` y `script.js` deben permanecer en la misma carpeta para que el juego cargue correctamente.

## Cómo jugar

1. Lee la frase en inglés y su traducción al español.
2. Elige una de las cuatro opciones.
3. Lee la explicación que aparece después de responder.
4. Pulsa **Siguiente reto** para continuar.
5. Al terminar los 10 retos, revisa tus aciertos, XP y precisión.
6. Usa **Jugar otra vez** o **Reiniciar ronda** para empezar una nueva ronda con preguntas mezcladas.
7. Activa o desactiva el sonido desde el botón de la parte superior. El sonido está apagado por defecto.

### Puntuación

- Cada respuesta correcta vale **10 XP**.
- Una respuesta incorrecta no suma XP y reinicia la racha actual.
- La ronda contiene 10 preguntas y muestra el porcentaje de precisión al final.

### Atajos de teclado

- Teclas `1`, `2`, `3` y `4`: seleccionar una opción mientras la pregunta está activa.
- `Enter`: avanzar cuando ya se respondió la pregunta.

## Reglas de gramática incluidas

- Regla general: `work → worked`.
- Verbos que terminan en `e`: se añade `-d`, como `use → used`.
- Consonante + `y`: cambia `y` por `i` y se añade `-ed`, como `study → studied`.
- Vocal + `y`: se añade `-ed`, como `play → played`.

## Diseño e interfaz (UI/UX)

- Diseño adaptable a móviles, tabletas y pantallas de escritorio.
- Jerarquía visual clara, contraste, botones grandes y estados de respuesta visibles.
- Anuncios de resultado mediante una región `aria-live`.
- Controles compatibles con teclado y foco visible.
- Respeta la preferencia del sistema para reducir animaciones.

## Seguridad y calidad del código

- El contenido de preguntas y respuestas se inserta usando `textContent`, no `innerHTML` con datos externos.
- Las opciones se crean mediante `document.createElement`; no se interpreta contenido del usuario como HTML.
- No hay campos de entrada libre, llamadas de red, cookies ni almacenamiento de datos personales.
- El único `innerHTML` se usa para insertar etiquetas fijas y constantes de interfaz, nunca datos de preguntas o del usuario.
- JavaScript encapsulado en una función y modo estricto.
- No utiliza bibliotecas externas ni dependencias de terceros.

## Personalización

Abre `script.js` y edita el arreglo `questions`. Cada pregunta tiene esta estructura:

```js
{
  sentence: "Yesterday, I ____ football with my friends.",
  translation: "Ayer, jugué fútbol con mis amigos.",
  verb: "play",
  answer: "played",
  options: ["playd", "played", "plaied", "playing"],
  note: "Añade -ed: play → played."
}
```

Asegúrate de que `answer` coincida exactamente con una opción y de mantener cuatro opciones distintas para cada pregunta. `QUESTIONS_PER_ROUND` define la cantidad de preguntas por ronda; debe ser menor o igual al número de preguntas disponibles.

## Compatibilidad

Funciona en navegadores modernos con soporte para JavaScript ES6+. El sonido usa Web Audio API y solo se activa si el usuario lo solicita. Si el navegador no permite audio, el resto del juego seguirá funcionando.

## Licencia

Material de práctica educativa. Puedes modificarlo y adaptarlo para uso personal o escolar.
