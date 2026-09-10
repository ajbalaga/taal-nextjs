import Link from "next/link";
import { c, serif, mono, wrap, eyebrow, h1 } from "@/lib/theme";
import { SERVICES, FORMS } from "@/lib/data";
import FormsList from "@/components/FormsList";

export const metadata = { title: "Services & Permits" };

const styles = {
  title: { ...h1, marginBottom: 12 },
  lede: { margin: "0 0 28px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "62ch" },
  toolbar: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 },
  filterForm: { flex: 1, minWidth: 220, display: "flex" },
  filterInput: { flex: 1, minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.paper },
  submitLink: {
    minHeight: 48, padding: "12px 22px", background: c.terracotta, color: c.paper, fontSize: 15.5,
    fontWeight: 600, display: "flex", alignItems: "center", textDecoration: "none"
  },
  list: { display: "flex", flexDirection: "column", gap: 20 },
  card: { background: c.paper, border: `1px solid ${c.line}`, borderLeft: `4px solid ${c.terracotta}`, scrollMarginTop: 24 },
  cardHead: { padding: "24px clamp(18px,3vw,30px) 8px" },
  code: { fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.goldText },
  name: { fontFamily: serif, fontSize: "clamp(22px,3vw,28px)", fontWeight: 600, margin: "6px 0 8px", lineHeight: 1.2 },
  desc: { margin: 0, fontSize: 15.5, lineHeight: 1.6, color: c.ink70, maxWidth: "66ch" },
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 1, background: "rgba(51,37,26,.14)", marginTop: 18 },
  step: { padding: "20px clamp(18px,3vw,30px)" },
  stepTinted: { background: c.cream },
  stepUntinted: { background: c.paper },
  stepLabel: { fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.muted, margin: "0 0 12px" },
  reqList: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 },
  reqItem: { fontSize: 15, lineHeight: 1.5, color: c.ink },
  fee: { fontFamily: serif, fontSize: 24, fontWeight: 600, margin: "0 0 6px" },
  feeNote: { margin: 0, fontSize: 14.5, lineHeight: 1.5, color: c.ink70 },
  office: { margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink },
  window: { margin: "6px 0 0", fontSize: 14.5, color: c.ink70 },
  time: { fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 6px" },
  timeNote: { margin: 0, fontSize: 14.5, lineHeight: 1.5, color: c.ink70 },
  empty: { fontSize: 16, color: c.ink55 }
};

const Step = ({ n, label, children, tinted }) => (
  <div style={{ ...styles.step, ...(tinted ? styles.stepTinted : styles.stepUntinted) }}>
    <p style={styles.stepLabel}>{n} — {label}</p>
    {children}
  </div>
);

export default function Services({ searchParams }) {
  const q = (searchParams?.q || "").trim().toLowerCase();
  const list = q ? SERVICES.filter(s => (s.name + " " + s.code + " " + s.office + " " + s.desc).toLowerCase().includes(q)) : SERVICES;

  return (
    <div style={wrap}>
      <p style={eyebrow}>Services &amp; permits</p>
      <h1 style={styles.title}>How to transact with the Municipality</h1>
      <p style={styles.lede}>
        Bring the complete requirements to avoid a second trip. Fees are collected at the Municipal Treasurer’s Office before release.
      </p>

      <div style={styles.toolbar}>
        <form action="/services" style={styles.filterForm}>
          <input name="q" defaultValue={searchParams?.q || ""} type="search" placeholder="Filter services" style={styles.filterInput} />
        </form>
        <Link href="/contact" style={styles.submitLink}>Submit a request</Link>
      </div>

      <div style={styles.list}>
        {list.map(s => (
          <article key={s.id} id={s.id} style={styles.card}>
            <div style={styles.cardHead}>
              <span style={styles.code}>{s.code}</span>
              <h2 style={styles.name}>{s.name}</h2>
              <p style={styles.desc}>{s.desc}</p>
            </div>
            <div style={styles.stepsGrid}>
              <Step n="1" label="Requirements">
                <ul style={styles.reqList}>
                  {s.reqs.map(r => <li key={r} style={styles.reqItem}>{r}</li>)}
                </ul>
              </Step>
              <Step n="2" label="Fees">
                <p style={styles.fee}>{s.fee}</p>
                <p style={styles.feeNote}>{s.feeNote}</p>
              </Step>
              <Step n="3" label="Where to go">
                <p style={styles.office}>{s.office}</p>
                <p style={styles.window}>{s.window}</p>
              </Step>
              <Step n="4" label="Processing" tinted>
                <p style={styles.time}>{s.time}</p>
                <p style={styles.timeNote}>{s.timeNote}</p>
              </Step>
            </div>
          </article>
        ))}
        {!list.length && <p style={styles.empty}>No service matches that term.</p>}
      </div>

      <FormsList fallback={FORMS} />
    </div>
  );
}
