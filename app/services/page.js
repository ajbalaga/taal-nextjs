import Link from "next/link";
import { c, serif, mono, wrap, eyebrow, h1 } from "@/lib/theme";
import { SERVICES, FORMS } from "@/lib/data";
import FormsList from "@/components/FormsList";

export const metadata = { title: "Services & Permits" };

const Step = ({ n, label, children, tinted }) => (
  <div style={{ background: tinted ? c.cream : c.paper, padding: "20px clamp(18px,3vw,30px)" }}>
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.muted, margin: "0 0 12px" }}>{n} — {label}</p>
    {children}
  </div>
);

export default function Services({ searchParams }) {
  const q = (searchParams?.q || "").trim().toLowerCase();
  const list = q ? SERVICES.filter(s => (s.name + " " + s.code + " " + s.office + " " + s.desc).toLowerCase().includes(q)) : SERVICES;

  return (
    <div style={wrap}>
      <p style={eyebrow}>Services &amp; permits</p>
      <h1 style={{ ...h1, marginBottom: 12 }}>How to transact with the Municipality</h1>
      <p style={{ margin: "0 0 28px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "62ch" }}>
        Bring the complete requirements to avoid a second trip. Fees are collected at the Municipal Treasurer’s Office before release.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
        <form action="/services" style={{ flex: 1, minWidth: 220, display: "flex" }}>
          <input name="q" defaultValue={searchParams?.q || ""} type="search" placeholder="Filter services"
            style={{ flex: 1, minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.paper }} />
        </form>
        <Link href="/contact" style={{ minHeight: 48, padding: "12px 22px", background: c.terracotta, color: c.paper, fontSize: 15.5, fontWeight: 600, display: "flex", alignItems: "center", textDecoration: "none" }}>Submit a request</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {list.map(s => (
          <article key={s.id} id={s.id} style={{ background: c.paper, border: `1px solid ${c.line}`, borderLeft: `4px solid ${c.terracotta}`, scrollMarginTop: 24 }}>
            <div style={{ padding: "24px clamp(18px,3vw,30px) 8px" }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.goldText }}>{s.code}</span>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,28px)", fontWeight: 600, margin: "6px 0 8px", lineHeight: 1.2 }}>{s.name}</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: c.ink70, maxWidth: "66ch" }}>{s.desc}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 1, background: "rgba(51,37,26,.14)", marginTop: 18 }}>
              <Step n="1" label="Requirements">
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                  {s.reqs.map(r => <li key={r} style={{ fontSize: 15, lineHeight: 1.5, color: c.ink }}>{r}</li>)}
                </ul>
              </Step>
              <Step n="2" label="Fees">
                <p style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, margin: "0 0 6px" }}>{s.fee}</p>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: c.ink70 }}>{s.feeNote}</p>
              </Step>
              <Step n="3" label="Where to go">
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink }}>{s.office}</p>
                <p style={{ margin: "6px 0 0", fontSize: 14.5, color: c.ink70 }}>{s.window}</p>
              </Step>
              <Step n="4" label="Processing" tinted>
                <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 6px" }}>{s.time}</p>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: c.ink70 }}>{s.timeNote}</p>
              </Step>
            </div>
          </article>
        ))}
        {!list.length && <p style={{ fontSize: 16, color: c.ink55 }}>No service matches that term.</p>}
      </div>

      <FormsList fallback={FORMS} />
    </div>
  );
}
