export default {
  id: "fundamentos",
  title: "Fundamentos de IoT y domótica",
  short: "Qué es el IoT, qué es la domótica, en qué se diferencian y cómo se aplican en la escuela y en casa.",
  intro:
    "Antes de conectar un solo sensor conviene tener claro el vocabulario. En este módulo distinguirás el Internet de las Cosas de la domótica, verás aplicaciones reales y conocerás las distintas formas (y niveles) de montar un sistema.",
  objectives: [
    "Explicar qué es el IoT y qué es la domótica con tus propias palabras.",
    "Distinguir un dispositivo IoT de uno que además es domótico.",
    "Identificar aplicaciones en educación y en el hogar.",
    "Comparar las formas de construir un sistema y sus cuatro niveles.",
  ],
  sections: [
    {
      title: "¿Qué es el Internet de las Cosas?",
      blocks: [
        { type: "p", text: "El **Internet de las Cosas (IoT)** es la interconexión digital de objetos cotidianos con Internet. Una regla práctica: si un aparato tiene interruptor de encendido y apagado, probablemente puede formar parte del IoT." },
        { type: "p", text: "Un objeto IoT tiene tres ingredientes: **detecta o actúa** sobre el mundo (un sensor que mide o un actuador que hace algo), **se comunica** (Wi-Fi, ZigBee, Bluetooth…) y **comparte datos** con otras máquinas o con una app." },
        {
          type: "cards",
          items: [
            { title: "Sensores", text: "Miden algo del entorno: temperatura, humedad, movimiento, si una puerta está abierta." },
            { title: "Actuadores", text: "Hacen algo: encender una luz, abrir una persiana, activar una sirena." },
            { title: "Conectividad", text: "La vía por la que viajan los datos: Wi-Fi, ZigBee, Z-Wave, Bluetooth, LoRaWAN." },
          ],
        },
      ],
      exercise: {
        type: "classify",
        prompt: "Clasifica cada componente como sensor o actuador.",
        categories: ["Sensor", "Actuador"],
        items: [
          { text: "Detector de movimiento del pasillo", category: "Sensor" },
          { text: "Interruptor inteligente que enciende la lámpara", category: "Actuador" },
          { text: "Sensor magnético de puerta", category: "Sensor" },
          { text: "Motor de una persiana", category: "Actuador" },
          { text: "Termómetro e higrómetro de la cocina", category: "Sensor" },
          { text: "Sirena de alarma", category: "Actuador" },
        ],
        explanation: "Los sensores **leen** el mundo y los actuadores **modifican** el mundo. Casi todas las automatizaciones unen un sensor con un actuador.",
      },
    },
    {
      title: "Domótica: el IoT aplicado al hogar",
      blocks: [
        { type: "p", text: "La **domótica** es la integración de tecnología en la vivienda para automatizar sus funciones: iluminación, temperatura, seguridad, persianas y más. Busca comodidad, ahorro y seguridad." },
        { type: "p", text: "La domótica usa IoT, pero el IoT es mucho más amplio: incluye cualquier objeto conectado, esté o no en una casa." },
        {
          type: "table",
          head: ["", "IoT", "Domótica"],
          rows: [
            ["Alcance", "Cualquier objeto conectado a Internet", "Solo sistemas que automatizan el hogar"],
            ["Ejemplo", "Reloj inteligente que mide tu ritmo cardíaco", "Luz que se enciende al detectar movimiento"],
            ["Relación", "Conjunto amplio", "Subconjunto aplicado a la vivienda"],
          ],
        },
        { type: "callout", variant: "tip", text: "Toda instalación domótica moderna es IoT, pero no todo dispositivo IoT es domótico." },
      ],
      exercise: {
        type: "classify",
        prompt: "¿Es solo IoT, o es IoT y además domótica?",
        categories: ["Solo IoT", "IoT y domótica"],
        items: [
          { text: "Reloj inteligente que registra tu sueño", category: "Solo IoT" },
          { text: "Termostato que ajusta la calefacción de la casa", category: "IoT y domótica" },
          { text: "Tractor con GPS que envía datos al agricultor", category: "Solo IoT" },
          { text: "Cerradura de la puerta de casa que abres desde la app", category: "IoT y domótica" },
          { text: "Estación de calidad del aire en una avenida", category: "Solo IoT" },
          { text: "Persianas que bajan solas al atardecer", category: "IoT y domótica" },
        ],
        explanation: "La pregunta clave es: **¿automatiza una función de la vivienda?** Si sí, es domótica; si solo está conectado, es IoT.",
      },
    },
    {
      title: "Aplicaciones en la escuela y en casa",
      blocks: [
        { type: "p", text: "Estas tecnologías no solo mejoran espacios: también enseñan programación, electrónica, análisis de datos y pensamiento crítico sobre privacidad y sostenibilidad." },
        {
          type: "cards",
          items: [
            { title: "Aulas inteligentes", text: "Iluminación y clima que se ajustan a la ocupación y la luz natural." },
            { title: "Monitoreo de recursos", text: "Sensores de energía y riego inteligente según humedad del suelo y pronóstico." },
            { title: "Seguridad y salud", text: "Control de acceso, cámaras y sensores de calidad del aire con alertas." },
            { title: "Laboratorios", text: "Kits con Arduino o Raspberry Pi y experimentos que recogen datos en tiempo real." },
            { title: "Proyectos", text: "Maquetas de casas inteligentes y huertos escolares automatizados." },
            { title: "Bibliotecas", text: "Etiquetas RFID para inventario y préstamo de materiales." },
          ],
        },
        { type: "h", text: "En la vivienda" },
        { type: "list", items: ["**Tiempo:** rutinas automáticas para luces, termostato y electrodomésticos.", "**Confort:** luz, temperatura y ventilación adecuadas para trabajar o descansar.", "**Ahorro:** consumo visible en tiempo real y ajustes automáticos.", "**Seguridad:** cámaras, alarmas y cerraduras que se consultan desde el teléfono."] },
      ],
      exercise: {
        type: "choice",
        prompt: "Tu escuela quiere un huerto que gaste menos agua. ¿Qué combinación es la más adecuada?",
        options: [
          "Una cámara Wi-Fi apuntando al huerto",
          "Sensores de humedad del suelo + válvula de riego que se activa cuando el suelo está seco",
          "Un altavoz inteligente que recuerde regar cada día a las 8:00",
          "Etiquetas RFID en cada planta",
        ],
        answer: 1,
        explanation: "Para ahorrar agua hay que **regar solo cuando hace falta**: un sensor mide la humedad y un actuador (la válvula) riega en consecuencia. Regar a hora fija ignora si el suelo ya está húmedo.",
      },
    },
    {
      title: "Formas de construir un sistema y sus niveles",
      blocks: [
        { type: "p", text: "No hay una sola manera de montar un sistema domótico. Cada enfoque equilibra costo, conocimientos técnicos y control." },
        {
          type: "table",
          head: ["Enfoque", "Ventaja", "Desventaja"],
          rows: [
            ["Microcontrolador ESP32 (DIY)", "Personalización total y bajo costo", "Requiere programar y saber electrónica; menos fiable a largo plazo"],
            ["Raspberry Pi + Home Assistant / openHAB / Domoticz", "Centraliza todo y es compatible con muchísimos dispositivos", "Curva de aprendizaje"],
            ["Kits comerciales (Philips Hue, Nest, SmartThings)", "Fáciles de configurar, con soporte y control por voz", "Más caros y atados al fabricante"],
            ["Sistemas profesionales (Control4, Crestron, Lutron)", "Muy robustos, con soporte técnico", "Costo alto e instalación especializada"],
            ["Asistentes de voz (Alexa, Google)", "Control natural por voz", "Requieren dispositivos compatibles; preocupaciones de privacidad"],
            ["Nube (IFTTT, Zapier)", "Sin programar; ideal para empezar", "Dependen de Internet; automatizaciones simples"],
          ],
        },
        { type: "p", text: "Para avanzar paso a paso, el curso propone **cuatro niveles** de instalación:" },
        { type: "diagram", name: "levels" },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena los niveles de instalación del más sencillo al más avanzado.",
        items: [
          "Básica: teléfono móvil + dispositivos ZigBee con una app",
          "Media: se agrega un altavoz inteligente y dispositivos Wi-Fi",
          "Media-alta: se agrega un hub con pantalla, como Nest Hub",
          "Alta: servidor propio en Raspberry Pi o mini-PC",
        ],
        explanation: "Cada nivel **reutiliza** lo del anterior: no hay que tirar nada para crecer.",
      },
    },
  ],
  quiz: [
    { q: "¿Cuál es la mejor definición de Internet de las Cosas?", options: ["Un tipo de red Wi-Fi para casas", "La interconexión digital de objetos cotidianos con Internet", "Un programa para automatizar la casa", "Un estándar exclusivo de Google"], answer: 1, explanation: "El IoT es la conexión de objetos cotidianos a Internet para que intercambien datos." },
    { q: "¿Qué afirmación sobre IoT y domótica es correcta?", options: ["Son exactamente lo mismo", "Todo dispositivo IoT es domótico", "La domótica es un subconjunto del IoT aplicado a la vivienda", "La domótica no usa Internet en ningún caso"], answer: 2, explanation: "La domótica aplica el IoT a la automatización del hogar; el IoT es más amplio." },
    { q: "Un reloj inteligente que mide el ritmo cardíaco es…", options: ["IoT, pero no domótica", "Domótica, pero no IoT", "Ambas cosas", "Ninguna de las dos"], answer: 0, explanation: "Está conectado (IoT) pero no automatiza ninguna función de la vivienda." },
    { q: "¿Cuál de estos es un actuador?", options: ["Sensor de temperatura", "Sensor de apertura de puerta", "Interruptor inteligente de la luz", "Detector de movimiento"], answer: 2, explanation: "Un actuador modifica el entorno; el interruptor enciende o apaga la luz." },
    { q: "¿Qué ejemplo corresponde a la gestión de recursos en una escuela?", options: ["Wearables en educación física", "Riego inteligente según la humedad del suelo", "Clickers para encuestas en clase", "Etiquetas RFID en libros"], answer: 1, explanation: "El riego inteligente optimiza el uso del agua, un recurso del centro." },
    { q: "¿Cuál es una desventaja del enfoque DIY con ESP32?", options: ["Es muy caro", "No se puede personalizar", "Requiere conocimientos de programación y electrónica", "Solo funciona con Alexa"], answer: 2, explanation: "El ESP32 es barato y flexible, pero exige saber programar y montar circuitos; además, los montajes caseros suelen ser menos fiables a largo plazo." },
    { q: "¿Qué enfoque centraliza la gestión con software como Home Assistant, openHAB o Domoticz?", options: ["Kits comerciales", "Raspberry Pi con software de domótica", "IFTTT", "Sistemas profesionales"], answer: 1, explanation: "Una Raspberry Pi actúa como hub central ejecutando ese software." },
    { q: "¿Qué distingue al nivel de instalación «alto»?", options: ["Usa solo el teléfono móvil", "Agrega un altavoz inteligente", "Se ejecuta en una Raspberry Pi o un mini-PC", "Usa únicamente Wi-Fi"], answer: 2, explanation: "El nivel alto tiene un servidor propio (Raspberry Pi o mini-PC) con software como Home Assistant." },
    { q: "¿Cuál es una desventaja de soluciones en la nube como IFTTT o Zapier?", options: ["Requieren programar en C", "Dependen de la conexión a Internet", "Son exclusivas de profesionales", "Solo funcionan con ZigBee"], answer: 1, explanation: "Si cae Internet, las automatizaciones en la nube dejan de funcionar; además, son relativamente simples." },
    { q: "¿Qué nivel incorpora por primera vez un hub con pantalla, como Google Nest Hub?", options: ["Básico", "Medio", "Medio-alto", "Alto"], answer: 2, explanation: "El nivel medio-alto añade un hub con pantalla para controlar todo desde ella." },
  ],
};
