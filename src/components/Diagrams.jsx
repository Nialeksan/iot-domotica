// Diagramas hechos con HTML/CSS y SVG; usan variables de color, así funcionan en modo claro y oscuro.

function Levels() {
  const lv = [
    ["1", "Básica", "Móvil + dispositivos ZigBee y una app (eWeLink)"],
    ["2", "Media", "+ altavoz inteligente, voz y dispositivos Wi-Fi"],
    ["3", "Media-alta", "+ hub con pantalla (Nest Hub)"],
    ["4", "Alta", "Servidor propio: Raspberry Pi o mini-PC con Home Assistant"],
  ];
  return (
    <figure className="diagram">
      <div className="levels">
        {lv.map(([n, t, d], i) => (
          <div key={n} className={`level l${i}`} style={{ height: `${110 + i * 38}px` }}>
            <span className="level-n">{n}</span>
            <strong>{t}</strong>
            <small>{d}</small>
          </div>
        ))}
      </div>
      <figcaption>Cada nivel conserva lo anterior y le agrega capacidades.</figcaption>
    </figure>
  );
}

function Osi() {
  const rows = [
    ["Aplicación", "Mensajería", ["MQTT", "HTTP/HTTPS", "CoAP"], "msg"],
    ["Red", "Red", ["Direccionamiento", "Enrutamiento"], "net"],
    ["Enlace de datos", "Red", ["Control de acceso", "Detección de errores"], "net"],
    ["Física", "Red", ["Radio 2.4 GHz", "Sub-GHz", "Cable"], "net"],
  ];
  return (
    <figure className="diagram">
      <div className="osi">
        {rows.map(([layer, kind, tags, cls]) => (
          <div key={layer} className={`osi-row ${cls}`}>
            <span className="osi-layer">{layer}</span>
            <span className="osi-tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</span>
            <span className="osi-kind">{kind}</span>
          </div>
        ))}
      </div>
      <figcaption>Wi-Fi, ZigBee, Z-Wave y LoRaWAN viven en las capas bajas; MQTT, HTTP y CoAP en la de aplicación (modelo OSI simplificado).</figcaption>
    </figure>
  );
}

function ZigbeeMesh() {
  const N = {
    gw: [200, 120], r1: [95, 60], r2: [305, 60], r3: [300, 200],
    e1: [40, 150], e2: [120, 215], e3: [370, 130], e4: [220, 230], e5: [30, 40],
  };
  const links = [["gw", "r1"], ["gw", "r2"], ["gw", "r3"], ["r1", "r2"], ["r1", "e1"], ["r1", "e5"], ["gw", "e2"], ["r2", "e3"], ["r3", "e4"], ["r3", "e3"], ["e1", "e2"]];
  const kind = (k) => (k === "gw" ? "gw" : k.startsWith("r") ? "rt" : "ed");
  const size = { gw: 22, rt: 15, ed: 10 };
  return (
    <figure className="diagram">
      <svg viewBox="0 0 420 260" className="svg-diagram" role="img" aria-label="Red ZigBee en malla">
        {links.map(([a, b]) => (
          <line key={a + b} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} className="mesh-link" />
        ))}
        {Object.entries(N).map(([k, [x, y]]) => (
          <circle key={k} cx={x} cy={y} r={size[kind(k)]} className={`mesh-${kind(k)}`} />
        ))}
        <text x="200" y="157" className="svg-label" textAnchor="middle">Coordinador</text>
      </svg>
      <div className="legend">
        <span><i className="dot gw" />Coordinador / gateway</span>
        <span><i className="dot rt" />Router (repetidor)</span>
        <span><i className="dot ed" />Dispositivo final</span>
      </div>
      <figcaption>Si un camino falla, los mensajes buscan otra ruta: por eso la malla es robusta.</figcaption>
    </figure>
  );
}

function Automation() {
  return (
    <figure className="diagram">
      <div className="flow">
        <div className="flow-box f1"><small>SI (disparador)</small><strong>Se abre la puerta</strong></div>
        <span className="flow-arrow">→</span>
        <div className="flow-box f2"><small>Y (condición, opcional)</small><strong>Entre 1:00 y 7:00</strong></div>
        <span className="flow-arrow">→</span>
        <div className="flow-box f3"><small>ENTONCES (acción)</small><strong>Enviar notificación</strong></div>
      </div>
      <figcaption>Toda automatización responde a la misma estructura; en eWeLink se llama «escena» y en Google Home «rutina».</figcaption>
    </figure>
  );
}

