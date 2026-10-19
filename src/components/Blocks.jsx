import { Fragment } from "react";
import { IconAlert, IconBulb, IconInfo } from "./Icons.jsx";
import Diagram from "./Diagrams.jsx";

/** Formato en línea mínimo: **negrita** y `código`. */
export function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

const calloutIcon = { tip: IconBulb, warn: IconAlert, info: IconInfo };
const calloutTitle = { tip: "Consejo", warn: "Atención", info: "Dato" };

export default function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case "p":
        return <p key={i}><Inline text={b.text} /></p>;
      case "h":
        return <h3 key={i} className="sub-h">{b.text}</h3>;
      case "list": {
        const Tag = b.ordered ? "ol" : "ul";
        return (
          <Tag key={i} className="list">
            {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
          </Tag>
        );
      }
      case "callout": {
        const Icon = calloutIcon[b.variant] || IconInfo;
        return (
          <div key={i} className={`callout ${b.variant}`}>
            <Icon />
            <div>
              <strong>{b.title || calloutTitle[b.variant]}</strong>
              <p><Inline text={b.text} /></p>
            </div>
          </div>
        );
      }
      case "cards":
        return (
          <div key={i} className="cards">
            {b.items.map((c, j) => (
              <div key={j} className="mini-card">
                <strong>{c.title}</strong>
                <p><Inline text={c.text} /></p>
              </div>
            ))}
          </div>
        );
      case "table":
        return (
          <div key={i} className="table-wrap">
            <table>
              <thead><tr>{b.head.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((r, j) => (
                  <tr key={j}>{r.map((c, k) => <td key={k}><Inline text={c} /></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "code":
        return (
          <figure key={i} className="code">
            {b.caption && <figcaption>{b.caption}</figcaption>}
            <pre><code>{b.code}</code></pre>
          </figure>
        );
      case "diagram":
        return <Diagram key={i} name={b.name} />;
      default:
        return null;
    }
  });
}
