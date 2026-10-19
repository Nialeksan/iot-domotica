import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { recordAttempt, recordExercise } from "./logic.js";

const KEY = "iot-domotica-progress-v1";
const EMPTY = { modules: {} };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : null;
    return data && typeof data === "object" && data.modules ? data : EMPTY;
  } catch {
    return EMPTY;
  }
}

const Ctx = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* almacenamiento no disponible: el progreso vive solo en memoria */
    }
  }, [progress]);

  const saveAttempt = useCallback(
    (moduleId, result, answers) => setProgress((p) => recordAttempt(p, moduleId, result, answers)),
    []
  );
  const markExercise = useCallback(
    (moduleId, key) => setProgress((p) => recordExercise(p, moduleId, key)),
    []
  );
  const reset = useCallback(() => setProgress(EMPTY), []);

  return (
    <Ctx.Provider value={{ progress, saveAttempt, markExercise, reset }}>{children}</Ctx.Provider>
  );
}

export function useProgress() {
  return useContext(Ctx);
}

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("iot-theme", theme);
    } catch {
      /* ignorar */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}
