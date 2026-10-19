export default {
  id: "mqtt-rtsp",
  title: "MQTT y RTSP",
  short: "Publicación/suscripción, temas, comodines, QoS y broker; además, cámaras por RTSP en Home Assistant.",
  intro:
    "MQTT es el idioma común de miles de dispositivos IoT y RTSP el de las cámaras IP. Dominar ambos te permite integrar casi cualquier cosa en Home Assistant, incluso dispositivos que tú mismo programes con un ESP32.",
  objectives: [
    "Explicar el modelo publicación/suscripción y el papel del broker.",
    "Diseñar temas y usar los comodines `+` y `#`.",
    "Elegir el nivel de QoS adecuado y entender retain y LWT.",
    "Integrar una cámara con su URL RTSP.",
  ],
  sections: [
    {
      title: "Publicar, suscribirse y el broker",
      blocks: [
        { type: "p", text: "**MQTT** es un protocolo de mensajería ligero, pensado para dispositivos con pocos recursos y poco ancho de banda. Nació como *MQ Telemetry Transport* y hoy el nombre ya no se considera un acrónimo. Es la base de mucha comunicación **máquina a máquina (M2M)**." },
        { type: "diagram", name: "mqtt" },
        { type: "list", items: [
          "**Publicar:** un cliente envía un mensaje a un **tema**.",
          "**Suscribirse:** un cliente declara qué temas le interesan.",
          "**Mensaje:** el contenido; puede ser un comando (`ON`) o un dato (`23.5`).",
          "**Broker:** recibe todos los mensajes, filtra quién está interesado y los reparte. El más usado es **Mosquitto**, que puede correr en la misma Raspberry Pi.",
        ] },
        { type: "callout", variant: "tip", text: "Publicador y suscriptor **no se conocen**: solo hablan con el broker. Por eso puedes agregar un panel nuevo sin tocar el ESP32 de la lámpara." },
      ],
      exercise: {
        type: "choice",
        prompt: "Home Assistant publica `ON` en `home/office/lamp`. ¿Quién decide qué dispositivos reciben ese mensaje?",
        options: [
          "Home Assistant, enviándolo a cada IP",
          "El broker, según las suscripciones activas a ese tema",
          "El router Wi-Fi",
          "El ESP32, preguntando cada segundo",
        ],
        answer: 1,
        explanation: "El **broker** mantiene la lista de suscripciones y reenvía cada mensaje a los clientes interesados.",
      },
    },
    {
      title: "Temas y comodines",
      blocks: [
        { type: "p", text: "Un **tema** es una cadena con niveles separados por `/`, del más general al más específico: `casa/cocina/temperatura`." },
        {
          type: "table",
          head: ["Comodín", "Significa", "Ejemplo", "Coincide con"],
          rows: [
            ["`+`", "Exactamente **un** nivel", "`casa/+/temperatura`", "`casa/salon/temperatura`, `casa/cocina/temperatura`"],
            ["`#`", "**Cero o más** niveles; solo al final", "`casa/cocina/#`", "`casa/cocina`, `casa/cocina/humedad`, `casa/cocina/luz/brillo`"],
          ],
        },
        { type: "list", items: [
          "Los comodines solo se usan para **suscribirse**, nunca para publicar.",
          "Los temas distinguen **mayúsculas y minúsculas**: `Casa` ≠ `casa`.",
          "Evita espacios y no empieces con `/`: crea un nivel vacío innecesario.",
        ] },
      ],
      exercise: {
        type: "mqtt",
        prompt: "Laboratorio de comodines: escribe un filtro de suscripción que reciba exactamente los temas que pide cada reto.",
        topics: [
          "casa/salon/luz",
          "casa/salon/temperatura",
          "casa/cocina/temperatura",
          "casa/cocina/humedad",
          "casa/dormitorio/luz",
          "casa/dormitorio/luz/brillo",
          "oficina/lampara",
        ],
        challenges: [
          { goal: "Recibe la temperatura de **todas** las habitaciones de la casa.", expected: ["casa/salon/temperatura", "casa/cocina/temperatura"] },
          { goal: "Recibe **todo** lo que publica la cocina.", expected: ["casa/cocina/temperatura", "casa/cocina/humedad"] },
          { goal: "Recibe la luz del dormitorio **y** todos sus subtemas.", expected: ["casa/dormitorio/luz", "casa/dormitorio/luz/brillo"] },
          { goal: "Recibe **absolutamente todo** lo que pasa por el broker.", expected: ["casa/salon/luz", "casa/salon/temperatura", "casa/cocina/temperatura", "casa/cocina/humedad", "casa/dormitorio/luz", "casa/dormitorio/luz/brillo", "oficina/lampara"] },
        ],
      },
    },
    {
      title: "Calidad de servicio, retain y LWT",
      blocks: [
        { type: "p", text: "MQTT ofrece **tres niveles de calidad de servicio (QoS)**, que equilibran fiabilidad y tráfico:" },
        {
          type: "table",
          head: ["QoS", "Garantía", "Cuándo usarlo"],
          rows: [
            ["0", "Como máximo una vez (puede perderse)", "Lecturas frecuentes: si se pierde una, llega otra enseguida"],
            ["1", "Al menos una vez (puede duplicarse)", "Alertas que deben llegar; un duplicado no hace daño"],
            ["2", "Exactamente una vez", "Acciones que no deben repetirse ni perderse"],
          ],
        },
        { type: "list", items: [
          "**Retain:** el broker guarda el último mensaje de un tema y se lo entrega a quien se suscriba después. Útil para estados (`ON`/`OFF`).",
          "**LWT (último deseo):** mensaje que el broker publica si un cliente se desconecta de golpe, por ejemplo `offline`.",
          "**Puertos:** `1883` sin cifrar y `8883` con **TLS**. Usa usuario y contraseña en el broker.",
        ] },
        { type: "p", text: "Ventajas de MQTT en Home Assistant: rapidez, bajo consumo, compatibilidad con relés y sensores de muchas marcas y comunicación **bidireccional**." },
      ],
      exercise: {
        type: "classify",
        prompt: "¿Qué QoS usarías en cada caso?",
        categories: ["QoS 0", "QoS 1", "QoS 2"],
        items: [
          { text: "Temperatura enviada cada 30 segundos", category: "QoS 0" },
          { text: "Alerta de fuga de agua", category: "QoS 1" },
          { text: "Orden de un dispensador de medicamentos que debe entregar una sola dosis", category: "QoS 2" },
          { text: "Nivel de batería informado cada hora", category: "QoS 0" },
          { text: "Aviso de puerta abierta durante la noche", category: "QoS 1" },
        ],
        explanation: "Más QoS significa más mensajes de confirmación. Usa el **mínimo** que cumpla con lo que necesitas.",
      },
    },
    {
      title: "MQTT en Home Assistant con un ESP32",
      blocks: [
        { type: "p", text: "En Home Assistant: Ajustes → Complementos → instalar **Mosquitto broker** → Ajustes → Dispositivos y servicios → integración **MQTT**. A partir de ahí, Home Assistant puede publicar y suscribirse." },
        { type: "p", text: "Un ESP32 que controla la lámpara de la oficina se suscribe a `home/office/lamp` y reacciona a `ON` y `OFF`. Fragmento ilustrativo con la librería PubSubClient de Arduino:" },
        { type: "code", caption: "esp32_lampara.ino (fragmento)", code: "void callback(char* topic, byte* payload, unsigned int len) {\n  String msg;\n  for (unsigned int i = 0; i < len; i++) msg += (char)payload[i];\n  if (msg == \"ON\")  digitalWrite(RELE, HIGH);\n  if (msg == \"OFF\") digitalWrite(RELE, LOW);\n}\n\nvoid conectar() {\n  client.connect(\"esp32-oficina\", \"usuario\", \"clave\");\n  client.subscribe(\"home/office/lamp\");\n}" },
        { type: "callout", variant: "info", text: "Con **ESPHome** no hace falta programar en C++: describes el ESP32 en YAML y Home Assistant lo detecta solo." },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena lo que ocurre desde que tocas el botón en Home Assistant hasta que se enciende la lámpara.",
        items: [
          "El ESP32 se conecta al broker y se suscribe a `home/office/lamp`",
          "Tocas «Encender» en el panel de Home Assistant",
          "Home Assistant publica `ON` en `home/office/lamp`",
          "El broker ve que el ESP32 está suscrito y le reenvía el mensaje",
          "El ESP32 recibe `ON` y activa el relé de la lámpara",
        ],
        explanation: "La **suscripción** debe existir antes de publicar; si no, el mensaje no llega (salvo que se publique con *retain*).",
      },
    },
    {
      title: "RTSP: vídeo en tiempo real",
      blocks: [
        { type: "p", text: "**RTSP (Real Time Streaming Protocol)** es un protocolo de capa de aplicación para controlar la entrega de audio y vídeo en vivo. Nació para telecomunicaciones y entretenimiento, y los fabricantes de videovigilancia lo adoptaron como estándar. El comando exacto de cada cámara viene en su manual." },
        { type: "diagram", name: "rtsp-url" },
        { type: "list", ordered: true, items: [
          "En eWeLink: cámara → tres puntos → Más ajustes → **RTSP**: actívalo, define la contraseña y copia el enlace.",
          "En Home Assistant: Ajustes → Dispositivos y servicios → Añadir integración → **Cámara genérica**.",
          "Pega la URL del flujo, elige transporte **TCP**, autenticación **basic** y la contraseña.",
          "Si la vista previa se ve bien, confirma y agrégala a tu panel de control.",
        ] },
        { type: "callout", variant: "warn", text: "Desde Home Assistant **no se puede mover** esta cámara, la imagen tarda unos segundos en abrir y se refresca cada ~3 s por defecto. Y nunca publiques tu URL RTSP: incluye la contraseña." },
      ],
      exercise: {
        type: "fill",
        prompt: "Analiza la URL `rtsp://rtsp:facil1234@192.168.8.108:554/av_stream/ch0`.",
        blanks: [
          { label: "Puerto que usa la cámara", answers: ["554"], placeholder: "número" },
          { label: "Dirección IP de la cámara", answers: ["192.168.8.108"], placeholder: "IP" },
          { label: "Contraseña incluida en el enlace", answers: ["facil1234"], placeholder: "contraseña" },
        ],
        explanation: "Formato general: `rtsp://usuario:contraseña@IP:puerto/ruta`. El **554** es el puerto estándar de RTSP.",
      },
    },
  ],
  quiz: [
    { q: "¿Qué modelo de comunicación sigue MQTT?", options: ["Cliente-servidor con peticiones GET", "Publicación/suscripción", "Punto a punto por Bluetooth", "Difusión de radio"], answer: 1, explanation: "Los clientes publican en temas y se suscriben a ellos a través de un broker." },
    { q: "¿Cuál es la función del broker MQTT?", options: ["Medir temperatura", "Recibir los mensajes, filtrarlos y entregarlos a los suscriptores interesados", "Crear la red ZigBee", "Grabar vídeo"], answer: 1, explanation: "Es el intermediario central de MQTT." },
    { q: "¿Qué filtro recibe `casa/salon/temperatura` y `casa/cocina/temperatura`, pero no `casa/cocina/humedad`?", options: ["casa/#", "casa/+/temperatura", "+/temperatura", "casa/cocina/+"], answer: 1, explanation: "El `+` sustituye exactamente un nivel." },
    { q: "¿Qué significa el comodín `#`?", options: ["Exactamente un nivel", "Cero o más niveles, y debe ir al final", "Un número", "Un tema privado"], answer: 1, explanation: "`#` abarca el nivel padre y todos los niveles inferiores." },
    { q: "¿Qué nivel de QoS garantiza que un mensaje llegue exactamente una vez?", keepOrder: true, options: ["QoS 0", "QoS 1", "QoS 2", "QoS 3"], answer: 2, explanation: "QoS 2 usa un intercambio de cuatro pasos para evitar pérdidas y duplicados." },
    { q: "¿Qué hace un mensaje con *retain*?", options: ["Se borra al instante", "El broker lo guarda y lo entrega a quien se suscriba después", "Se envía solo por TLS", "Se repite cada minuto"], answer: 1, explanation: "Sirve para que un cliente nuevo conozca el último estado." },
    { q: "¿Qué puerto usa MQTT cifrado con TLS por convención?", options: ["1883", "8883", "8123", "554"], answer: 1, explanation: "1883 es MQTT sin cifrar; 8883 con TLS." },
    { q: "¿Qué broker MQTT se instala habitualmente en la Raspberry Pi con Home Assistant?", options: ["Mosquitto", "Nabu Casa", "Tile", "CallMeBot"], answer: 0, explanation: "Mosquitto está disponible como complemento oficial." },
    { q: "¿Para qué sirve RTSP en una instalación domótica?", options: ["Para enviar notificaciones por WhatsApp", "Para transmitir audio y vídeo en vivo de una cámara", "Para emparejar sensores ZigBee", "Para cifrar MQTT"], answer: 1, explanation: "RTSP controla la entrega de flujos multimedia en tiempo real." },
    { q: "¿Con qué integración se agrega la cámara SONOFF a Home Assistant en el curso?", options: ["ZHA", "Cámara genérica, usando la URL RTSP", "Google Home", "Tuya"], answer: 1, explanation: "La integración «Cámara genérica» acepta la URL del flujo RTSP." },
  ],
};
