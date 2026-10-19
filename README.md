# Aprende IoT y Domótica

Plataforma web para aprender **Internet de las Cosas y domótica** a partir de la guía *Curso sobre Internet de las Cosas IoT – Domótica* (Tino Fernández Cueto, 2024), ampliada con temas como Thread/Matter, QoS de MQTT, ESPHome y ciberseguridad IoT.

- **8 módulos** progresivos, cada uno dividido en temas cortos.
- **34 prácticas interactivas** sin calificación al final de cada tema: opción múltiple, clasificar, ordenar pasos, completar y un laboratorio de comodines MQTT.
- **Cuestionario de 10 preguntas** por módulo, revisado automáticamente. Con **70 o más** se aprueba y se desbloquea el siguiente módulo. Reintentos ilimitados, con explicación de cada respuesta.
- Menú lateral con módulos y progreso, responsivo (cajón en celular), **modo claro/oscuro** y botón para reiniciar el progreso.
- **Puro frontend**: el progreso se guarda en `localStorage`. No hay backend ni base de datos.

## Tecnologías

Vite 5 · React 18 · React Router 6 · Vitest 2. Sin librerías de UI: todo el estilo está en `src/styles.css`.

## Requisitos

- Node.js 18 o superior (recomendado 20 LTS)
- npm

## Probar en tu computadora

```bash
npm install
npm run dev
```

Abre la URL que aparece en la terminal (normalmente http://localhost:5173).

Para probar la versión de producción tal como quedará en Vercel:

```bash
npm run build
npm run preview
```

## Pruebas automáticas

```bash
npm test            # ejecuta las pruebas una vez
npm run test:watch  # las vuelve a ejecutar al guardar cambios
```

Las pruebas (`src/lib/logic.test.js`) cubren:

- Calificación del cuestionario y el umbral de 70.
- Desbloqueo secuencial, mejor calificación e intentos.
- Coincidencia de temas MQTT con `+` y `#`, y validación de filtros.
- Integridad del contenido: 10 preguntas por módulo, respuestas válidas, prácticas bien formadas y que los retos MQTT tengan solución.

### Prueba manual sugerida

1. Abre el módulo 1 y resuelve una práctica: debe marcarse como «Práctica resuelta» y aumentar el contador.
2. Presenta el cuestionario con respuestas al azar: si sacas menos de 70, el módulo 2 sigue bloqueado.
3. Apruébalo: el módulo 2 se desbloquea y el porcentaje del menú sube.
4. Recarga la página: el progreso se conserva.
5. Cambia el modo claro/oscuro y prueba en el celular (o con las herramientas de desarrollador, a 390 px de ancho).
6. Usa «Reiniciar progreso» para volver a empezar.

## Desplegar en Vercel

**Opción A: desde GitHub (recomendada)**

1. Sube esta carpeta a un repositorio de GitHub.
2. En https://vercel.com, elige **Add New → Project** e importa el repositorio.
3. Vercel detecta Vite solo. Si te lo pide: *Build Command* `npm run build`, *Output Directory* `dist`.
4. Presiona **Deploy**. Cada `git push` a la rama principal vuelve a desplegar.

**Opción B: desde la terminal**

```bash
npm i -g vercel
vercel          # primer despliegue (vista previa)
vercel --prod   # despliegue a producción
```

El archivo `vercel.json` redirige todas las rutas a `index.html`. Así, recargar en `/modulo/zigbee` no da error 404.

## Estructura

```
src/
├── main.jsx                  # Rutas
├── styles.css                # Estilos y temas claro/oscuro
├── components/
│   ├── Layout.jsx            # Menú lateral, progreso, tema, reinicio
│   ├── Blocks.jsx            # Bloques de contenido (párrafos, tablas, avisos…)
│   ├── Diagrams.jsx          # Diagramas en HTML/SVG
│   ├── Exercises.jsx         # Prácticas interactivas
│   └── Icons.jsx
├── pages/
│   ├── Home.jsx
│   ├── ModulePage.jsx
│   └── QuizPage.jsx
├── lib/
│   ├── logic.js              # Lógica pura (calificar, desbloquear, MQTT)
│   ├── logic.test.js
│   └── ProgressContext.jsx   # Estado global y localStorage
└── data/
    ├── index.js              # Orden de módulos y reordenamiento de opciones
    └── modules/              # Un archivo por módulo
```

## Editar o agregar contenido

Cada módulo es un objeto en `src/data/modules/`:

```js
export default {
  id: "mi-modulo",            // aparece en la URL
  title, short, intro, objectives: [...],
  sections: [
    {
      title: "Tema",
      blocks: [ { type: "p", text: "Texto con **negrita** y `código`" } ],
      exercise: { type: "choice", prompt, options: [...], answer: 0, explanation },
    },
  ],
  quiz: [ { q, options: [...], answer: 0, explanation }, /* …10 en total */ ],
};
```

- **Bloques:** `p`, `h`, `list` (`ordered`), `callout` (`tip` | `warn` | `info`), `cards`, `table`, `code`, `diagram`.
- **Prácticas:** `choice`, `classify` (`categories` + `items`), `order` (`items` en el orden correcto), `fill` (`blanks` con `answers` aceptadas) y `mqtt` (`topics` + `challenges`).
- En las preguntas, escribe `answer` como el índice de la opción correcta tal como la escribiste. `data/index.js` reordena las opciones siempre de la misma forma para que la correcta no quede en la misma letra. Usa `keepOrder: true` si el orden importa (por ejemplo, números).
- Para agregar un módulo, impórtalo en `src/data/index.js`. `npm test` verifica que esté bien formado.

## Notas

- El progreso vive en el navegador: borrar los datos del sitio o cambiar de dispositivo lo reinicia. La clave es `iot-domotica-progress-v1`.
- Los precios del módulo 3 son los de la guía original (España, marzo de 2024).