function ZigbeeWifi() {
  return (
    <figure className="diagram">
      <div className="topo">
        <div className="topo-col">
          <div className="node cloud">Internet / nube de la app</div>
          <div className="vline" />
          <div className="node router">Router Wi-Fi de la casa</div>
        </div>
        <div className="topo-split">
          <div className="branch">
            <div className="node bridge">ZBBridge (ZigBee ↔ Wi-Fi)</div>
            <div className="chips">
              <span className="tag zb">Sensor puerta</span>
              <span className="tag zb">Sensor movimiento</span>
              <span className="tag zb">Temp./humedad</span>
              <span className="tag zb">Interruptor</span>
              <span className="tag zb">Pulsador</span>
            </div>
          </div>
          <div className="branch">
            <div className="node wifi">Directo por Wi-Fi</div>
            <div className="chips">
              <span className="tag wf">Cámara</span>
              <span className="tag wf">Bombilla RGB</span>
              <span className="tag wf">Nest Mini</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption>Los dispositivos Wi-Fi no dependen del bridge: si este falla, siguen funcionando.</figcaption>
    </figure>
  );
}

function HaArch() {
  return (
    <figure className="diagram">
      <div className="ha">
        <div className="ha-core">
          <strong>Home Assistant</strong>
          <small>Raspberry Pi · puerto 8123</small>
        </div>
        <div className="ha-ring">
          {[
            ["ZHA / Zigbee2MQTT", "Dongle ZigBee USB"],
            ["MQTT", "Broker Mosquitto"],
            ["Tuya / Smart Life", "Bombilla RGB"],
            ["Cámara genérica", "Flujo RTSP"],
            ["Notificaciones", "WhatsApp, app, correo"],
            ["Acceso remoto", "Nabu Casa o VPN"],
          ].map(([t, d]) => (
            <div key={t} className="ha-int"><strong>{t}</strong><small>{d}</small></div>
          ))}
        </div>
      </div>
      <figcaption>Home Assistant centraliza integraciones de muchos fabricantes y protocolos en un solo panel.</figcaption>
    </figure>
  );
}

function Mqtt() {
  return (
    <figure className="diagram">
      <div className="flow">
        <div className="flow-box f1"><small>Publicador</small><strong>Home Assistant</strong><code>"ON"</code></div>
        <span className="flow-arrow">→</span>
        <div className="flow-box f2"><small>Broker</small><strong>Mosquitto</strong><code>home/office/lamp</code></div>
        <span className="flow-arrow">→</span>
        <div className="flow-box f3"><small>Suscriptor</small><strong>ESP32</strong><code>enciende la lámpara</code></div>
      </div>
      <figcaption>El publicador no conoce al suscriptor: ambos solo hablan con el broker a través de un tema.</figcaption>
    </figure>
  );
}

function RtspUrl() {
  const parts = [
    ["rtsp://", "Protocolo"],
    ["rtsp:facil1234", "Usuario:contraseña"],
    ["@192.168.8.108", "IP de la cámara"],
    [":554", "Puerto RTSP"],
    ["/av_stream/ch0", "Ruta del flujo"],
  ];
  return (
    <figure className="diagram">
      <div className="url-parts">
        {parts.map(([p, l], i) => (
          <div key={p} className={`url-part u${i}`}><code>{p}</code><small>{l}</small></div>
        ))}
      </div>
      <figcaption>Anatomía del enlace RTSP de la cámara SONOFF GK-200MP2-B (datos de ejemplo).</figcaption>
    </figure>
  );
}

const map = { levels: Levels, osi: Osi, "zigbee-mesh": ZigbeeMesh, automation: Automation, "zigbee-wifi": ZigbeeWifi, "ha-arch": HaArch, mqtt: Mqtt, "rtsp-url": RtspUrl };

export default function Diagram({ name }) {
  const C = map[name];
  return C ? <C /> : null;
}
