import { useMemo, useState } from "react";
import { Inline } from "./Blocks.jsx";
import { IconCheck, IconDown, IconFlask, IconUp } from "./Icons.jsx";
import { deterministicShuffle, mqttFilterError, mqttMatch, normalize } from "../lib/logic.js";

function Feedback({ state, explanation, wrongMsg }) {
  if (state === "idle") return null;
  return (
    <div className={`feedback ${state}`}>
      {state === "ok" ? <strong>¡Correcto!</strong> : <strong>{wrongMsg || "Todavía no. Revisa y vuelve a intentarlo."}</strong>}
      {state === "ok" && explanation && <p><Inline text={explanation} /></p>}
    </div>
  );
}

function Choice({ ex, onSolved }) {
  const [sel, setSel] = useState(null);
  const [state, setState] = useState("idle");
  const check = () => {
    const ok = sel === ex.answer;
    setState(ok ? "ok" : "bad");
    if (ok) onSolved();
  };
  return (
    <>
      <div className="options">
        {ex.options.map((o, i) => (
          <label key={i} className={`option ${sel === i ? "selected" : ""} ${state === "ok" && i === ex.answer ? "right" : ""}`}>
            <input type="radio" name={ex.key} checked={sel === i} onChange={() => { setSel(i); setState("idle"); }} />
            <span><Inline text={o} /></span>
          </label>
        ))}
      </div>
      <button className="btn" onClick={check} disabled={sel === null}>Comprobar</button>
      <Feedback state={state} explanation={ex.explanation} />
    </>
  );
}

function Classify({ ex, onSolved }) {
  const [vals, setVals] = useState(() => ex.items.map(() => ""));
  const [state, setState] = useState("idle");
  const [checked, setChecked] = useState(false);
  const check = () => {
    setChecked(true);
    const ok = ex.items.every((it, i) => vals[i] === it.category);
    setState(ok ? "ok" : "bad");
    if (ok) onSolved();
  };
  const wrong = ex.items.filter((it, i) => vals[i] !== it.category).length;
  return (
    <>
      <div className="classify">
        {ex.items.map((it, i) => {
          const mark = checked && vals[i] ? (vals[i] === it.category ? "right" : "wrong") : "";
          return (
            <div key={i} className={`classify-row ${mark}`}>
              <span><Inline text={it.text} /></span>
              <select
                value={vals[i]}
                aria-label={`Categoría para ${it.text}`}
                onChange={(e) => { const v = [...vals]; v[i] = e.target.value; setVals(v); setState("idle"); }}
              >
                <option value="">Elige…</option>
                {ex.categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          );
        })}
      </div>
      <button className="btn" onClick={check} disabled={vals.some((v) => !v)}>Comprobar</button>
      <Feedback state={state} explanation={ex.explanation} wrongMsg={`Hay ${wrong} ${wrong === 1 ? "elemento mal clasificado" : "elementos mal clasificados"} (marcados en rojo).`} />
    </>
  );
}

function Order({ ex, onSolved }) {
  const initial = useMemo(() => deterministicShuffle(ex.items, ex.items.length + 3), [ex.items]);
  const [list, setList] = useState(initial);
  const [state, setState] = useState("idle");
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const l = [...list];
    [l[i], l[j]] = [l[j], l[i]];
    setList(l);
    setState("idle");
  };
  const check = () => {
    const ok = list.every((o, i) => o.i === i);
    setState(ok ? "ok" : "bad");
    if (ok) onSolved();
  };
  const correctPrefix = list.findIndex((o, i) => o.i !== i);
  return (
    <>
      <ol className="order">
        {list.map((o, i) => (
          <li key={o.i}>
            <span className="order-n">{i + 1}</span>
            <span className="order-text"><Inline text={o.v} /></span>
            <span className="order-btns">
              <button className="icon-btn sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Subir"><IconUp /></button>
              <button className="icon-btn sm" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="Bajar"><IconDown /></button>
            </span>
          </li>
        ))}
      </ol>
      <button className="btn" onClick={check}>Comprobar orden</button>
      <Feedback state={state} explanation={ex.explanation} wrongMsg={correctPrefix <= 0 ? "El primer paso no es el correcto. Piensa qué debe ocurrir antes que todo." : `${correctPrefix === 1 ? "El primer paso está bien" : `Los primeros ${correctPrefix} pasos están bien`}; el paso ${correctPrefix + 1} no va ahí.`} />
    </>
  );
}

