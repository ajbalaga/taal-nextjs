import { Photo } from "@/components/Lightbox";
import { c, serif, mono } from "@/lib/theme";
import { SIGHTS, MUSEUMS, LESSER } from "@/lib/data";

export const metadata = { title: "Tourism & Heritage" };

const styles = {
  cardGrid: (min) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 18 }),
  cardArticle: { background: c.paper, border: `1px solid ${c.line}`, display: "flex", flexDirection: "column" },
  cardBody: { padding: "18px 18px 16px", display: "flex", flexDirection: "column", gap: 6 },
  cardKind: { margin: 0, fontFamily: mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: c.muted },
  cardTitle: { fontFamily: serif, fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.28 },
  cardNote: { margin: "2px 0 0", fontSize: 14.5, lineHeight: 1.6, color: c.ink70 },

  hero: { background: c.ink, color: c.paper },
  heroInner: { maxWidth: 1180, margin: "0 auto", padding: "clamp(44px,7vw,84px) 20px" },
  heroEyebrow: { fontFamily: mono, fontSize: 11.5, letterSpacing: ".2em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 14px" },
  heroTitle: { fontFamily: serif, fontSize: "clamp(30px,5.4vw,52px)", fontWeight: 600, margin: 0, lineHeight: 1.08, maxWidth: "24ch" },
  heroLede: { fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.65, color: c.onDark, maxWidth: "60ch", margin: "20px 0 0" },

  body: { maxWidth: 1180, margin: "0 auto", padding: "clamp(36px,5vw,60px) 20px clamp(48px,6vw,72px)" },
  sightsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 },
  sightArticle: { background: c.paper, border: `1px solid ${c.line}` },
  sightBody: { padding: 20 },
  sightTitle: { fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.25 },
  sightDesc: { margin: "0 0 10px", fontSize: 15, lineHeight: 1.6, color: c.ink70 },
  sightMeta: { margin: 0, fontFamily: mono, fontSize: 12.5, color: c.muted },

  section: { marginTop: "clamp(34px,5vw,54px)" },
  sectionTitle: { fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, margin: "0 0 8px" },
  sectionLede: { margin: "0 0 22px", fontSize: 16, lineHeight: 1.6, color: c.ink70, maxWidth: "64ch" },
  credit: { margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.6, color: c.muted },

  infoPanel: {
    marginTop: 34, background: c.cream, border: `1px solid ${c.line}`, padding: "28px clamp(20px,3vw,32px)",
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24
  },
  infoTitle: { fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 10px" },
  infoText: { margin: 0, fontSize: 15, lineHeight: 1.65, color: c.ink70 }
};

function CardGrid({ items, min = 258, height = 158 }) {
  return (
    <div style={styles.cardGrid(min)}>
      {items.map(x => (
        <article key={x.name} style={styles.cardArticle}>
          <Photo src={x.photo} caption={x.name} height={height} />
          <div style={styles.cardBody}>
            <p style={styles.cardKind}>{x.kind || x.street}</p>
            <h3 style={styles.cardTitle}>{x.name}</h3>
            <p style={styles.cardNote}>{x.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Tourism() {
  return (
    <>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.heroEyebrow}>Tourism &amp; heritage</p>
          <h1 style={styles.heroTitle}>
            A National Historical Landmark town
          </h1>
          <p style={styles.heroLede}>
            Taal keeps its 19th-century street grid, its ancestral houses, and the crafts that made it known:
            hand-embroidered barong Tagalog and the folding balisong.
          </p>
        </div>
      </section>

      <div style={styles.body}>
        <div style={styles.sightsGrid}>
          {SIGHTS.map(s => (
            <article key={s.name} style={styles.sightArticle}>
              <Photo src={s.photo} caption={s.name} height={172} position="center 40%" />
              <div style={styles.sightBody}>
                <h2 style={styles.sightTitle}>{s.name}</h2>
                <p style={styles.sightDesc}>{s.desc}</p>
                <p style={styles.sightMeta}>{s.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Ancestral houses &amp; museums</h2>
          <p style={styles.sectionLede}>
            Several of the town’s bahay na bato are open to visitors as house museums. Entrance fees and hours are set by each caretaker family — call ahead for group visits.
          </p>
          <CardGrid items={MUSEUMS} />
          <p style={styles.credit}>
            Photographs and descriptions from <a href="https://taal.ph/places-to-visit/" target="_blank" rel="noopener">Taal.ph, “Places to Visit”</a>.
            Replace with municipality-owned photography before launch.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>The lesser-known side</h2>
          <p style={styles.sectionLede}>
            Beyond the Basilica, restored houses, cafés and workshops sit quietly along the side streets of the Poblacion.
            Most are private property — please view them from the street unless the owners invite you in.
          </p>
          <CardGrid items={LESSER} />
          <p style={styles.credit}>
            Photographs and details © The Shoestring Diaries —{" "}
            <a href="https://shoestringdiary.wordpress.com/2026/01/29/taal-heritage-town-part-3-the-lesser-known-side/" target="_blank" rel="noopener">“Taal Heritage Town, Part 3”</a>.
            Licence or replace these before launch.
          </p>
        </section>

        <div style={styles.infoPanel}>
          <div>
            <h2 style={styles.infoTitle}>Getting here</h2>
            <p style={styles.infoText}>
              About two hours from Manila via CALAX and the Sta. Rosa–Tagaytay road, then down to Lemery and across to Taal.
              Buses to Lemery stop within a tricycle ride of the Poblacion.
            </p>
          </div>
          <div>
            <h2 style={styles.infoTitle}>Tourism office</h2>
            <p style={styles.infoText}>
              Municipal Tourism Office, ground floor, Municipal Hall · (043) 706-3368 · tourism@taal.gov.ph.
              Guided heritage walks may be arranged in advance for groups.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
