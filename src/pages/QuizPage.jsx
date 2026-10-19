import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getModule, modules } from "../data/index.js";
import { useProgress } from "../lib/ProgressContext.jsx";
import { gradeQuiz, isUnlocked, PASS_SCORE } from "../lib/logic.js";
import { Inline } from "../components/Blocks.jsx";
import { IconArrow, IconCheck, IconReset, IconX } from "../components/Icons.jsx";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuizRoute() {
  const { id } = useParams();
  return <QuizPage key={id} id={id} />;
}

function QuizPage({ id }) {
  const { progress, saveAttempt } = useProgress();
  const found = getModule(id);
  const [answers, setAnswers] = useState(() => (found ? found.module.quiz.map(() => null) : []));
  const [result, setResult] = useState(null);

  if (!found) return <Navigate to="/" replace />;
  const { module: m, index } = found;
  if (!isUnlocked(modules, progress, index)) return <Navigate to="/" replace />;

  const answered = answers.filter((a) => a !== null).length;
  const next = modules[index + 1];

  const submit = () => {
    const r = gradeQuiz(m.quiz, answers);
    setResult(r);
    saveAttempt(m.id, r, answers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const retry = () => {
    setAnswers(m.quiz.map(() => null));
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page quiz">
      <header className="module-head">
        <p className="eyebrow">Cuestionario · Módulo {index + 1}</p>
        <h1>{m.title}</h1>
        {!result && <p className="lead">Responde las 10 preguntas y envía. Aprobado: {PASS_SCORE} o más.</p>}
      </header>

      {result && (
        <div className={`result ${result.passed ? "pass" : "fail"}`}>
          <div className="score-ring" style={{ "--p": result.score }}>
            <span>{result.score}</span>
          </div>
          <div className="result-text">
            <h2>{result.passed ? "¡Aprobaste!" : "Aún no alcanzas el mínimo"}</h2>
            <p>
              {result.correct} de {result.total} respuestas correctas.{" "}
              {result.passed
                ? next ? `El módulo ${index + 2} ya está desbloqueado.` : "¡Completaste el curso!"
                : `Necesitas ${PASS_SCORE}. Revisa las explicaciones de abajo y vuelve a intentarlo.`}
            </p>
            <div className="result-actions">
              {result.passed && next && (
                <Link to={`/modulo/${next.id}`} className="btn">Ir al módulo {index + 2} <IconArrow /></Link>
              )}
              <button className="btn secondary" onClick={retry}><IconReset /> Reintentar</button>
              <Link to={`/modulo/${m.id}`} className="btn ghost">Repasar el módulo</Link>
            </div>
          </div>
        </div>
      )}

      <ol className="questions">
        {m.quiz.map((q, qi) => {
          const chosen = answers[qi];
          const isRight = result && chosen === q.answer;
          return (
            <li key={qi} className={`question ${result ? (isRight ? "right" : "wrong") : ""}`}>
              <div className="q-head">
                <span className="q-n">{qi + 1}</span>
                <p><Inline text={q.q} /></p>
                {result && (isRight ? <IconCheck className="q-mark ok" /> : <IconX className="q-mark bad" />)}
              </div>
              <div className="options">
                {q.options.map((o, oi) => {
                  let cls = "";
                  if (result) {
                    if (oi === q.answer) cls = "right";
                    else if (oi === chosen) cls = "wrong";
                  } else if (oi === chosen) cls = "selected";
                  return (
                    <label key={oi} className={`option ${cls} ${result ? "locked" : ""}`}>
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={chosen === oi}
                        disabled={!!result}
                        onChange={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                      />
                      <span className="letter">{LETTERS[oi]}</span>
                      <span><Inline text={o} /></span>
                    </label>
                  );
                })}
              </div>
              {result && (
                <div className={`explain ${isRight ? "ok" : "bad"}`}>
                  <strong>{isRight ? "Correcto." : `Respuesta correcta: ${LETTERS[q.answer]}.`}</strong>{" "}
                  <Inline text={q.explanation} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!result && (
        <div className="submit-bar">
          <span>{answered} de {m.quiz.length} respondidas</span>
          <button className="btn big" onClick={submit} disabled={answered < m.quiz.length}>
            Enviar respuestas
          </button>
        </div>
      )}
    </div>
  );
}
