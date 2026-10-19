export default {
  id: "automatizaciones",
  title: "Automatizaciones y escenas",
  short: "Disparadores, condiciones y acciones: diseña las escenas de la instalación básica sin sorpresas.",
  intro:
    "Una casa con dispositivos conectados pero sin automatizaciones es solo un control remoto caro. Aquí aprenderás la estructura de cualquier automatización y practicarás con los ejemplos del curso: la puerta, el pulsador, la cocina y la luz del dormitorio.",
  objectives: [
    "Separar disparador, condición y acción en cualquier automatización.",
    "Reconocer los tipos de automatización más comunes.",
    "Recrear las escenas del curso en eWeLink.",
    "Evitar errores típicos: avisos de más y luces que nunca se apagan.",
  ],
  sections: [
    {
      title: "Anatomía de una automatización",
      blocks: [
        { type: "p", text: "Toda automatización responde a **«SI pasa esto, ENTONCES haz aquello»**, opcionalmente con una **condición** que limita cuándo se aplica." },
        { type: "diagram", name: "automation" },
        { type: "list", items: [
          "**Disparador:** el evento que la inicia (se abre una puerta, se presiona un botón, son las 7:00, amanece).",
          "**Condición:** un filtro opcional (solo de noche, solo si no hay nadie en casa). En eWeLink se configura con el **periodo efectivo**.",
          "**Acción:** lo que ocurre (enviar una notificación, encender una luz, hablar por el altavoz).",
        ] },
      ],
      exercise: {
        type: "classify",
        prompt: "Automatización: «Si se detecta movimiento en el pasillo entre las 22:00 y las 6:00, encender la luz del pasillo y avisar por el altavoz». Clasifica cada parte.",
        categories: ["Disparador", "Condición", "Acción"],
        items: [
          { text: "Se detecta movimiento en el pasillo", category: "Disparador" },
          { text: "Entre las 22:00 y las 6:00", category: "Condición" },
          { text: "Encender la luz del pasillo", category: "Acción" },
          { text: "Decir «Luz del pasillo encendida» por el altavoz", category: "Acción" },
        ],
        explanation: "Una automatización puede tener **varias acciones** encadenadas a partir de un solo disparador.",
      },
    },
    {
      title: "Tipos de automatizaciones",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Programadas", text: "Encender o apagar a ciertas horas, o al amanecer y al atardecer." },
            { title: "Por niveles", text: "Brillo suave de noche y más intenso de día." },
            { title: "Escenas predefinidas", text: "«Lectura» o «Cena» con un solo comando." },
            { title: "Persianas y clima", text: "Abrir, cerrar o ajustar la temperatura según la hora o un sensor." },
            { title: "Por presencia", text: "Encender cuando alguien entra a una habitación." },
            { title: "Notificaciones", text: "Avisos al teléfono ante una puerta abierta o una fuga." },
            { title: "Simulación de presencia", text: "Luces que se encienden de forma aleatoria cuando no hay nadie." },
            { title: "Control remoto", text: "Manejar todo desde la app, estés donde estés." },
          ],
        },
        { type: "p", text: "En eWeLink el disparador puede ser un **dispositivo inteligente**, un **«pulsador para activar»** (un botón en la app), la **hora del día** o **amanecer/atardecer**." },
      ],
      exercise: {
        type: "choice",
        prompt: "Te vas dos semanas de vacaciones y quieres que parezca que hay gente en casa. ¿Qué tipo de automatización usas?",
        options: ["Control de iluminación por niveles", "Simulación de presencia", "Notificación de temperatura", "Escena «Lectura»"],
        answer: 1,
        explanation: "La **simulación de presencia** enciende y apaga luces u otros aparatos durante ciertos periodos para disuadir a intrusos.",
      },
    },
    {
      title: "Las escenas de la instalación básica",
      blocks: [
        { type: "h", text: "1. Aviso de puerta abierta" },
        { type: "p", text: "Escena → Automático → **SI:** Dispositivo inteligente «Sensor puerta entrada» = Abierto → **ENTONCES:** Notificaciones «La puerta de entrada está abierta». Para probarla, separa las dos piezas del sensor." },
        { type: "h", text: "2. Pulsador con tres eventos" },
        { type: "p", text: "El SNZB-01 distingue **pulsación simple, doble y larga**: cada una puede disparar una escena distinta." },
        { type: "h", text: "3. Seguridad en la cocina" },
        { type: "p", text: "Sensor junto a la estufa (a un lado, nunca encima): aviso si la temperatura supera **40 °C** o la humedad **80 %**. Se prueba soplando sobre el sensor." },
        { type: "h", text: "4. Luz del dormitorio de tres formas" },
        { type: "p", text: "El ZBMINI L2 va dentro de la caja del apagador. La luz se controla con el apagador de pared, con la app y con el pulsador, usando la acción **«Reversa»**, que alterna entre encendido y apagado." },
        { type: "callout", variant: "warn", text: "Trabajar con la instalación eléctrica es peligroso. El curso hace el montaje **fuera de la pared**, en una maqueta. En casa, corta la corriente o pide ayuda a un electricista (lo verás en el módulo 8)." },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena los pasos para crear la escena del aviso de puerta en eWeLink.",
        items: [
          "Entrar a «Escena» → «Automático» → «Crear ahora»",
          "En «SI», tocar «Añadir» → «Dispositivo inteligente» → «Sensor puerta entrada»",
          "Elegir el estado «Abierto» y guardar",
          "En «ENTONCES», tocar «Añadir» → «Notificaciones» y escribir el mensaje",
          "Revisar el «Periodo efectivo» y guardar",
          "Poner nombre a la escena, guardar y probar separando las piezas del sensor",
        ],
        explanation: "Primero el **disparador**, luego la **acción**, después la **condición** (periodo efectivo) y por último **probar**.",
      },
    },
    {
      title: "Diseñar buenas automatizaciones",
      blocks: [
        { type: "list", items: [
          "**Piensa en pares:** si algo se enciende solo, decide cuándo se apaga solo (movimiento detectado / no se ha detectado movimiento).",
          "**Evita el ruido:** un aviso cada vez que entras a casa acaba ignorándose. Limita con el periodo efectivo (por ejemplo, de 1:00 a 7:00).",
          "**Elige el actuador correcto:** revisa que la escena del pasillo controle el interruptor del pasillo y no el del dormitorio.",
          "**Desactiva lo que estorba:** al usar el pulsador para la luz, apaga la escena que notificaba cada pulsación simple.",
          "**Prueba siempre** cada escena justo después de crearla.",
        ] },
      ],
      exercise: {
        type: "choice",
        prompt: "Creaste «SI movimiento en el pasillo → ENCENDER luz del pasillo», pero la luz se queda encendida toda la noche. ¿Qué falta?",
        options: [
          "Cambiar el sensor de movimiento por uno de puerta",
          "Una segunda escena: SI «No se ha detectado movimiento» → APAGAR la luz del pasillo",
          "Subir la sensibilidad del sensor",
          "Agregar una notificación al teléfono",
        ],
        answer: 1,
        explanation: "Cada encendido automático necesita su **apagado automático**. El sensor SNZB-03 ofrece ambos estados como disparador.",
      },
    },
  ],
  quiz: [
    { q: "En «Si se abre la puerta, enviar una notificación», ¿qué es «se abre la puerta»?", options: ["La acción", "El disparador", "La condición", "La escena"], answer: 1, explanation: "Es el evento que inicia la automatización." },
    { q: "¿Para qué sirve el «periodo efectivo» en una escena de eWeLink?", options: ["Para cambiar el nombre", "Para limitar los horarios en que la escena se ejecuta", "Para emparejar sensores", "Para medir la batería"], answer: 1, explanation: "Funciona como una condición de tiempo; por ejemplo, avisar solo de 1:00 a 7:00." },
    { q: "¿Cuántos eventos distintos puede disparar el pulsador SNZB-01?", options: ["Uno", "Dos", "Tres: simple, doble y larga", "Diez"], answer: 2, explanation: "Cada tipo de pulsación puede asociarse a una escena distinta." },
    { q: "¿Qué hace la acción «Reversa» sobre un interruptor?", options: ["Lo desempareja", "Alterna su estado: si está encendido lo apaga y viceversa", "Invierte la polaridad", "Reinicia el bridge"], answer: 1, explanation: "Permite usar un solo botón para encender y apagar." },
    { q: "¿Dónde debe colocarse el sensor de temperatura de la cocina?", options: ["Encima de la estufa", "A un lado de la estufa, sin que reciba el calor directo", "Dentro del refrigerador", "En el pasillo"], answer: 1, explanation: "Así capta el aumento de calor y vapor sin dañarse." },
    { q: "¿Qué umbrales propone el curso para las alertas de la cocina?", options: ["Más de 25 °C y 50 %", "Más de 40 °C y más de 80 % de humedad", "Menos de 10 °C", "Más de 100 °C"], answer: 1, explanation: "40 °C y 80 % son señales razonables de algo olvidado en el fuego." },
    { q: "¿Qué tipo de automatización enciende luces al azar cuando no hay nadie?", options: ["Simulación de presencia", "Control por niveles", "Escena «Lectura»", "Control remoto"], answer: 0, explanation: "Busca que la casa parezca habitada." },
    { q: "La luz del pasillo se enciende sola pero nunca se apaga. ¿Qué falta?", options: ["Más sensores de puerta", "Una escena con «No se ha detectado movimiento» → apagar", "Otro bridge", "Una bombilla RGB"], answer: 1, explanation: "Cada encendido automático necesita un apagado automático." },
    { q: "¿Cuál NO es un tipo de disparador disponible en eWeLink?", options: ["Dispositivo inteligente", "Hora del día", "Amanecer/atardecer", "Reconocimiento facial del usuario"], answer: 3, explanation: "Los disparadores de eWeLink en el curso son dispositivo, pulsador en la app, hora y amanecer/atardecer." },
    { q: "Tras usar el pulsador para controlar la luz, ¿por qué el curso desactiva la escena «Pulsación única»?", options: ["Porque gasta la pila", "Para no recibir una notificación cada vez que se enciende o apaga la luz", "Porque es incompatible con Reversa", "Para liberar memoria"], answer: 1, explanation: "Evita avisos innecesarios en el teléfono." },
  ],
};
