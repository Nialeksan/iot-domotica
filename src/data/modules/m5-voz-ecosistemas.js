export default {
  id: "voz-ecosistemas",
  title: "Asistentes de voz y ecosistemas",
  short: "Nivel medio: Google Home, Nest Mini, dispositivos Wi-Fi de otras marcas, rutinas y comandos de voz.",
  intro:
    "El nivel medio mezcla ZigBee con Wi-Fi y suma un altavoz inteligente. Aprenderás cómo se conectan los ecosistemas entre sí, qué se puede (y qué no) controlar por voz y cómo crear rutinas en Google Home.",
  objectives: [
    "Explicar la arquitectura ZigBee + Wi-Fi y sus ventajas.",
    "Vincular eWeLink con Google Home (integración de nube a nube).",
    "Integrar dispositivos de otros fabricantes: Smart Life, Tile y la cámara.",
    "Crear rutinas y elegir el activador adecuado.",
  ],
  sections: [
    {
      title: "Arquitectura ZigBee + Wi-Fi",
      blocks: [
        { type: "diagram", name: "zigbee-wifi" },
        {
          type: "table",
          head: ["ZigBee aporta…", "Wi-Fi aporta…", "Juntos…"],
          rows: [
            ["Diseño específico para domótica", "Conexión directa al router", "Más cobertura y fiabilidad"],
            ["Bajo consumo para pilas", "Gran variedad de productos", "Eliges el protocolo ideal para cada aparato"],
            ["Malla y cifrado AES-128", "Precios bajos", "Optimizas energía y uso de la red"],
          ],
        },
      ],
      exercise: {
        type: "classify",
        prompt: "¿Cómo llega cada dispositivo del nivel medio a la red de la casa?",
        categories: ["A través del ZBBridge", "Directo al router Wi-Fi", "Por Bluetooth al teléfono"],
        items: [
          { text: "Sensor de puerta SNZB-04", category: "A través del ZBBridge" },
          { text: "Cámara SONOFF 360°", category: "Directo al router Wi-Fi" },
          { text: "Bombilla RGB Antela (Smart Life)", category: "Directo al router Wi-Fi" },
          { text: "Sensor de movimiento SNZB-03", category: "A través del ZBBridge" },
          { text: "Altavoz Google Nest Mini", category: "Directo al router Wi-Fi" },
          { text: "Localizador de llaves Tile", category: "Por Bluetooth al teléfono" },
        ],
        explanation: "Los dispositivos Wi-Fi siguen funcionando aunque el bridge falle, pero tienen menos alcance y necesitan corriente.",
      },
    },
    {
      title: "Google Home y el Nest Mini",
      blocks: [
        { type: "p", text: "La app **Google Home** configura el **Nest Mini** (Agregar dispositivo → Dispositivo de Google Nest o de socios → habitación → Wi-Fi → Voice Match). Conviene tener uno en varias zonas de la casa." },
        { type: "p", text: "Para controlar los dispositivos ZigBee por voz se vincula la **cuenta de eWeLink** en Google Home: Agregar → **Funciona con Google Home** → buscar «eWeLink Smart Home» → Enlazar. Es una integración **de nube a nube**: Google habla con los servidores de eWeLink, no directamente con tus sensores." },
        { type: "callout", variant: "warn", title: "Limitaciones", text: "El bridge ZigBee debe estar conectado. Además, **no** todo es consultable por voz: el sensor de puerta y el de movimiento no responden a «¿está abierta la puerta?», y la cámara SONOFF **no aparece** en Google Home porque depende del servidor de eWeLink." },
        { type: "p", text: "Ejemplos: «Ok Google, enciende el interruptor del dormitorio», «Ok Google, dime la humedad del sensor de la cocina». Recuerda: hay que decir el **nombre exacto** del dispositivo." },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena los pasos para controlar por voz los dispositivos ZigBee.",
        items: [
          "Configurar el Nest Mini en la app Google Home",
          "Comprobar que el ZBBridge está encendido y conectado",
          "En Google Home: Agregar → «Funciona con Google Home»",
          "Buscar «eWeLink Smart Home», continuar y enlazar la cuenta",
          "Asignar cada dispositivo importado a su habitación",
          "Probar: «Ok Google, enciende el interruptor del dormitorio»",
        ],
        explanation: "Sin altavoz no hay voz, y sin bridge conectado Google no ve los dispositivos ZigBee.",
      },
    },
    {
      title: "Dispositivos de otros fabricantes",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Bombilla RGB (Smart Life)", text: "Se agrega en la app Smart Life (de la plataforma Tuya) con la bombilla parpadeando, y después se enlaza Smart Life en Google Home. Smart Life ofrece más opciones: colores, escenas y modo música." },
            { title: "Localizador Tile (Bluetooth)", text: "Se registra en la app Tile y se vincula en Google Home con la misma cuenta. «Ok Google, ¿dónde están mis llaves?» o «llama a mis llaves»." },
            { title: "Cámara SONOFF (Wi-Fi)", text: "Se agrega en eWeLink con **emparejamiento por sonido**, cerca del router y con microSD. Graba a 720×405 y puede detectar movimiento, pero no se integra en Google Home." },
          ],
        },
        { type: "callout", variant: "tip", text: "Cada fabricante suele tener su propia app. Google Home actúa como **paraguas**: une varias apps en un solo lugar, aunque con menos funciones que cada app original." },
      ],
      exercise: {
        type: "choice",
        prompt: "¿Por qué la cámara SONOFF no se puede usar desde Google Home en esta instalación?",
        options: [
          "Porque usa ZigBee",
          "Porque se conecta a través del servidor de eWeLink, que no expone la cámara a Google Home",
          "Porque no tiene tarjeta microSD",
          "Porque Google Home no admite cámaras de ningún tipo",
        ],
        answer: 1,
        explanation: "La integración de eWeLink con Google no incluye este modelo de cámara. En el módulo 6 la integrarás en Home Assistant mediante **RTSP**.",
      },
    },
    {
      title: "Rutinas en Google Home",
      blocks: [
        { type: "p", text: "Una **rutina** encadena muchas acciones a partir de un activador. Hay rutinas de **Grupo familiar** (de la casa) y **Personales** (de tu cuenta)." },
        {
          type: "table",
          head: ["Activador", "Disponible en"],
          rows: [
            ["Cuando le hablo al asistente", "Todas las rutinas"],
            ["En un horario determinado", "Todas las rutinas"],
            ["Al amanecer o al atardecer", "Todas las rutinas"],
            ["Cuando un dispositivo haga algo", "Solo Grupo familiar"],
            ["Cuando se descarta una alarma", "Solo Personales"],
            ["Cuando llego o me voy de una ubicación", "Solo Personales"],
          ],
        },
        { type: "p", text: "Ejemplo del curso: activador «Sensor movimiento pasillo detecta movimiento» → acciones «Activar interruptor del pasillo» + «Comunicarte y hacer anuncios: Luz del pasillo encendida». Y otra rutina para apagarla." },
      ],
      exercise: {
        type: "classify",
        prompt: "¿En qué tipo de rutina está disponible cada activador?",
        categories: ["Todas las rutinas", "Solo Grupo familiar", "Solo Personales"],
        items: [
          { text: "Cuando un dispositivo haga algo", category: "Solo Grupo familiar" },
          { text: "Cuando llego o me voy de una ubicación", category: "Solo Personales" },
          { text: "En un horario determinado", category: "Todas las rutinas" },
          { text: "Cuando se descarta una alarma", category: "Solo Personales" },
          { text: "Al amanecer o al atardecer", category: "Todas las rutinas" },
          { text: "Cuando le hablo al asistente", category: "Todas las rutinas" },
        ],
        explanation: "Los activadores ligados a **tu persona** (ubicación, alarma) son personales; los ligados a **la casa** (un sensor) son del grupo familiar.",
      },
    },
  ],
  quiz: [
    { q: "¿Qué ventaja tienen los dispositivos Wi-Fi si el ZBBridge falla?", options: ["Ninguna, también dejan de funcionar", "Siguen funcionando porque se conectan directo al router", "Se convierten en ZigBee", "Repiten la señal ZigBee"], answer: 1, explanation: "No dependen del bridge para comunicarse." },
    { q: "¿Qué opción de Google Home permite vincular la cuenta de eWeLink?", options: ["Dispositivo de Google Nest o de socios", "Funciona con Google Home", "Voice Match", "Emparejamiento por sonido"], answer: 1, explanation: "Desde «Funciona con Google Home» se buscan y enlazan servicios de terceros." },
    { q: "¿Qué condición es necesaria para que Google Home vea los dispositivos ZigBee?", options: ["Que el Nest Mini esté en la cocina", "Que la puerta de enlace ZigBee esté conectada", "Que la cámara esté encendida", "Que el teléfono tenga Bluetooth"], answer: 1, explanation: "El bridge es la puerta de entrada de los dispositivos ZigBee." },
    { q: "¿Qué dispositivo de la instalación no puede consultarse por voz sobre su estado actual?", options: ["El sensor de temperatura", "El sensor de puerta de entrada", "La bombilla RGB", "El interruptor del dormitorio"], answer: 1, explanation: "El curso indica que los sensores de puerta y de movimiento no responden a consultas de estado por voz." },
    { q: "¿Con qué app se agrega la bombilla RGB Antela?", options: ["eWeLink", "Smart Life", "Tile", "Home Assistant Companion"], answer: 1, explanation: "La bombilla pertenece al ecosistema Tuya / Smart Life." },
    { q: "¿Qué tecnología usa el localizador Tile?", options: ["ZigBee", "Bluetooth", "LoRaWAN", "Z-Wave"], answer: 1, explanation: "Tile se comunica con el teléfono por Bluetooth." },
    { q: "¿Qué método se usa para emparejar la cámara SONOFF en eWeLink?", options: ["Emparejamiento por sonido", "Código NFC", "Cable Ethernet", "A través del ZBBridge"], answer: 0, explanation: "La cámara se configura con tonos emitidos por el teléfono, cerca del router." },
    { q: "¿Qué activador de rutina solo existe en las rutinas de Grupo familiar?", options: ["En un horario determinado", "Cuando un dispositivo haga algo", "Cuando se descarta una alarma", "Al amanecer"], answer: 1, explanation: "Los activadores basados en dispositivos del hogar pertenecen al grupo familiar." },
    { q: "Para usar un dispositivo con comandos de voz, ¿qué es importante recordar?", options: ["Su dirección IP", "Su nombre tal como aparece en Google Home", "Su número de serie", "Su frecuencia de radio"], answer: 1, explanation: "El asistente identifica cada dispositivo por su nombre." },
    { q: "Además de encender la luz, ¿qué acción agrega el ejercicio de rutina del pasillo?", options: ["Grabar vídeo", "Que el altavoz anuncie «Luz del pasillo encendida»", "Enviar un correo", "Bajar las persianas"], answer: 1, explanation: "Usa la acción «Comunicarte y hacer anuncios» con el altavoz." },
  ],
};
