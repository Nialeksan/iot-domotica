export default {
  id: "zigbee",
  title: "Redes ZigBee en la práctica",
  short: "Roles de la malla, alcance, materiales y cómo emparejar y organizar los dispositivos de la instalación básica.",
  intro:
    "La instalación básica del curso se arma con ZigBee y la app eWeLink. En este módulo entenderás qué papel juega cada aparato, cómo cubrir toda la casa y cómo emparejarlos y ordenarlos para no perderte cuando tengas decenas.",
  objectives: [
    "Identificar coordinador, router y dispositivo final en una red ZigBee.",
    "Estimar la cobertura y saber cómo ampliarla.",
    "Seguir el flujo de emparejamiento en eWeLink.",
    "Organizar dispositivos por habitaciones con nombres útiles.",
  ],
  sections: [
    {
      title: "Los roles de una red ZigBee",
      blocks: [
        { type: "diagram", name: "zigbee-mesh" },
        { type: "list", items: [
          "**Gateway / coordinador (ZigBee Bridge):** es único. Crea la red, da permiso a los dispositivos para unirse y hace de intermediario con el router Wi-Fi de la casa.",
          "**Router o repetidor:** reenvía la señal de los demás. En general, los dispositivos **alimentados por la red eléctrica** (enchufes, bombillas) pueden hacer de router.",
          "**Dispositivo final:** el más simple. No reenvía nada; habla solo con un router o con el coordinador y puede **dormir** para ahorrar pila. Son sensores (temperatura, movimiento) o actuadores sencillos.",
          "**App:** desde el teléfono se configura y controla toda la red.",
        ] },
        { type: "callout", variant: "info", text: "Ojo: no todos los aparatos enchufados repiten. El interruptor SONOFF **ZBMINI L2** funciona sin cable neutro y, por eso, **no** actúa como router. Revisa siempre la ficha técnica." },
      ],
      exercise: {
        type: "classify",
        prompt: "¿Qué papel cumple cada dispositivo en la red?",
        categories: ["Coordinador", "Router", "Dispositivo final"],
        items: [
          { text: "SONOFF ZB Bridge Pro", category: "Coordinador" },
          { text: "Enchufe inteligente ZigBee", category: "Router" },
          { text: "Sensor de puerta SNZB-04 con pila", category: "Dispositivo final" },
          { text: "Dongle ZigBee 3.0 USB conectado a Home Assistant", category: "Coordinador" },
          { text: "Sensor de temperatura SNZB-02 con pila", category: "Dispositivo final" },
          { text: "Bombilla ZigBee conectada a la corriente", category: "Router" },
        ],
        explanation: "Regla rápida: **uno** crea la red (coordinador), los **enchufados** suelen repetir (routers) y los **de pila** duermen (finales).",
      },
    },
    {
      title: "Alcance y cobertura",
      blocks: [
        { type: "p", text: "Sin repetidores, la cobertura ZigBee en una casa ronda los **10 a 20 metros**; en espacios abiertos puede llegar a **100 metros**. Muros gruesos, losas y metal la reducen." },
        { type: "list", items: [
          "Coloca el bridge en un punto **central** de la casa (en el curso, en el salón).",
          "Si un sensor queda lejos, agrega un **router** (por ejemplo, un enchufe ZigBee) a medio camino.",
          "ZigBee y Wi-Fi comparten la banda de **2.4 GHz**: alejar el bridge unos metros del router evita interferencias.",
        ] },
        { type: "p", text: "Una ventaja extra: ZigBee soporta **más dispositivos** que una red Wi-Fi doméstica sin saturarla, y sus comunicaciones van cifradas con **AES de 128 bits**." },
      ],
      exercise: {
        type: "choice",
        prompt: "El sensor de puerta del garaje se desconecta a cada rato; está a 25 m del bridge con dos muros de por medio. ¿Qué haces?",
        options: [
          "Cambiar el sensor por uno Wi-Fi idéntico",
          "Poner un enchufe ZigBee (router) a medio camino entre el bridge y el garaje",
          "Acercar el router Wi-Fi al garaje",
          "Agregar otro bridge ZigBee junto al primero",
        ],
        answer: 1,
        explanation: "Un **router ZigBee** intermedio extiende la malla. Dos coordinadores crearían dos redes separadas, y un sensor Wi-Fi gastaría mucho más pila.",
      },
    },
    {
      title: "Materiales y emparejamiento",
      blocks: [
        {
          type: "table",
          head: ["#", "Dispositivo", "Categoría", "Precio (mar. 2024)"],
          rows: [
            ["1", "SONOFF ZB Bridge Pro (adaptador Wi-Fi ↔ ZigBee)", "Gateway", "20,00 €"],
            ["2", "Interruptor inteligente ZBMINI L2", "Actuador", "15,99 €"],
            ["3", "Sensor de movimiento SNZB-03", "Sensor", "8,99 €"],
            ["4", "Sensor de puerta/ventana SNZB-04", "Sensor", "8,40 €"],
            ["5", "Sensor de temperatura y humedad SNZB-02", "Sensor", "9,90 €"],
            ["6", "Pulsador multifunción SNZB-01", "Actuador", "18,47 €"],
          ],
        },
        { type: "p", text: "Total: **81,75 €**. Los precios son los de la guía original (España); en México busca los mismos modelos y verifica que digan **ZigBee** en la caja, porque muchos existen también en Wi-Fi, Matter o 433 MHz." },
        { type: "h", text: "Flujo de emparejamiento en eWeLink" },
        { type: "p", text: "Primero se vincula el bridge a la red Wi-Fi (botón presionado unos 7 segundos con un clip hasta que el LED azul parpadee). Después, **cada dispositivo ZigBee se agrega desde el propio ZBBridge**, nunca desde «Añadir dispositivo» general." },
        { type: "callout", variant: "tip", text: "Ten paciencia: la búsqueda puede tardar unos minutos. Si no aparece, vuelve a poner el sensor en modo emparejamiento (LED parpadeando)." },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena los pasos para agregar el sensor de temperatura a la instalación.",
        items: [
          "Instalar eWeLink, registrarse y vincular el ZBBridge a la red Wi-Fi",
          "Abrir el sensor y colocar la pila",
          "Mantener presionado el botón del sensor hasta que el LED rojo parpadee",
          "En la app, entrar a «ZBBridge» y tocar «Añadir»",
          "Esperar a que aparezca el dispositivo y tocar «Siguiente»",
          "Renombrarlo y asignarle la habitación «Cocina»",
        ],
        explanation: "Sin bridge no hay red, y sin modo emparejamiento el bridge no ve el sensor. **Renombrar y ubicar** al final te ahorra confusiones cuando tengas varios sensores iguales.",
      },
    },
    {
      title: "Organizar: habitaciones y nombres",
      blocks: [
        { type: "p", text: "Decide desde el principio dónde irá cada aparato. Así, cuando tengas tres sensores de temperatura, sabrás cuál es cuál." },
        {
          type: "table",
          head: ["Dispositivo", "Ubicación"],
          rows: [
            ["Adaptador Wi-Fi ZigBee", "Salón"],
            ["Sensor de puerta SNZB-04", "Puerta de entrada"],
            ["Interruptor inteligente", "Dormitorio principal"],
            ["Pulsador SNZB-01", "Dormitorio principal"],
            ["Sensor de temperatura y humedad SNZB-02", "Cocina"],
            ["Sensor de movimiento SNZB-03", "Pasillo"],
          ],
        },
        { type: "list", items: [
          "En eWeLink: menú de tres puntos → **Administrar habitaciones** → Añadir; y en cada dispositivo → **Asignar ubicación**.",
          "Borra las habitaciones que vienen por defecto en inglés.",
          "Usa nombres **descriptivos y pronunciables**: los usarás después con el asistente de voz.",
        ] },
      ],
      exercise: {
        type: "choice",
        prompt: "¿Qué nombre es mejor para el sensor de temperatura de la cocina?",
        options: ["SNZB-02 #2", "Sensor 3", "Sensor temperatura cocina", "ZB_TH_0x4F2A"],
        answer: 2,
        explanation: "Un nombre que dice **qué es y dónde está** sirve en la app, en las automatizaciones y en frases como «Ok Google, dime la temperatura del sensor de la cocina».",
      },
    },
  ],
  quiz: [
    { q: "¿Qué hace el gateway o coordinador de una red ZigBee?", options: ["Solo mide temperatura", "Crea la red, admite dispositivos y la conecta con el router Wi-Fi", "Repite la señal de los sensores", "Duerme para ahorrar pila"], answer: 1, explanation: "El coordinador es único: crea la red y es el puente hacia la red de la casa." },
    { q: "¿Cuál es la función de un router (repetidor) ZigBee?", options: ["Crear una red nueva", "Reenviar la señal para ampliar la cobertura", "Conectar a Internet por cable", "Mostrar la app"], answer: 1, explanation: "Los routers repiten mensajes y dan rutas alternativas en la malla." },
    { q: "¿Qué caracteriza a un dispositivo final?", options: ["Reenvía mensajes de todos", "Puede entrar en modo de bajo consumo y no repite señales", "Siempre está enchufado", "Hay solo uno por red"], answer: 1, explanation: "Los dispositivos finales, normalmente a pila, duermen y solo despiertan cuando lo necesitan." },
    { q: "Sin repetidores, ¿qué cobertura aproximada tiene ZigBee dentro de una casa?", options: ["1 a 2 metros", "10 a 20 metros", "500 metros", "5 kilómetros"], answer: 1, explanation: "Entre 10 y 20 m en interiores; en exteriores, hasta unos 100 m." },
    { q: "¿Qué tipo de dispositivos suelen actuar como routers ZigBee?", options: ["Los alimentados por la red eléctrica, como enchufes", "Los sensores con pila", "El teléfono móvil", "Los altavoces Wi-Fi"], answer: 0, explanation: "Al no depender de una pila pueden estar siempre despiertos reenviando mensajes (con excepciones como el ZBMINI L2)." },
    { q: "¿Dónde se agregan los dispositivos ZigBee en eWeLink?", options: ["En «Añadir dispositivo» con emparejamiento por sonido", "Dentro del ZBBridge, con «Añadir»", "En Google Home", "No se pueden agregar desde la app"], answer: 1, explanation: "Los dispositivos ZigBee se emparejan a través del bridge." },
    { q: "¿Cómo se pone en modo emparejamiento el sensor SNZB-02?", options: ["Desenchufándolo", "Manteniendo presionado su botón lateral hasta que el LED parpadee", "Acercándolo al router", "Escaneando un código QR"], answer: 1, explanation: "El parpadeo del LED indica que está listo para ser encontrado." },
    { q: "¿Por qué conviene asignar una habitación a cada dispositivo?", options: ["Para que consuma menos", "Para identificar fácilmente cuál es cuál cuando hay varios iguales", "Porque si no, no funciona", "Para cambiar de protocolo"], answer: 1, explanation: "La ubicación permite distinguir, por ejemplo, el sensor de la cocina del del dormitorio." },
    { q: "¿Qué cifrado utiliza ZigBee en sus comunicaciones?", options: ["Ninguno", "AES de 128 bits", "WEP", "Solo una contraseña de 4 dígitos"], answer: 1, explanation: "ZigBee cifra con AES-128." },
    { q: "Al comprar un dispositivo SONOFF, ¿qué debes revisar?", options: ["El color de la caja", "El logotipo del protocolo: Wi-Fi, ZigBee, Matter o 433 MHz", "Que pese menos de 100 g", "Que traiga cable USB-C"], answer: 1, explanation: "Un mismo modelo puede existir en varias tecnologías; solo la versión ZigBee se empareja con el bridge." },
  ],
};
