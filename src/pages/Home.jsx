import { Link } from "react-router-dom";
import { modules } from "../data/index.js";
import { useProgress } from "../lib/ProgressContext.jsx";
import { isUnlocked, overallPercent, PASS_SCORE } from "../lib/logic.js";
import { IconArrow, IconCheck, IconLock } from "../components/Icons.jsx";

export default function Home() {
  const { progress } = useProgress();
  const stats = overallPercent(modules, progress);
  const nextIndex = modules.findIndex((m) => !progress.modules[m.id]?.passed);
  const next = nextIndex >= 0 ? modules[nextIndex] : null;

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Curso interactivo</p>
        <h1>Internet de las Cosas y Domótica</h1>
        <p className="lead">
          Aprende desde qué es el IoT hasta montar una casa inteligente con ZigBee, asistentes de voz,
          Home Assistant y MQTT. Cada tema combina una explicación breve con una práctica inmediata, y
          cada módulo cierra con un cuestionario de 10 preguntas.
        </p>
        <div className="hero-actions">
          {next ? (
            <Link to={`/modulo/${next.id}`} className="btn big">
              {stats.passed === 0 && !progress.modules[next.id]?.attempts ? "Empezar el curso" : `Continuar: Módulo ${nextIndex + 1}`} <IconArrow />
            </Link>
          ) : (
            <span className="badge-done"><IconCheck /> ¡Terminaste los {modules.length} módulos!</span>
          )}
        </div>
        <div className="hero-stats">
          <div><strong>{modules.length}</strong><span>módulos</span></div>
          <div><strong>{modules.reduce((n, m) => n + m.sections.filter((s) => s.exercise).length, 0)}</strong><span>prácticas</span></div>
          <div><strong>{modules.length * 10}</strong><span>preguntas</span></div>
          <div><strong>{PASS_SCORE}+</strong><span>para aprobar</span></div>
        </div>
      </section>

      <section>
        <h2 className="section-h">Cómo funciona</h2>
        <div className="steps3">
          <div><span>1</span><strong>Lee un tema corto</strong><p>Cada módulo está dividido en temas con diagramas y ejemplos.</p></div>
          <div><span>2</span><strong>Practica en el momento</strong><p>Al final de cada tema hay una práctica interactiva sin calificación.</p></div>
          <div><span>3</span><strong>Aprueba el cuestionario</strong><p>Con {PASS_SCORE} o más desbloqueas el siguiente módulo. Puedes reintentar sin límite.</p></div>
        </div>
      </section>

      <section>
        <h2 className="section-h">Temario</h2>
        <div className="module-grid">
          {modules.map((m, i) => {
            const st = progress.modules[m.id] || {};
            const unlocked = isUnlocked(modules, progress, i);
            const body = (
              <>
                <div className="mg-top">
                  <span className="mg-num">Módulo {i + 1}</span>
                  {st.passed ? <span className="pill ok"><IconCheck /> {st.bestScore}</span> : !unlocked ? <span className="pill"><IconLock /> Bloqueado</span> : st.attempts ? <span className="pill warn">Último: {st.lastScore}</span> : null}
                </div>
                <strong>{m.title}</strong>
                <p>{m.short}</p>
              </>
            );
            return unlocked ? (
              <Link key={m.id} to={`/modulo/${m.id}`} className="module-card">{body}</Link>
            ) : (
              <div key={m.id} className="module-card locked">{body}</div>
            );
          })}
        </div>
      </section>

      <p className="foot-note">
        Tu progreso se guarda solo en este navegador. Si borras los datos del sitio o cambias de dispositivo, empezarás de cero.
      </p>
    </div>
  );
}