function Fill({ ex, onSolved }) {
  const [vals, setVals] = useState(() => ex.blanks.map(() => ""));
  const [state, setState] = useState("idle");
  const [checked, setChecked] = useState(false);
  const ok = (i) => ex.blanks[i].answers.some((a) => normalize(a) === normalize(vals[i]));
  const check = () => {
    setChecked(true);
    const all = ex.blanks.every((_, i) => ok(i));
    setState(all ? "ok" : "bad");
    if (all) onSolved();
  };
  return (
    <>
      <div className="fill">
        {ex.blanks.map((b, i) => (
          <label key={i} className={`fill-row ${checked ? (ok(i) ? "right" : "wrong") : ""}`}>
            <span><Inline text={b.label} /></span>
            <input
              type="text"
              value={vals[i]}
              placeholder={b.placeholder || "Tu respuesta"}
              onChange={(e) => { const v = [...vals]; v[i] = e.target.value; setVals(v); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && check()}
            />
          </label>
        ))}
      </div>
      <button className="btn" onClick={check} disabled={vals.some((v) => !v.trim())}>Comprobar</button>
      <Feedback state={state} explanation={ex.explanation} />
    </>
  );
}

function MqttPlayground({ ex, onSolved }) {
  const [filter, setFilter] = useState("");
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState(null);
  const err = filter ? mqttFilterError(filter) : null;
  const matches = !filter || err ? [] : ex.topics.filter((t) => mqttMatch(filter, t));
  const ch = ex.challenges[step];
  const done = step >= ex.challenges.length;

  const check = () => {
    if (err) return;
    const exp = new Set(ch.expected);
    const ok = matches.length === exp.size && matches.every((m) => exp.has(m));
    if (ok) {
      setMsg({ ok: true, text: `Bien: \`${filter.trim()}\` recibe exactamente esos temas.` });
      const next = step + 1;
      setStep(next);
      setFilter("");
      if (next >= ex.challenges.length) onSolved();
    } else {
      setMsg({ ok: false, text: "Ese filtro no recibe exactamente los temas pedidos. Mira cuáles se iluminan." });
    }
  };

  return (
    <div className="mqtt">
      <div className="mqtt-topics">
        <small>Temas publicados en el broker</small>
        {ex.topics.map((t) => (
          <code key={t} className={matches.includes(t) ? "hit" : ""}>{t}</code>
        ))}
      </div>
      <div className="mqtt-panel">
        {done ? (
          <div className="feedback ok"><strong>¡Completaste los {ex.challenges.length} retos!</strong><p>Puedes seguir probando filtros libremente.</p></div>
        ) : (
          <p className="mqtt-goal"><span>Reto {step + 1} de {ex.challenges.length}:</span> <Inline text={ch.goal} /></p>
        )}
        <div className="mqtt-input">
          <input
            type="text"
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setMsg(null); }}
            onKeyDown={(e) => e.key === "Enter" && !done && check()}
            placeholder="Escribe un filtro, p. ej. casa/+/luz"
            aria-label="Filtro de suscripción MQTT"
            spellCheck="false"
          />
          {!done && <button className="btn" onClick={check} disabled={!filter || !!err}>Suscribirse</button>}
        </div>
        {err && <p className="mqtt-err">{err}</p>}
        {filter && !err && <p className="mqtt-count">Coinciden {matches.length} {matches.length === 1 ? "tema" : "temas"}.</p>}
        {msg && <div className={`feedback ${msg.ok ? "ok" : "bad"}`}><p><Inline text={msg.text} /></p></div>}
      </div>
    </div>
  );
}

const types = { choice: Choice, classify: Classify, order: Order, fill: Fill, mqtt: MqttPlayground };

export default function Exercise({ ex, done, onSolved }) {
  const C = types[ex.type];
  return (
    <section className={`exercise ${done ? "done" : ""}`}>
      <header>
        <span className="ex-badge">{done ? <IconCheck /> : <IconFlask />} {done ? "Práctica resuelta" : "Práctica"}</span>
        <h4><Inline text={ex.prompt} /></h4>
      </header>
      <C ex={ex} onSolved={onSolved} />
    </section>
  );
}
