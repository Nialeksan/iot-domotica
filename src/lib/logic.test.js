import { describe, expect, it } from "vitest";
import {
  gradeQuiz, isUnlocked, mqttFilterError, mqttMatch, normalize,
  overallPercent, recordAttempt, recordExercise,
} from "./logic.js";
import { modules, rawModules } from "../data/index.js";

describe("gradeQuiz", () => {
  const qs = Array.from({ length: 10 }, () => ({ answer: 0 }));
  it("calcula 70 con 7 de 10 y aprueba", () => {
    const r = gradeQuiz(qs, [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]);
    expect(r).toMatchObject({ correct: 7, score: 70, passed: true });
  });
  it("reprueba con 60", () => {
    expect(gradeQuiz(qs, [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]).passed).toBe(false);
  });
});

describe("progreso", () => {
  it("solo el primer módulo está desbloqueado al inicio", () => {
    const p = { modules: {} };
    expect(isUnlocked(modules, p, 0)).toBe(true);
    expect(isUnlocked(modules, p, 1)).toBe(false);
  });
  it("aprobar desbloquea el siguiente y conserva la mejor calificación", () => {
    let p = { modules: {} };
    p = recordAttempt(p, modules[0].id, { score: 90, passed: true }, []);
    p = recordAttempt(p, modules[0].id, { score: 50, passed: false }, []);
    const st = p.modules[modules[0].id];
    expect(st).toMatchObject({ attempts: 2, bestScore: 90, lastScore: 50, passed: true });
    expect(isUnlocked(modules, p, 1)).toBe(true);
    expect(overallPercent(modules, p).passed).toBe(1);
  });
  it("no duplica prácticas resueltas", () => {
    let p = { modules: {} };
    p = recordExercise(p, "x", "s0");
    p = recordExercise(p, "x", "s0");
    expect(p.modules.x.exercises).toEqual(["s0"]);
  });
});

describe("mqttMatch", () => {
  it.each([
    ["casa/+/temperatura", "casa/cocina/temperatura", true],
    ["casa/+/temperatura", "casa/cocina/humedad", false],
    ["casa/cocina/#", "casa/cocina", true],
    ["casa/cocina/#", "casa/cocina/luz/brillo", true],
    ["#", "oficina/lampara", true],
    ["casa/+", "casa/cocina/temperatura", false],
    ["Casa/cocina/#", "casa/cocina/humedad", false],
  ])("%s ~ %s → %s", (f, t, exp) => expect(mqttMatch(f, t)).toBe(exp));

  it("detecta comodines mal colocados", () => {
    expect(mqttFilterError("casa/#/luz")).toBeTruthy();
    expect(mqttFilterError("casa/co+")).toBeTruthy();
    expect(mqttFilterError("casa/+/luz")).toBeNull();
  });
});

it("normalize ignora mayúsculas, acentos y espacios", () => {
  expect(normalize("  Verificar Configuración ")).toBe("verificar configuracion");
});

describe("integridad del contenido", () => {
  it("hay ids únicos", () => {
    expect(new Set(modules.map((m) => m.id)).size).toBe(modules.length);
  });
  it.each(modules.map((m) => [m.id, m]))("%s tiene 10 preguntas válidas", (_, m) => {
    expect(m.quiz).toHaveLength(10);
    m.quiz.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.explanation).toBeTruthy();
    });
  });
  it("reordenar opciones conserva la respuesta correcta", () => {
    rawModules.forEach((raw, mi) =>
      raw.quiz.forEach((q, qi) => {
        const prepared = modules[mi].quiz[qi];
        expect(prepared.options[prepared.answer]).toBe(q.options[q.answer]);
      })
    );
  });
  it("las prácticas están bien formadas", () => {
    modules.forEach((m) =>
      m.sections.forEach((s) => {
        const ex = s.exercise;
        if (!ex) return;
        if (ex.type === "classify") ex.items.forEach((it) => expect(ex.categories).toContain(it.category));
        if (ex.type === "choice") expect(ex.options[ex.answer]).toBeDefined();
        if (ex.type === "fill") ex.blanks.forEach((b) => expect(b.answers.length).toBeGreaterThan(0));
        if (ex.type === "mqtt")
          ex.challenges.forEach((c) => c.expected.forEach((t) => expect(ex.topics).toContain(t)));
      })
    );
  });
  it("cada reto MQTT tiene al menos una solución", () => {
    const sols = { 0: "casa/+/temperatura", 1: "casa/cocina/#", 2: "casa/dormitorio/luz/#", 3: "#" };
    const ex = modules.flatMap((m) => m.sections).find((s) => s.exercise?.type === "mqtt").exercise;
    ex.challenges.forEach((c, i) => {
      const got = ex.topics.filter((t) => mqttMatch(sols[i], t));
      expect(got.sort()).toEqual([...c.expected].sort());
    });
  });
});
