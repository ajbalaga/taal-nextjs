import { c, serif, mono, wrap, eyebrow, h1 } from "@/lib/theme";
import { OFFICES, BARANGAYS } from "@/lib/data";

export const metadata = { title: "Offices & Directory" };

export default function Offices() {
  return (
    <div style={wrap}>
      <p style={eyebrow}>Directory</p>
      <h1 style={{ ...h1, marginBottom: 12 }}>Offices and hours</h1>
      <p style={{ margin: "0 0 30px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "64ch" }}>
        Offices are at the Municipal Hall, Calle A. Agoncillo, Poblacion, unless noted, and open Monday to Friday, 8:00AM–5:00PM.
        Numbers and department heads follow the LGU directory published by the municipality.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(272px,1fr))", gap: 16 }}>
        {OFFICES.map(o => (
          <div key={o.name} style={{ background: c.paper, border: `1px solid ${c.line}`, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ fontFamily: serif, fontSize: 19.5, fontWeight: 600, margin: 0, lineHeight: 1.25 }}>{o.name}</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: c.ink70 }}>{o.does}</p>
            <p style={{ margin: "4px 0 0", fontSize: 14.5, fontWeight: 600, color: c.ink, lineHeight: 1.45 }}>{o.head}</p>
            <p style={{ margin: "4px 0 0", fontFamily: mono, fontSize: 12.5, color: c.muted, lineHeight: 1.7 }}>
              {o.phone}<br />{o.email}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,28px)", fontWeight: 600, margin: "0 0 6px" }}>Barangays</h2>
        <p style={{ margin: "0 0 18px", fontSize: 15.5, color: c.ink70 }}>Barangay clearances and certificates are issued at the barangay hall of residence.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "rgba(51,37,26,.14)", border: `1px solid rgba(51,37,26,.14)` }}>
          {BARANGAYS.map(b => (
            <div key={b} style={{ background: c.paper, padding: "11px 14px", fontSize: 14.5, color: c.ink }}>{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
