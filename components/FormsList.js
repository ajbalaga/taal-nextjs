import { c, serif, mono } from "@/lib/theme";
import { collections } from "@/lib/mongodb";
import { publicUrl } from "@/lib/r2";

// Forms live in /public/forms until staff need to upload without a deploy;
// once R2 is configured, uploaded files are recorded in the "forms" collection
// and served from the R2 public bucket.
async function loadForms(fallback) {
  try {
    const { forms } = await collections();
    const docs = await forms.find({}).sort({ name: 1 }).toArray();
    if (docs.length) return docs.map(d => ({ name: d.name, meta: d.meta, href: d.key ? publicUrl(d.key) : d.href }));
  } catch (err) {
    console.error("forms: falling back to static list —", err.message);
  }
  return fallback.map(f => ({ ...f, href: `/forms/${f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf` }));
}

export default async function FormsList({ fallback }) {
  const forms = await loadForms(fallback);
  return (
    <div style={{ marginTop: 36, background: c.cream, border: `1px solid ${c.line}`, padding: "26px clamp(20px,3vw,30px)" }}>
      <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>Downloadable forms</h2>
      <p style={{ margin: "0 0 18px", fontSize: 15, color: c.ink70 }}>Print and fill out before visiting the Hall.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
        {forms.map(f => (
          <a key={f.name} href={f.href} download style={{ background: c.paper, border: "1px solid rgba(51,37,26,.2)", padding: "14px 16px", minHeight: 44, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, color: c.ink, textDecoration: "none" }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: c.muted }}>{f.meta}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
