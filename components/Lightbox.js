"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { c, serif } from "@/lib/theme";

const Ctx = createContext(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }) {
  const [shot, setShot] = useState(null);
  const open = useCallback((src, caption) => setShot({ src, caption }), []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setShot(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Ctx.Provider value={open}>
      {children}
      {shot && (
        <div role="dialog" aria-modal="true" aria-label={shot.caption} onClick={() => setShot(null)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(28,19,12,.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "clamp(16px,4vw,44px)" }}>
          <img src={shot.src} alt={shot.caption} style={{ maxWidth: "100%", maxHeight: "78vh", objectFit: "contain", boxShadow: "0 24px 60px rgba(0,0,0,.5)" }} />
          <p style={{ margin: 0, fontFamily: serif, fontSize: "clamp(16px,2vw,20px)", color: c.paper, textAlign: "center" }}>{shot.caption}</p>
          <button onClick={() => setShot(null)} style={{ minHeight: 44, padding: "11px 22px", background: c.terracotta, color: c.paper, border: 0, fontSize: 15, fontWeight: 600 }}>Close</button>
        </div>
      )}
    </Ctx.Provider>
  );
}

// A background-image tile that opens the full picture on click.
export function Photo({ src, caption, fullSrc, height = 158, ratio, position = "center" }) {
  const open = useLightbox();
  return (
    <button className="zoomable" onClick={() => open(fullSrc || src, caption)} aria-label={`${caption} — view larger`}
      style={{ display: "block", width: "100%", height: ratio ? undefined : height, aspectRatio: ratio, padding: 0, border: 0,
        backgroundColor: c.muted, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: position }} />
  );
}
