import React from "react";
import { createRoot } from "react-dom/client";
import App from "../grindlands.jsx";

// PWA storage shim: same async API the artifact uses, backed by localStorage.
if (!window.storage) {
  window.storage = {
    async get(k) { const v = localStorage.getItem("gl_" + k); return v == null ? null : { key: k, value: v }; },
    async set(k, v) { localStorage.setItem("gl_" + k, v); return { key: k, value: v }; },
    async delete(k) { localStorage.removeItem("gl_" + k); return { key: k, deleted: true }; },
    async list(p) { const keys = []; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key.startsWith("gl_" + (p || ""))) keys.push(key.slice(3)); } return { keys }; },
  };
}
// Service worker for offline support (only registers on https / localhost)
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
createRoot(document.getElementById("root")).render(<App />);
