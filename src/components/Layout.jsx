import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { modules } from "../data/index.js";
import { useProgress, useTheme } from "../lib/ProgressContext.jsx";
import { isUnlocked, overallPercent } from "../lib/logic.js";
import { IconCheck, IconHome, IconLock, IconLogo, IconMenu, IconMoon, IconReset, IconSun, IconX } from "./Icons.jsx";

export default function Layout() {
  const { progress, reset } = useProgress();
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const stats = overallPercent(modules, progress);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  const onReset = () => {
    if (window.confirm("¿Borrar todo tu progreso y calificaciones? Esta acción no se puede deshacer.")) reset();
  };

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <IconMenu />
        </button>
        <span className="topbar-title">IoT y Domótica</span>
        <span className="topbar-pct">{stats.percent}%</span>
      </header>

      <div className={`backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />

      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Módulos">
        <div className="brand">
          <IconLogo />
          <div>
            <strong>Aprende IoT</strong>
            <span>y Domótica</span>
          </div>
          <button className="icon-btn close-btn" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <IconX />
          </button>
        </div>

        <div className="progress-card">
          <div className="progress-head">
            <span>Tu progreso</span>
            <strong>{stats.percent}%</strong>
          </div>
          <div className="bar" role="progressbar" aria-valuenow={stats.percent} aria-valuemin="0" aria-valuemax="100">
            <div style={{ width: `${stats.percent}%` }} />
          </div>
          <small>
            {stats.passed} de {stats.total} módulos aprobados
          </small>
        </div>

        <nav className="nav">
          <NavLink to="/" end className="nav-item nav-home">
            <span className="nav-status"><IconHome /></span>
            <span className="nav-text">Inicio</span>
          </NavLink>
          <p className="nav-label">Módulos</p>
          {modules.map((m, i) => {
            const st = progress.modules[m.id] || {};
            const unlocked = isUnlocked(modules, progress, i);
            const cls = st.passed ? "passed" : unlocked ? "available" : "locked";
            const content = (
              <>
                <span className={`nav-status ${cls}`}>
                  {st.passed ? <IconCheck /> : unlocked ? i + 1 : <IconLock />}
                </span>
                <span className="nav-text">
                  <span className="nav-title">{m.title}</span>
                  <span className="nav-sub">
                    {st.passed
                      ? `Aprobado · mejor ${st.bestScore}`
                      : !unlocked
                      ? "Bloqueado"
                      : st.attempts
                      ? `Último intento: ${st.lastScore}`
                      : "Disponible"}
                  </span>
                </span>
              </>
            );
            return unlocked ? (
              <NavLink key={m.id} to={`/modulo/${m.id}`} className={`nav-item ${cls}`}>
                {content}
              </NavLink>
            ) : (
              <div key={m.id} className="nav-item locked" aria-disabled="true" title="Aprueba el módulo anterior para desbloquearlo">
                {content}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <button className="ghost-btn" onClick={toggleTheme}>
            {theme === "dark" ? <IconSun /> : <IconMoon />}
            {theme === "dark" ? "Modo claro" : "Modo oscuro"}
          </button>
          <button className="ghost-btn danger" onClick={onReset}>
            <IconReset /> Reiniciar progreso
          </button>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
