export default {
  id: "protocolos-red",
  title: "Protocolos de red",
  short: "Wi-Fi, ZigBee, Z-Wave, Bluetooth, Thread y LoRaWAN: cómo viajan los datos y cuándo usar cada uno.",
  intro:
    "Elegir mal el protocolo es el error más caro en domótica: obliga a cambiar dispositivos. Aquí aprenderás a separar la red de la mensajería y a escoger la tecnología adecuada para cada aparato.",
  objectives: [
    "Diferenciar un protocolo de red de uno de mensajería.",
    "Describir Wi-Fi, ZigBee, Z-Wave, Bluetooth, Thread y LoRaWAN.",
    "Elegir el protocolo correcto según consumo, alcance y datos.",
    "Reconocer que IFTTT y Matter no son protocolos de red.",
  ],
  sections: [
    {
      title: "Red y mensajería: dos capas distintas",
      blocks: [
        { type: "p", text: "Los **protocolos de red** definen cómo se transmiten los datos y cómo se conectan físicamente los dispositivos. Trabajan en las capas bajas del modelo OSI: **física** (radio, cable), **enlace de datos** (acceso al medio, detección de errores) y **red** (direccionamiento, enrutamiento)." },
        { type: "p", text: "Los **protocolos de mensajería** trabajan en la **capa de aplicación**: organizan y entregan los mensajes entre dispositivos sin importar qué red haya debajo." },
        { type: "diagram", name: "osi" },
        { type: "callout", variant: "tip", text: "Resumen: **la red establece la conexión; la mensajería gestiona el intercambio** una vez conectados. Un sensor puede usar ZigBee como red y, ya dentro de Home Assistant, publicar sus datos por MQTT." },
      ],
      exercise: {
        type: "classify",
        prompt: "Clasifica cada protocolo según su capa.",
        categories: ["Protocolo de red", "Protocolo de mensajería"],
        items: [
          { text: "Wi-Fi", category: "Protocolo de red" },
          { text: "MQTT", category: "Protocolo de mensajería" },
          { text: "ZigBee", category: "Protocolo de red" },
          { text: "HTTP/HTTPS", category: "Protocolo de mensajería" },
          { text: "Z-Wave", category: "Protocolo de red" },
          { text: "CoAP", category: "Protocolo de mensajería" },
          { text: "LoRaWAN", category: "Protocolo de red" },
        ],
        explanation: "MQTT, HTTP y CoAP son de **aplicación**: viajan encima de cualquier red. Wi-Fi, ZigBee, Z-Wave y LoRaWAN definen **cómo** se mueven los bits.",
      },
    },
    {
      title: "Wi-Fi y Bluetooth",
      blocks: [
        { type: "p", text: "**Wi-Fi** está en casi todas las casas. Es ideal para dispositivos que mueven muchos datos: **cámaras, altavoces inteligentes y algunos electrodomésticos**. Cada dispositivo se conecta directamente al router." },
        { type: "list", items: ["**A favor:** enorme variedad de productos y precios bajos; no necesita bridge.", "**En contra:** consume más energía (casi siempre requiere estar enchufado), no forma malla de forma nativa y muchos dispositivos pueden saturar el router.", "Para cubrir áreas grandes hacen falta **repetidores o extensores**."] },
        { type: "p", text: "**Bluetooth (BLE)** tiene corto alcance y bajo consumo. En el curso lo usa el localizador de llaves Tile, que se comunica con el teléfono." },
      ],
      exercise: {
        type: "choice",
        prompt: "Vas a instalar una cámara de vigilancia que transmite vídeo en vivo. ¿Qué protocolo de red conviene?",
        options: ["ZigBee", "Wi-Fi", "LoRaWAN", "Bluetooth"],
        answer: 1,
        explanation: "El vídeo necesita **mucho ancho de banda**. ZigBee y LoRaWAN están pensados para paquetes pequeños; Bluetooth tiene poco alcance. Por eso la cámara SONOFF del curso va por Wi-Fi.",
      },
    },
    {
      title: "Redes en malla: ZigBee, Z-Wave y Thread",
      blocks: [
        { type: "p", text: "En una **red en malla** cada dispositivo alimentado puede reenviar mensajes de otros, así la cobertura crece con cada aparato que agregas." },
        {
          type: "table",
          head: ["", "ZigBee", "Z-Wave", "Thread"],
          rows: [
            ["Frecuencia típica", "2.4 GHz", "Sub-GHz (≈ 908 MHz en América, 868 MHz en Europa)", "2.4 GHz"],
            ["Topología", "Malla", "Malla", "Malla basada en IPv6"],
            ["Consumo", "Muy bajo", "Muy bajo", "Muy bajo"],
            ["Destaca por", "Estándar abierto, barato, muchísimos dispositivos", "Poca interferencia con Wi-Fi; buena interoperabilidad", "Base de muchos dispositivos Matter"],
          ],
        },
        { type: "callout", variant: "info", title: "Ampliación: ¿y Matter?", text: "**Matter** no es una red: es un estándar de interoperabilidad de **capa de aplicación** que funciona sobre Wi-Fi, Thread y Ethernet. Su objetivo es que un mismo dispositivo funcione con Google, Apple, Amazon y Home Assistant. Algunos productos SONOFF ya se venden en versión Matter." },
      ],
      exercise: {
        type: "choice",
        prompt: "Necesitas un sensor de puerta que funcione con pila durante más de un año. ¿Qué tecnología eliges?",
        options: ["Wi-Fi, porque está en todas las casas", "ZigBee, por su bajo consumo y la malla", "HTTP, porque es universal", "Ethernet cableado"],
        answer: 1,
        explanation: "Un sensor a pila necesita **bajo consumo**: ZigBee (o Z-Wave/Thread) permite que el sensor duerma y despierte solo para avisar. HTTP ni siquiera es un protocolo de red.",
      },
    },
    {
      title: "Largo alcance con LoRaWAN, y lo que no es un protocolo",
      blocks: [
        { type: "p", text: "**LoRaWAN** es una red de área amplia y baja potencia (LPWAN). Envía **pocos datos a varios kilómetros** con muy poco consumo: perfecta para sensores en campo, tanques, estacionamientos o huertos lejanos." },
        { type: "callout", variant: "warn", title: "IFTTT no es un protocolo", text: "**IFTTT (If This Then That)** es un servicio web que encadena acciones simples entre servicios y dispositivos (*applets*). No define cómo viajan los datos; usa la conexión a Internet que ya existe." },
        {
          type: "table",
          head: ["Necesidad", "Protocolo sugerido"],
          rows: [
            ["Vídeo o audio", "Wi-Fi"],
            ["Sensores a pila dentro de casa", "ZigBee, Z-Wave o Thread"],
            ["Sensor a kilómetros de distancia", "LoRaWAN"],
            ["Objeto cercano al teléfono", "Bluetooth"],
          ],
        },
      ],
      exercise: {
        type: "classify",
        prompt: "Asigna el protocolo de red más adecuado a cada caso.",
        categories: ["Wi-Fi", "ZigBee", "LoRaWAN", "Bluetooth"],
        items: [
          { text: "Sensor de nivel de un tanque de agua a 3 km del pueblo", category: "LoRaWAN" },
          { text: "Altavoz que reproduce música en streaming", category: "Wi-Fi" },
          { text: "Sensor de movimiento con pila en el pasillo", category: "ZigBee" },
          { text: "Localizador de llaves que hace sonar el teléfono", category: "Bluetooth" },
          { text: "Cámara que graba al detectar movimiento", category: "Wi-Fi" },
          { text: "Sensor de temperatura con pila en la cocina", category: "ZigBee" },
        ],
        explanation: "Decide con tres preguntas: **¿cuántos datos?, ¿qué tan lejos?, ¿tiene enchufe o pila?**",
      },
    },
  ],
  quiz: [
    { q: "¿En qué capas del modelo OSI se centran los protocolos de red?", options: ["Solo en la de aplicación", "Física, enlace de datos y red", "Presentación y sesión", "Transporte y aplicación"], answer: 1, explanation: "Los protocolos de red se ocupan del medio físico, el acceso al medio y el direccionamiento." },
    { q: "¿Cuál de estos es un protocolo de mensajería?", options: ["ZigBee", "Z-Wave", "MQTT", "LoRaWAN"], answer: 2, explanation: "MQTT es de capa de aplicación y sigue el modelo publicación/suscripción." },
    { q: "¿Qué significa que ZigBee use una red en malla?", options: ["Que todo pasa por el router Wi-Fi", "Que los dispositivos pueden reenviar mensajes de otros y ampliar el alcance", "Que necesita cable", "Que solo admite un dispositivo"], answer: 1, explanation: "En la malla, cada nodo repetidor extiende la red y ofrece rutas alternativas." },
    { q: "¿Por qué Z-Wave sufre menos interferencias con Wi-Fi?", options: ["Porque usa cable", "Porque opera en una frecuencia distinta (sub-GHz)", "Porque es más lento", "Porque cifra los datos"], answer: 1, explanation: "Wi-Fi y ZigBee comparten 2.4 GHz; Z-Wave trabaja por debajo de 1 GHz." },
    { q: "¿Para qué tipo de dispositivo es más adecuado Wi-Fi?", options: ["Sensores a pila", "Dispositivos que requieren mucho ancho de banda, como cámaras", "Sensores a kilómetros de distancia", "Etiquetas RFID"], answer: 1, explanation: "Wi-Fi ofrece gran ancho de banda, a costa de mayor consumo." },
    { q: "¿Qué caracteriza a LoRaWAN?", options: ["Mucho ancho de banda en distancias cortas", "Pocos datos a larga distancia con bajo consumo", "Solo funciona con Google Home", "Es un protocolo de mensajería"], answer: 1, explanation: "LoRaWAN es una LPWAN: largo alcance, poca energía y pocos datos." },
    { q: "¿Qué es IFTTT?", options: ["Un protocolo de red en malla", "Un servicio web para encadenar acciones entre servicios y dispositivos", "Un tipo de sensor", "Un broker MQTT"], answer: 1, explanation: "IFTTT crea *applets* del tipo «si pasa esto, haz aquello»; no es un protocolo." },
    { q: "¿Qué protocolo de mensajería está pensado para dispositivos con recursos limitados y se parece a HTTP?", options: ["CoAP", "Wi-Fi", "Bluetooth", "Thread"], answer: 0, explanation: "CoAP (Constrained Application Protocol) es una versión ligera de la idea de HTTP para IoT." },
    { q: "Matter es…", options: ["Una red de radio de largo alcance", "Un estándar de interoperabilidad de capa de aplicación que funciona sobre Wi-Fi, Thread y Ethernet", "Un tipo de bombilla", "El nombre del broker de Home Assistant"], answer: 1, explanation: "Matter unifica ecosistemas; no sustituye a la red, la usa." },
    { q: "Un inconveniente típico de Wi-Fi frente a ZigBee en domótica es…", options: ["Hay pocos productos Wi-Fi", "Mayor consumo de energía y no forma malla de forma nativa", "No funciona con el router", "Es más caro siempre"], answer: 1, explanation: "Los dispositivos Wi-Fi suelen necesitar enchufe y no repiten la señal entre ellos." },
  ],
};
