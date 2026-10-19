import { Link, Navigate, useParams } from "react-router-dom";
import { getModule, modules } from "../data/index.js";
import { useProgress } from "../lib/ProgressContext.jsx";
import { isUnlocked, PASS_SCORE } from "../lib/logic.js";
import Blocks, { Inline } from "../components/Blocks.jsx";
import Exercise from "../components/Exercises.jsx";
import { IconArrow, IconCheck } from "../components/Icons.jsx";

export default function ModulePage() {
  const { id } = useParams();
  const { progress, markExercise } = useProgress();
  const found = getModule(id);
  if (!found) return <Navigate to="/" replace />;
  const { module: m, index } = found;
  if (!isUnlocked(modules, progress, index)) return <Navigate to="/" replace />;

  const st = progress.modules[m.id] || {};
  const done = new Set(st.exercises || []);
  const exTotal = m.sections.filter((s) => s.exercise).length;
  const exDone = m.sections.filter((s, i) => s.exercise && done.has(`s${i}`)).length;

  return (
    <article className="page module">
      <header className="module-head">
        <p className="eyebrow">Módulo {index + 1} de {modules.length}</p>
        <h1>{m.title}</h1>
        <p className="lead">{m.intro}</p>
        <div className="objectives">
          <strong>Al terminar podrás:</strong>
          <ul>{m.objectives.map((o) => <li key={o}><Inline text={o} /></li>)}</ul>
        </div>
        <div className="module-meta">
          <span>{m.sections.length} temas</span>
          <span>Prácticas: {exDone}/{exTotal}</span>
          {st.passed && <span className="pill ok"><IconCheck /> Aprobado con {st.bestScore}</span>}
        </div>
        <nav className="toc" aria-label="Temas del módulo">
          {m.sections.map((s, i) => (
            <a key={i} href={`#tema-${i + 1}`} className={s.exercise && done.has(`s${i}`) ? "done" : ""}>
              {i + 1}. {s.title}
            </a>
          ))}
        </nav>
      </header>

      {m.sections.map((s, i) => (
        <section key={`${m.id}-${i}`} id={`tema-${i + 1}`} className="lesson-section">
          <h2><span className="sec-n">{i + 1}</span>{s.title}</h2>
          <Blocks blocks={s.blocks} />
          {s.exercise && (
            <Exercise
              ex={{ ...s.exercise, key: `${m.id}-s${i}` }}
              done={done.has(`s${i}`)}
              onSolved={() => markExercise(m.id, `s${i}`)}
            />
          )}
        </section>
      ))}

      <section className="quiz-cta">
        <div>
          <h2>Cuestionario del módulo</h2>
          <p>10 preguntas de opción múltiple. Necesitas {PASS_SCORE} o más para aprobar{index < modules.length - 1 ? " y desbloquear el siguiente módulo" : ""}.</p>
          {st.attempts > 0 && <p className="muted">Intentos: {st.attempts} · Mejor calificación: {st.bestScore}</p>}
        </div>
        <Link to={`/modulo/${m.id}/cuestionario`} className="btn big">
          {st.attempts ? "Volver a intentarlo" : "Presentar cuestionario"} <IconArrow />
        </Link>
      </section>
    </article>
  );
}
