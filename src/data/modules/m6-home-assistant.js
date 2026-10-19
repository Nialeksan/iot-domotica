export default {
  id: "home-assistant",
  title: "Home Assistant en Raspberry Pi",
  short: "Nivel avanzado: instalar Home Assistant, recorrer su interfaz, integrar ZigBee y configurar con YAML.",
  intro:
    "Home Assistant convierte una Raspberry Pi en el cerebro de la casa: reúne en un solo lugar dispositivos de muchas marcas y protocolos, sin depender de la nube de cada fabricante. Aquí lo instalarás, aprenderás a moverte por él e integrarás tu red ZigBee.",
  objectives: [
    "Elegir el hardware adecuado e instalar Home Assistant OS.",
    "Acceder por primera vez y ubicar las opciones principales.",
    "Integrar la red ZigBee con un dongle USB (ZHA) y otros dispositivos.",
    "Editar `configuration.yaml` sin romper el arranque.",
  ],
  sections: [
    {
      title: "¿Por qué un servidor propio? Hardware necesario",
      blocks: [
        { type: "diagram", name: "ha-arch" },
        { type: "list", items: [
          "**Raspberry Pi:** una Pi 4 o Pi 5 es lo ideal; la Zero 2 W sirve para instalaciones pequeñas. El curso usa una Pi 4 con 8 GB de RAM.",
          "**Tarjeta microSD:** de buena calidad, **mínimo 16 GB** y Clase 10 / UHS-1 o superior.",
          "**Fuente de alimentación:** la oficial de su modelo. Pi 4: 15 W (5 V, 3 A). La Pi 5 recomienda una de 27 W.",
          "**Red:** de preferencia cable Ethernet al router.",
          "**Opcional:** carcasa con ventilador, monitor y teclado para la primera configuración.",
        ] },
        { type: "callout", variant: "info", title: "Ampliación", text: "Si no quieres armar nada, existe **Home Assistant Green**, un equipo listo para usar. Un mini-PC usado también es una opción muy estable y potente." },
      ],
      exercise: {
        type: "choice",
        prompt: "Vas a instalar Home Assistant en una Raspberry Pi 4. ¿Qué combinación es correcta?",
        options: [
          "microSD de 8 GB cualquiera y cargador de teléfono de 5 W",
          "microSD de 32 GB Clase 10 y fuente de 15 W (5 V, 3 A)",
          "Disco duro externo sin fuente",
          "microSD de 16 GB Clase 4 y conexión solo por Bluetooth",
        ],
        answer: 1,
        explanation: "Al menos **16 GB Clase 10** y la **fuente adecuada**: una fuente débil causa reinicios y corrupción de la tarjeta.",
      },
    },
    {
      title: "Instalación y primer acceso",
      blocks: [
        { type: "p", text: "Con **Raspberry Pi Imager** (para Windows, macOS o Linux) se eligen tres cosas: el **modelo** de Raspberry, el **sistema operativo** (Other specific-purpose OS → Home assistants and home automation → Home Assistant) y la **tarjeta microSD**. Luego se graba." },
        { type: "p", text: "Inserta la tarjeta, conecta la Pi al router por cable y enciéndela. Tras unos minutos se mostrará su IP. Desde otro equipo **en la misma red** abre el navegador en `http://<IP>:8123` (por ejemplo `http://192.168.8.195:8123`) o en `http://homeassistant.local:8123`." },
        { type: "p", text: "El asistente inicial pide **usuario y contraseña** (guárdalos bien), la **ubicación** de la casa (sirve para clima, horarios de amanecer/atardecer y automatizaciones por ubicación), qué datos anónimos compartir y muestra los dispositivos compatibles que detectó en la red." },
        { type: "callout", variant: "tip", text: "La primera vez puede tardar hasta 20 minutos en preparar todo. Si la página no carga, espera antes de reiniciar." },
      ],
      exercise: {
        type: "fill",
        prompt: "Completa los datos del primer acceso.",
        blanks: [
          { label: "Puerto web de Home Assistant: `http://homeassistant.local:____`", answers: ["8123"], placeholder: "número" },
          { label: "Programa para grabar el sistema en la microSD", answers: ["Raspberry Pi Imager", "Imager", "rpi imager", "raspberry imager"], placeholder: "nombre del programa" },
          { label: "Capacidad mínima de la microSD (en GB)", answers: ["16", "16 gb", "16gb"], placeholder: "número" },
        ],
        explanation: "**8123** es el puerto por defecto de Home Assistant; lo volverás a ver al configurar el acceso remoto.",
      },
    },
    {
      title: "Recorrido por la interfaz",
      blocks: [
        {
          type: "table",
          head: ["Opción", "Para qué sirve"],
          rows: [
            ["Resumen", "Panel con todos los dispositivos configurados"],
            ["Energía", "Monitorear el consumo de cada dispositivo y detectar averías"],
            ["Mapa", "Ubicación y estado de los dispositivos"],
            ["Registro", "Eventos, acciones, errores y advertencias: el primer lugar para diagnosticar"],
            ["Historial", "Cómo ha cambiado cada sensor a lo largo del tiempo"],
            ["Herramientas para desarrolladores", "Verificar la configuración, ver estados y probar servicios"],
            ["Ajustes → Dispositivos y servicios", "Agregar integraciones y dispositivos nuevos"],
            ["Ajustes → Automatizaciones y escenas", "Crear automatizaciones"],
            ["Ajustes → Áreas y zonas", "Dividir la casa en salón, cocina, dormitorio…"],
            ["Ajustes → Complementos", "Instalar funciones extra (File Editor, Mosquitto, ESPHome)"],
            ["Ajustes → Paneles de control", "Crear paneles personalizados"],
          ],
        },
        { type: "p", text: "Tu **contraseña** se cambia en el menú de tu **nombre de usuario** (abajo a la izquierda). Para integrar un ESP32 con sensores se usa un **complemento** como ESPHome." },
      ],
      exercise: {
        type: "classify",
        prompt: "¿A qué opción de Home Assistant vas para cada tarea?",
        categories: ["Dispositivos y servicios", "Registro", "Complementos", "Áreas y zonas", "Energía"],
        items: [
          { text: "Agregar la bombilla Tuya que se acaba de detectar", category: "Dispositivos y servicios" },
          { text: "Averiguar por qué falló una automatización anoche", category: "Registro" },
          { text: "Instalar el editor de archivos (File Editor)", category: "Complementos" },
          { text: "Crear las zonas «Cocina» y «Dormitorio»", category: "Áreas y zonas" },
          { text: "Ver qué aparato consume más electricidad", category: "Energía" },
        ],
        explanation: "**Dispositivos y servicios** es para integrar, **Complementos** para extender Home Assistant y **Registro** para diagnosticar.",
      },
    },
    {
      title: "La red ZigBee dentro de Home Assistant",
      blocks: [
        { type: "p", text: "El ZB Bridge Pro de eWeLink **no** sirve aquí. Se necesita un **coordinador USB**, como el **SONOFF Zigbee 3.0 USB Dongle Plus**, conectado a la Pi con un **cable extensor USB** (aleja la radio de las interferencias de la propia placa)." },
        {
          type: "table",
          head: ["", "ZHA (Zigbee Home Automation)", "Zigbee2MQTT"],
          rows: [
            ["Qué es", "Integración nativa de Home Assistant", "Proyecto independiente que publica todo por MQTT"],
            ["Instalación", "Se detecta sola al conectar el dongle", "Requiere broker MQTT y un complemento"],
            ["Ideal para", "Empezar rápido (es lo que usa el curso)", "Máxima compatibilidad y control fino"],
          ],
        },
        { type: "callout", variant: "warn", text: "Un dispositivo ZigBee solo puede estar unido a **un** coordinador. Al pasar a Home Assistant hay que **volver a emparejar** cada sensor manualmente." },
        { type: "p", text: "Pasos: conectar el dongle → aparece una notificación «Nuevo dispositivo detectado» → **Configurar** → «Mantener la configuración de radio» → elegir área. Luego, en el coordinador, **Añadir dispositivos a través de este dispositivo** y poner cada sensor en modo emparejamiento." },
        { type: "p", text: "Otros dispositivos se integran igual desde las notificaciones: la bombilla Tuya pide el **código de usuario** de la app Smart Life (Yo → Cuenta y seguridad) y escanear un QR. Home Assistant tiene **más de 2 700 integraciones**." },
      ],
      exercise: {
        type: "choice",
        prompt: "Conectaste el dongle a Home Assistant, pero tus sensores no aparecen. ¿Qué pasa?",
        options: [
          "El dongle está defectuoso",
          "Los sensores siguen unidos al ZB Bridge de eWeLink y hay que reemparejarlos con el nuevo coordinador",
          "Home Assistant no soporta ZigBee",
          "Falta instalar Google Home",
        ],
        answer: 1,
        explanation: "Cada dispositivo pertenece a **una sola red**. Ponlo en modo emparejamiento y agrégalo desde el coordinador de Home Assistant.",
      },
    },
    {
      title: "Configuración con YAML y notificaciones",
      blocks: [
        { type: "p", text: "Algunas integraciones se configuran en el archivo **`/homeassistant/configuration.yaml`**, que se edita con el complemento **File Editor** (actívale «Mostrar en el panel lateral»)." },
        { type: "p", text: "Ejemplo del curso: enviar avisos por WhatsApp con el servicio gratuito **CallMeBot**. Primero se agrega el contacto del bot, se le envía el mensaje de autorización y responde con tu **API key**. Después se agrega al YAML:" },
        { type: "code", caption: "configuration.yaml", code: "# Notificaciones\nnotify:\n  - name: WhatsApp\n    platform: rest\n    resource: https://api.callmebot.com/whatsapp.php\n    data:\n      source: HA\n      phone: +5218100000000   # tu número (ejemplo)\n      apikey: 1234567         # la API key que te envió el bot" },
        { type: "callout", variant: "warn", title: "Antes de reiniciar", text: "YAML depende de la **sangría con espacios** (nunca tabuladores). Ve a **Herramientas para desarrolladores → Verificar configuración**. Solo si dice «La configuración no impedirá que se inicie Home Assistant», presiona **Reiniciar**." },
        { type: "p", text: "Después, en una automatización, la acción «Notificaciones → Send a notification with whatsapp» envía, por ejemplo, «Puerta de la entrada abierta». Otras vías: la app móvil de Home Assistant, correo, SMS (Twilio), Telegram o anuncios en altavoces." },
        { type: "p", text: "Finalmente, los **paneles de control** reúnen tarjetas con sensores, cámaras y botones. Crea uno en Ajustes → Paneles de control → Añadir." },
      ],
      exercise: {
        type: "fill",
        prompt: "Completa los datos de la configuración de notificaciones.",
        blanks: [
          { label: "Archivo principal de configuración", answers: ["configuration.yaml", "/homeassistant/configuration.yaml"], placeholder: "nombre.yaml" },
          { label: "Valor de `platform` para el notificador de CallMeBot", answers: ["rest"], placeholder: "valor" },
          { label: "Botón de Herramientas para desarrolladores que se usa antes de reiniciar", answers: ["verificar configuracion", "verificar configuración", "check configuration"], placeholder: "texto del botón" },
        ],
        explanation: "La plataforma **rest** hace una petición HTTP a la URL de CallMeBot con tu número y API key. **Verificar** antes de reiniciar evita dejar Home Assistant sin arrancar por un error de sangría.",
      },
    },
  ],
  quiz: [
    { q: "¿Qué capacidad mínima recomienda el curso para la microSD de Home Assistant?", keepOrder: true, options: ["4 GB", "8 GB", "16 GB", "1 TB"], answer: 2, explanation: "Al menos 16 GB y Clase 10 / UHS-1." },
    { q: "¿En qué puerto escucha por defecto la interfaz web de Home Assistant?", keepOrder: true, options: ["80", "1883", "554", "8123"], answer: 3, explanation: "Se accede con http://<IP>:8123." },
    { q: "¿Qué dirección puedes usar si no conoces la IP de la Raspberry?", options: ["http://google.com", "http://homeassistant.local:8123", "rtsp://homeassistant", "http://localhost:554"], answer: 1, explanation: "homeassistant.local resuelve el equipo dentro de la red local." },
    { q: "¿Para qué pide Home Assistant la ubicación de la casa?", options: ["Para venderla", "Para clima, horarios de amanecer/atardecer y automatizaciones por ubicación", "Para emparejar ZigBee", "No la pide"], answer: 1, explanation: "La hora local y la posición del sol dependen de la ubicación." },
    { q: "¿Dónde se agregan nuevas integraciones y dispositivos?", options: ["Ajustes → Dispositivos y servicios", "Mapa", "Historial", "Energía"], answer: 0, explanation: "Es el punto de entrada de las integraciones." },
    { q: "¿Qué opción es la más útil para diagnosticar un error?", options: ["Medios", "Registro", "Lista de tareas", "Mapa"], answer: 1, explanation: "El registro muestra eventos, errores y advertencias." },
    { q: "¿Qué dispositivo se necesita para integrar ZigBee directamente en Home Assistant?", options: ["El SONOFF ZB Bridge Pro", "Un coordinador USB como el SONOFF Zigbee 3.0 USB Dongle Plus", "Un Nest Mini", "Un cable HDMI"], answer: 1, explanation: "El dongle USB actúa como coordinador de la red ZigBee de Home Assistant." },
    { q: "¿Por qué hay que reemparejar los sensores al pasarlos a Home Assistant?", options: ["Porque cambian de protocolo", "Porque un dispositivo ZigBee solo puede pertenecer a un coordinador a la vez", "Porque se borran solos", "No hace falta"], answer: 1, explanation: "No se pueden compartir dos coordinadores a la vez." },
    { q: "¿Qué complemento permite editar configuration.yaml desde el navegador?", options: ["Mosquitto", "File Editor", "Nabu Casa", "ESPHome"], answer: 1, explanation: "File Editor abre y guarda archivos de configuración." },
    { q: "¿Qué debes hacer antes de reiniciar tras editar el YAML?", options: ["Desconectar el dongle", "Verificar configuración en Herramientas para desarrolladores", "Borrar el registro", "Cambiar la contraseña"], answer: 1, explanation: "Así detectas errores que impedirían el arranque." },
  ],
};
