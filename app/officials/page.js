import { Photo } from "@/components/Lightbox";
import { c, serif, mono, wrap, eyebrow, h1 } from "@/lib/theme";
import { COUNCIL, SBPHOTOS, OFFICES } from "@/lib/data";

export const metadata = { title: "Elected Officials" };

const MAYOR_FULL = "https://news.taal.gov.ph/wp-content/uploads/2016/08/Mayor.jpg";
const VICE_FULL = "https://news.taal.gov.ph/wp-content/uploads/2016/08/vice-mayor.jpg";

const styles = {
  title: { ...h1, marginBottom: 30 },
  leadCard: (tinted, accent) => ({
    background: tinted ? c.cream : c.paper, border: `1px solid ${c.line}`, borderTop: `3px solid ${accent}`,
    padding: "26px 24px", display: "flex", gap: 20, flexWrap: "wrap"
  }),
  leadThumb: { width: 112 },
  leadBody: { flex: 1, minWidth: 170 },
  leadTitle: (tinted) => ({ fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: tinted ? c.terracottaDark : c.muted, margin: "0 0 8px" }),
  leadName: { fontFamily: serif, fontSize: 26, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.2 },
  leadBlurb: { margin: 0, fontSize: 15, lineHeight: 1.6, color: c.ink70 },

  leadsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 16 },
  sectionTitle: { fontFamily: serif, fontSize: "clamp(21px,2.8vw,26px)", fontWeight: 600, margin: "34px 0 14px" },
  sbGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginBottom: 18 },
  listPanel: { border: `1px solid ${c.line}`, background: c.paper },
  listRow: { display: "flex", flexWrap: "wrap", gap: "6px 20px", justifyContent: "space-between", alignItems: "baseline", padding: "14px clamp(16px,2.5vw,24px)", borderBottom: `1px solid ${c.lineSoft}` },
  listName: { fontFamily: serif, fontSize: 17.5, fontWeight: 600, color: c.ink },
  listRole: { fontSize: 14.5, color: c.ink70 },
  footnote: { margin: "16px 0 0", fontSize: 14, color: c.muted, lineHeight: 1.6 }
};

function Lead({ title, name, blurb, thumb, full, tinted, accent }) {
  return (
    <div style={styles.leadCard(tinted, accent)}>
      <div style={styles.leadThumb}>
        <Photo src={thumb} caption={name} height={150} position="center top" fullSrc={full} />
      </div>
      <div style={styles.leadBody}>
        <p style={styles.leadTitle(tinted)}>{title}</p>
        <h2 style={styles.leadName}>{name}</h2>
        <p style={styles.leadBlurb}>{blurb}</p>
      </div>
    </div>
  );
}

export default function Officials() {
  const heads = OFFICES.filter(o => o.head && o.head !== "—");

  return (
    <div style={wrap}>
      <p style={eyebrow}>Local government</p>
      <h1 style={styles.title}>Elected officials</h1>

      <div style={styles.leadsGrid}>
        <Lead tinted accent={c.terracotta} title="Municipal Mayor" name="Fulgencio I. Mercado"
          thumb="https://news.taal.gov.ph/wp-content/uploads/2016/08/Mayor-225x300.jpg" full={MAYOR_FULL}
          blurb="Chief executive of the municipality. Office of the Mayor, Municipal Hall · (043) 740-6183 · mayor@taal.gov.ph" />
        <Lead accent={c.gold} title="Municipal Vice Mayor" name="Jovito M. Albufera"
          thumb="https://news.taal.gov.ph/wp-content/uploads/2016/08/vice-mayor-225x300.jpg" full={VICE_FULL}
          blurb="Presiding officer of the Sangguniang Bayan · (043) 740-6181 · vicemayor@taal.gov.ph" />
      </div>

      <h2 style={styles.sectionTitle}>Sangguniang Bayan</h2>
      <div style={styles.sbGrid}>
        {SBPHOTOS.map(src => (
          <Photo key={src} src={src} caption="Sangguniang Bayan of Taal" ratio="4/3" />
        ))}
      </div>
      <div style={styles.listPanel}>
        {COUNCIL.map(m => (
          <div key={m.name} style={styles.listRow}>
            <span style={styles.listName}>{m.name}</span>
            <span style={styles.listRole}>{m.role}</span>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Department heads</h2>
      <div style={styles.listPanel}>
        {heads.map(o => (
          <div key={o.name} style={styles.listRow}>
            <span style={styles.listName}>{o.head}</span>
            <span style={styles.listRole}>{o.name}</span>
          </div>
        ))}
      </div>
      <p style={styles.footnote}>
        Names, portraits, and contacts follow the municipality’s own published pages (Municipal Officials and LGU Directory, news.taal.gov.ph).
      </p>
    </div>
  );
}
