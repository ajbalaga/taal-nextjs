"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { c, serif, mono } from "@/lib/theme";
import { SERVICES } from "@/lib/data";

export default function ServiceSearch() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const matches = useMemo(
    () => term ? SERVICES.filter(s => (s.name + " " + s.code + " " + s.office + " " + s.desc).toLowerCase().includes(term)) : [],
    [term]
  );

  return (
    <div style={{ marginTop: "clamp(28px,4vw,40px)", background: c.paper, border: `1px solid rgba(51,37,26,.18)`, boxShadow: "0 18px 40px rgba(51,37,26,.28)", padding: 18, maxWidth: 720 }}>
      <label htmlFor="svc-search" style={{ display: "block", fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: c.ink55, marginBottom: 10 }}>
        What do you need today?
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <input id="svc-search" type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder="e.g. business permit, cedula, clearance"
          style={{ flex: 1, minWidth: 220, minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, color: c.ink }} />
        <Link href={`/services?q=${encodeURIComponent(q)}`} style={{ minHeight: 48, padding: "12px 24px", background: c.terracotta, color: c.paper, fontSize: 15.5, fontWeight: 600, display: "flex", alignItems: "center", textDecoration: "none" }}>Search</Link>
      </div>

      {term && (
        <div style={{ marginTop: 14, borderTop: `1px solid rgba(51,37,26,.14)`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
          {matches.map(m => (
            <Link key={m.id} href={`/services#${m.id}`}
              style={{ padding: "11px 8px", minHeight: 44, display: "flex", flexWrap: "wrap", gap: "4px 12px", alignItems: "baseline", borderBottom: `1px solid rgba(51,37,26,.08)`, textDecoration: "none" }}>
              <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: c.ink }}>{m.name}</span>
              <span style={{ fontSize: 13.5, color: c.ink55 }}>{m.office}</span>
            </Link>
          ))}
          {!matches.length && <p style={{ margin: "6px 2px", fontSize: 14.5, color: c.ink55 }}>No service matches that. Browse all services or call (043) 740-6183.</p>}
        </div>
      )}
    </div>
  );
}
