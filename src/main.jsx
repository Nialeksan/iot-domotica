import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "./lib/ProgressContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import "./styles.css";

function NotFound() {
  return (
    <div className="page">
      <h1>Página no encontrada</h1>
      <p>Esa dirección no existe.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="modulo/:id" element={<ModulePage />} />
            <Route path="modulo/:id/cuestionario" element={<QuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>
);
