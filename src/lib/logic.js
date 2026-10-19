// Lógica pura (sin React) para poder probarla con Vitest.

export const PASS_SCORE = 70;

/** Calcula la calificación (0-100) de un cuestionario. */
export function gradeQuiz(questions, answers) {
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  const score = Math.round((correct / questions.length) * 100);
  return { correct, total: questions.length, score, passed: score >= PASS_SCORE };
}

/** ¿Un módulo está desbloqueado? El primero siempre; los demás si se aprobó el anterior. */
export function isUnlocked(modules, progress, index) {
  if (index === 0) return true;
  const prev = modules[index - 1];
  return Boolean(progress.modules[prev.id]?.passed);
}

/** Porcentaje de módulos aprobados. */
export function overallPercent(modules, progress) {
  const passed = modules.filter((m) => progress.modules[m.id]?.passed).length;
  return { passed, total: modules.length, percent: Math.round((passed / modules.length) * 100) };
}

/** Registra un intento de cuestionario y devuelve el nuevo estado (inmutable). */
export function recordAttempt(progress, moduleId, result, answers) {
  const prev = progress.modules[moduleId] || {};
  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...prev,
        attempts: (prev.attempts || 0) + 1,
        lastScore: result.score,
        lastAnswers: answers,
        bestScore: Math.max(prev.bestScore || 0, result.score),
        passed: Boolean(prev.passed) || result.passed,
      },
    },
  };
}

/** Marca una práctica como resuelta. */
export function recordExercise(progress, moduleId, key) {
  const prev = progress.modules[moduleId] || {};
  const done = new Set(prev.exercises || []);
  if (done.has(key)) return progress;
  done.add(key);
  return {
    ...progress,
    modules: { ...progress.modules, [moduleId]: { ...prev, exercises: [...done] } },
  };
}

/**
 * ¿Un tema MQTT coincide con un filtro de suscripción?
 * `+` = exactamente un nivel; `#` = cero o más niveles (solo al final).
 */
export function mqttMatch(filter, topic) {
  const f = filter.trim().split("/");
  const t = topic.split("/");
  for (let i = 0; i < f.length; i++) {
    if (f[i] === "#") return i === f.length - 1; // '#' debe ser el último nivel
    if (i >= t.length) return false;
    if (f[i] === "+") continue;
    if (f[i] !== t[i]) return false;
  }
  return f.length === t.length;
}

/** Valida la sintaxis de un filtro MQTT. Devuelve un mensaje de error o null. */
export function mqttFilterError(filter) {
  const f = filter.trim();
  if (!f) return "Escribe un filtro.";
  const levels = f.split("/");
  for (let i = 0; i < levels.length; i++) {
    const l = levels[i];
    if (l.includes("#") && (l !== "#" || i !== levels.length - 1))
      return "El comodín # debe ocupar un nivel completo y ser el último.";
    if (l.includes("+") && l !== "+") return "El comodín + debe ocupar un nivel completo.";
  }
  return null;
}

/** Normaliza texto para comparar respuestas de completar. */
export function normalize(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ");
}

/** Mezcla determinista (para que el orden inicial no sea el correcto). */
export function deterministicShuffle(arr, seed = 7) {
  const out = arr.map((v, i) => ({ v, i }));
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Si quedó en el orden correcto, rota uno.
  if (out.every((o, i) => o.i === i) && out.length > 1) out.push(out.shift());
  return out;
}
