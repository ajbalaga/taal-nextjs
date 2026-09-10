"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { c, serif, mono } from "@/lib/theme";
import { SERVICES } from "@/lib/data";

const styles = {
  panel: {
    marginTop: "clamp(28px,4vw,40px)", background: c.paper, border: "1px solid rgba(51,37,26,.18)",
    boxShadow: "0 18px 40px rgba(51,37,26,.28)", padding: 18, maxWidth: 720
  },
  label: {
    display: "block", fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em",
    textTransform: "uppercase", color: c.ink55, marginBottom: 10
  },
  row: { display: "flex", flexWrap: "wrap", gap: 10 },
  input: {
    flex: 1, minWidth: 220, minHeight: 48, padding: "12px 14px",
    border: "1px solid rgba(51,37,26,.3)", background: c.ivory, color: c.ink
  },
  searchLink: {
    minHeight: 48, padding: "12px 24px", background: c.terracotta, color: c.paper,
    fontSize: 15.5, fontWeight: 600, display: "flex", alignItems: "center", textDecoration: "none"
  },
  results: {
    marginTop: 14, borderTop: "1px solid rgba(51,37,26,.14)", paddingTop: 12,
    display: "flex", flexDirection: "column", gap: 2
  },
  resultLink: {
    padding: "11px 8px", minHeight: 44, display: "flex", flexWrap: "wrap", gap: "4px 12px",
    alignItems: "baseline", borderBottom: "1px solid rgba(51,37,26,.08)", textDecoration: "none"
  },
  resultName: { fontFamily: serif, fontSize: 17, fontWeight: 600, color: c.ink },
  resultOffice: { fontSize: 13.5, color: c.ink55 },
  empty: { margin: "6px 2px", fontSize: 14.5, color: c.ink55 }
};

export default function ServiceSearch() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const matches = useMemo(
    () => term ? SERVICES.filter(s => (s.name + " " + s.code + " " + s.office + " " + s.desc).toLowerCase().includes(term)) : [],
    [term]
  );

  return (
    <div style={styles.panel}>
      <label htmlFor="svc-search" style={styles.label}>
        What do you need today?
      </label>
      <div style={styles.row}>
        <input id="svc-search" type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder="e.g. business permit, cedula, clearance" style={styles.input} />
        <Link href={`/services?q=${encodeURIComponent(q)}`} style={styles.searchLink}>Search</Link>
      </div>

      {term && (
        <div style={styles.results}>
          {matches.map(m => (
            <Link key={m.id} href={`/services#${m.id}`} style={styles.resultLink}>
              <span style={styles.resultName}>{m.name}</span>
              <span style={styles.resultOffice}>{m.office}</span>
            </Link>
          ))}
          {!matches.length && <p style={styles.empty}>No service matches that. Browse all services or call (043) 740-6183.</p>}
        </div>
      )}
    </div>
  );
}
