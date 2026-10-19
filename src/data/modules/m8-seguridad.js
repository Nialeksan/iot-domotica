export default {
  id: "seguridad",
  title: "Seguridad, acceso remoto y buenas prácticas",
  short: "Trabajo eléctrico seguro, ciberseguridad IoT, acceso remoto a Home Assistant y cómo planear un sistema que dure.",
  intro:
    "Una casa inteligente mal protegida puede ser peligrosa en dos sentidos: eléctrico y digital. En este último módulo aprenderás a trabajar sin riesgos, a proteger tu red, a entrar a Home Assistant desde fuera de casa y a planear una instalación que no quede obsoleta.",
  objectives: [
    "Seguir el procedimiento seguro antes de tocar la instalación eléctrica.",
    "Aplicar medidas básicas de ciberseguridad a dispositivos IoT.",
    "Comparar Nabu Casa, VPN y reenvío de puertos para el acceso remoto.",
    "Planear un sistema abierto, escalable y con respaldo.",
  ],
  sections: [
    {
      title: "Seguridad eléctrica",
      blocks: [
        { type: "callout", variant: "warn", title: "La corriente no perdona", text: "En México la red doméstica es de **127 V** (la guía original habla de 220 V, el estándar en España). Ambos voltajes pueden causar lesiones graves. Si no tienes formación, la instalación dentro de la pared debe hacerla un **electricista calificado**." },
        { type: "list", items: [
          "**Planifica:** define necesidades eléctricas y la ubicación de enchufes, apagadores y lámparas.",
          "**Corta el suministro** en el interruptor general o en la pastilla del circuito antes de empezar.",
          "**Comprueba la ausencia de tensión** con un buscapolos o un multímetro.",
          "**Protección personal:** guantes aislantes, gafas de seguridad y calzado con suela de goma.",
          "**Escaleras estables** y, si hace falta, alguien que la sostenga.",
          "**Materiales homologados** y siguiendo las instrucciones del fabricante y la normativa local.",
          "**Verifica** conexiones firmes, sin cables sueltos ni expuestos, antes de restablecer la corriente.",
        ] },
      ],
      exercise: {
        type: "order",
        prompt: "Ordena el procedimiento para instalar el interruptor inteligente en la caja del apagador.",
        items: [
          "Planificar: revisar el esquema del manual (uno o dos apagadores)",
          "Cortar el suministro eléctrico del circuito",
          "Comprobar con el buscapolos que no hay tensión",
          "Conectar los cables según el esquema del fabricante",
          "Verificar que no haya cables sueltos ni expuestos",
          "Restablecer la corriente y probar desde el apagador y la app",
        ],
        explanation: "Nunca confíes en que «ya está apagado»: **comprueba** antes de tocar y **verifica** antes de energizar.",
      },
    },
    {
      title: "Ciberseguridad en IoT",
      blocks: [
        { type: "p", text: "Cada dispositivo conectado es una puerta potencial a tu red. Muchas cámaras y enchufes baratos vienen con contraseñas débiles o firmware sin actualizar." },
        {
          type: "cards",
          items: [
            { title: "Contraseñas", text: "Cambia todas las predeterminadas y usa una distinta por servicio, idealmente con un gestor de contraseñas." },
            { title: "Actualizaciones", text: "El firmware y Home Assistant al día corrigen vulnerabilidades conocidas." },
            { title: "Cifrado", text: "TLS/SSL para MQTT y HTTPS para la web. ZigBee ya cifra con AES-128." },
            { title: "Red separada", text: "Una VLAN o red de invitados para IoT aísla los dispositivos de tu computadora y tu teléfono." },
            { title: "Privacidad", text: "Los altavoces siempre escuchan la palabra de activación: revisa qué guardan y desactiva lo que no uses." },
            { title: "Mínimo acceso", text: "Desactiva el acceso remoto cuando no lo necesites y no compartas URLs con credenciales." },
          ],
        },
      ],
      exercise: {
        type: "classify",
        prompt: "¿Buena o mala práctica?",
        categories: ["Buena práctica", "Mala práctica"],
        items: [
          { text: "Dejar la contraseña `admin/admin` de la cámara", category: "Mala práctica" },
          { text: "Poner los dispositivos IoT en una red o VLAN separada", category: "Buena práctica" },
          { text: "Abrir el puerto 8123 al Internet sin certificados", category: "Mala práctica" },
          { text: "Activar las actualizaciones de firmware", category: "Buena práctica" },
          { text: "Usar MQTT con usuario, contraseña y TLS", category: "Buena práctica" },
          { text: "Compartir en un grupo la URL RTSP con contraseña", category: "Mala práctica" },
        ],
        explanation: "La mayoría de los ataques a IoT aprovechan **contraseñas por defecto** y **servicios expuestos sin cifrar**.",
      },
    },
    {
      title: "Acceso remoto a Home Assistant",
      blocks: [
        { type: "p", text: "Conviene habilitar el acceso remoto **antes** de integrar todo: te permite controlar, monitorear y dar mantenimiento desde cualquier lugar." },
        {
          type: "table",
          head: ["Opción", "Cómo funciona", "A favor", "En contra"],
          rows: [
            ["Home Assistant Cloud (Nabu Casa)", "URL remota única con certificado", "Sin configuración y tráfico cifrado", "Suscripción mensual (la guía indica 5 USD con el primer mes gratis; consulta el precio actual)"],
            ["VPN (Tailscale, ZeroTier)", "Te conectas primero a tu red privada virtual", "Muy segura, sin abrir puertos", "Configuración más compleja"],
            ["Reenvío de puertos + DNS dinámico", "El router reenvía un puerto al 8123; DuckDNS sigue tu IP dinámica", "Gratuita", "Insegura si no instalas certificados; algunas compañías dan IP compartida"],
          ],
        },
        { type: "p", text: "Con Nabu Casa: Ajustes → Home Assistant Cloud → prueba gratuita → registrarse y validar el correo → activar **Control remoto** y copiar la URL." },
        { type: "callout", variant: "tip", text: "Guarda tus accesos (URL local, URL remota, usuarios) en un documento seguro con respaldo, o mejor en un **gestor de contraseñas**. Desactiva el control remoto si no lo usarás en mucho tiempo." },
      ],
      exercise: {
        type: "choice",
        prompt: "Quieres acceso remoto seguro, gratis y sin abrir puertos en el router. ¿Qué eliges?",
        options: [
          "Reenvío del puerto 8123 sin certificados",
          "Una VPN como Tailscale",
          "Home Assistant Cloud",
          "Compartir la IP local por WhatsApp",
        ],
        answer: 1,
        explanation: "La VPN es gratuita para uso personal y **no expone** Home Assistant a Internet. Nabu Casa también es segura, pero es de pago.",
      },
    },
    {
      title: "Planear un sistema que dure",
      blocks: [
        { type: "p", text: "Muchas instalaciones quedan obsoletas porque se eligieron por precio sin pensar en el futuro. Antes de comprar, revisa esta lista:" },
        {
          type: "table",
          head: ["Criterio", "Pregunta clave"],
          rows: [
            ["Estándares abiertos", "¿Funciona con varias plataformas o solo con la app de la marca?"],
            ["Ecosistema robusto", "¿Hay comunidad activa (Home Assistant, openHAB, Domoticz)?"],
            ["Actualizaciones y soporte", "¿El fabricante sigue publicando firmware?"],
            ["Escalabilidad", "¿Podré agregar el doble de dispositivos?"],
            ["Control flexible", "¿Puedo usar voz, app **y** apagador físico?"],
            ["Redundancia", "¿Combino tecnologías para no depender de una sola?"],
            ["Mantenimiento", "¿Está documentado para que otra persona lo entienda?"],
            ["Respaldo", "¿Tengo copias de seguridad de la configuración?"],
            ["Sostenibilidad", "¿Consume poco y de verdad me ahorra energía?"],
          ],
        },
        { type: "callout", variant: "info", text: "En Home Assistant: Ajustes → Sistema → **Copias de seguridad**. Guarda una copia fuera de la Raspberry: si la microSD falla, restauras todo en minutos." },
      ],
      exercise: {
        type: "choice",
        prompt: "La marca de tus enchufes Wi-Fi cierra su servidor y la app deja de funcionar. ¿Qué decisión inicial lo habría evitado?",
        options: [
          "Comprar enchufes más caros de la misma marca",
          "Elegir dispositivos con estándares abiertos (ZigBee, Matter) controlados localmente desde Home Assistant",
          "Usar solo comandos de voz",
          "Tener más enchufes de repuesto",
        ],
        answer: 1,
        explanation: "Los **estándares abiertos** y el **control local** hacen que tu casa no dependa de la nube de un solo fabricante.",
      },
    },
  ],
  quiz: [
    { q: "¿Qué es lo primero que debes hacer físicamente antes de instalar un interruptor inteligente?", options: ["Emparejarlo con la app", "Cortar el suministro eléctrico del circuito", "Configurar Google Home", "Comprar un dongle ZigBee"], answer: 1, explanation: "Sin corriente se evita el riesgo de descarga." },
    { q: "¿Para qué sirve el buscapolos en la instalación del curso?", options: ["Para medir la temperatura", "Para comprobar dónde hay fase o que no haya tensión", "Para emparejar sensores", "Para cortar cables"], answer: 1, explanation: "El curso lo usa para comprobar que la fase llega a la entrada «L in» del ZBMINI L2." },
    { q: "¿Qué equipo de protección personal recomienda el curso?", options: ["Audífonos", "Guantes aislantes, gafas y calzado con suela de goma", "Chaleco reflejante", "Ninguno"], answer: 1, explanation: "Aíslan del paso de corriente y protegen los ojos." },
    { q: "¿Qué medida aísla los dispositivos IoT del resto de tu red?", options: ["Cambiar el nombre del Wi-Fi", "Una VLAN o red separada para IoT", "Apagar el router por la noche", "Usar Bluetooth"], answer: 1, explanation: "Si un dispositivo se compromete, no alcanza tu computadora ni tu teléfono." },
    { q: "¿Cuál es la principal ventaja de Home Assistant Cloud (Nabu Casa)?", options: ["Es gratuita para siempre", "No requiere configuración y cifra el tráfico automáticamente", "Abre el puerto 8123", "Funciona sin Internet"], answer: 1, explanation: "Genera una URL remota con certificado sin tocar el router." },
    { q: "¿Qué problema resuelve un servicio de DNS dinámico como DuckDNS?", options: ["Cifrar el tráfico", "Que tu IP pública cambie y pierdas el acceso", "Emparejar ZigBee", "Bloquear anuncios"], answer: 1, explanation: "Mantiene un nombre fijo apuntando a una IP que cambia." },
    { q: "¿Por qué abrir un puerto sin certificados es inseguro?", options: ["Porque es lento", "Porque el tráfico viaja sin cifrar y Home Assistant queda expuesto", "Porque borra la configuración", "No es inseguro"], answer: 1, explanation: "Cualquiera podría interceptar credenciales o intentar entrar." },
    { q: "¿Qué ventaja tienen los estándares abiertos al planear un sistema?", options: ["Son más vistosos", "Permiten reemplazar o integrar dispositivos sin rediseñar toda la instalación", "No necesitan electricidad", "Solo funcionan con una marca"], answer: 1, explanation: "Evitan quedar atrapado en el ecosistema de un solo fabricante." },
    { q: "¿Por qué es importante actualizar el firmware de los dispositivos?", options: ["Para cambiar el color de los LED", "Porque corrige vulnerabilidades y agrega funciones", "Para gastar menos datos", "No es importante"], answer: 1, explanation: "Las actualizaciones cierran fallos de seguridad conocidos." },
    { q: "¿Dónde se crean copias de seguridad en Home Assistant?", options: ["Ajustes → Sistema → Copias de seguridad", "Mapa", "Energía", "En la app Tile"], answer: 0, explanation: "Guarda una copia fuera de la Raspberry para restaurar si falla la microSD." },
  ],
};
