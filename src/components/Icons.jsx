const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const IconCheck = (p) => (<svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>);
export const IconLock = (p) => (<svg {...base} {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
export const IconPlay = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" fill="currentColor" /></svg>);
export const IconSun = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
export const IconMoon = (p) => (<svg {...base} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>);
export const IconMenu = (p) => (<svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
export const IconX = (p) => (<svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>);
export const IconHome = (p) => (<svg {...base} {...p}><path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>);
export const IconReset = (p) => (<svg {...base} {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>);
export const IconArrow = (p) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconBulb = (p) => (<svg {...base} {...p}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" /></svg>);
export const IconAlert = (p) => (<svg {...base} {...p}><path d="M12 3 2 21h20z" /><path d="M12 10v4M12 18h.01" /></svg>);
export const IconInfo = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></svg>);
export const IconFlask = (p) => (<svg {...base} {...p}><path d="M9 3h6M10 3v6L4 19a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 19l-6-10V3" /></svg>);
export const IconUp = (p) => (<svg {...base} {...p}><path d="m6 15 6-6 6 6" /></svg>);
export const IconDown = (p) => (<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const IconLogo = (p) => (
  <svg viewBox="0 0 64 64" width="34" height="34" aria-hidden="true" {...p}>
    <rect width="64" height="64" rx="14" fill="var(--accent)" />
    <path d="M14 32 32 16l18 16v16a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="32" cy="36" r="4" fill="var(--warm)" />
    <path d="M24 30a11 11 0 0 1 16 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
