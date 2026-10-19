import m1 from "./modules/m1-fundamentos.js";
import m2 from "./modules/m2-protocolos-red.js";
import m3 from "./modules/m3-zigbee.js";
import m4 from "./modules/m4-automatizaciones.js";
import m5 from "./modules/m5-voz-ecosistemas.js";
import m6 from "./modules/m6-home-assistant.js";
import m7 from "./modules/m7-mqtt-rtsp.js";
import m8 from "./modules/m8-seguridad.js";
import { deterministicShuffle } from "../lib/logic.js";

/**
 * Las opciones se escriben con la correcta donde resulte natural y aquí se reordenan
 * de forma determinista: el orden es siempre el mismo (preguntas fijas), pero la
 * respuesta correcta no cae siempre en la misma letra.
 */
function shuffleOptions(item, seed) {
  if (item.keepOrder || !item.options) return item;
  const order = deterministicShuffle(item.options, seed);
  return {
    ...item,
    options: order.map((o) => o.v),
    answer: order.findIndex((o) => o.i === item.answer),
  };
}

function prepare(m, mi) {
  return {
    ...m,
    sections: m.sections.map((s, si) =>
      s.exercise?.type === "choice" ? { ...s, exercise: shuffleOptions(s.exercise, 31 + mi * 7 + si * 3) } : s
    ),
    quiz: m.quiz.map((q, qi) => shuffleOptions(q, 11 + mi * 13 + qi * 5)),
  };
}

export const rawModules = [m1, m2, m3, m4, m5, m6, m7, m8];
export const modules = rawModules.map(prepare);

export function getModule(id) {
  const index = modules.findIndex((m) => m.id === id);
  return index < 0 ? null : { module: modules[index], index };
}
