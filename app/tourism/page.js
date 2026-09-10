import { Photo } from "@/components/Lightbox";
import { c, serif, mono } from "@/lib/theme";
import { SIGHTS, MUSEUMS, LESSER } from "@/lib/data";

export const metadata = { title: "Tourism & Heritage" };

function CardGrid({ items, min = 258, height = 158 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 18 }}>
      {items.map(x => (
        <article key={x.name} style={{ background: c.paper, border: `1px solid ${c.line}`, display: "flex", flexDirection: "column" }}>
          <Photo src={x.photo} caption={x.name} height={height} />
          <div style={{ padding: "18px 18px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ margin: 0, fontFamily: mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: c.muted }}>{x.kind || x.street}</p>
            <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.28 }}>{x.name}</h3>
            <p style={{ margin: "2px 0 0", fontSize: 14.5, lineHeight: 1.6, color: c.ink70 }}>{x.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Tourism() {
  return (
    <>
      <section style={{ background: c.ink, color: c.paper }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(44px,7vw,84px) 20px" }}>
          <p style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: ".2em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 14px" }}>Tourism &amp; heritage</p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(30px,5.4vw,52px)", fontWeight: 600, margin: 0, lineHeight: 1.08, maxWidth: "24ch" }}>
            A National Historical Landmark town
          </h1>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.65, color: c.onDark, maxWidth: "60ch", margin: "20px 0 0" }}>
            Taal keeps its 19th-century street grid, its ancestral houses, and the crafts that made it known:
            hand-embroidered barong Tagalog and the folding balisong.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(36px,5vw,60px) 20px clamp(48px,6vw,72px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {SIGHTS.map(s => (
            <article key={s.name} style={{ background: c.paper, border: `1px solid ${c.line}` }}>
              <Photo src={s.photo} caption={s.name} height={172} position="center 40%" />
              <div style={{ padding: 20 }}>
                <h2 style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.25 }}>{s.name}</h2>
                <p style={{ margin: "0 0 10px", fontSize: 15, lineHeight: 1.6, color: c.ink70 }}>{s.desc}</p>
                <p style={{ margin: 0, fontFamily: mono, fontSize: 12.5, color: c.muted }}>{s.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <section style={{ marginTop: "clamp(34px,5vw,54px)" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, margin: "0 0 8px" }}>Ancestral houses &amp; museums</h2>
          <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.6, color: c.ink70, maxWidth: "64ch" }}>
            Several of the town’s bahay na bato are open to visitors as house museums. Entrance fees and hours are set by each caretaker family — call ahead for group visits.
          </p>
          <CardGrid items={MUSEUMS} />
          <p style={{ margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.6, color: c.muted }}>
            Photographs and descriptions from <a href="https://taal.ph/places-to-visit/" target="_blank" rel="noopener">Taal.ph, “Places to Visit”</a>.
            Replace with municipality-owned photography before launch.
          </p>
        </section>

        <section style={{ marginTop: "clamp(34px,5vw,54px)" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, margin: "0 0 8px" }}>The lesser-known side</h2>
          <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.6, color: c.ink70, maxWidth: "64ch" }}>
            Beyond the Basilica, restored houses, cafés and workshops sit quietly along the side streets of the Poblacion.
            Most are private property — please view them from the street unless the owners invite you in.
          </p>
          <CardGrid items={LESSER} />
          <p style={{ margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.6, color: c.muted }}>
            Photographs and details © The Shoestring Diaries —{" "}
            <a href="https://shoestringdiary.wordpress.com/2026/01/29/taal-heritage-town-part-3-the-lesser-known-side/" target="_blank" rel="noopener">“Taal Heritage Town, Part 3”</a>.
            Licence or replace these before launch.
          </p>
        </section>

        <div style={{ marginTop: 34, background: c.cream, border: `1px solid ${c.line}`, padding: "28px clamp(20px,3vw,32px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 10px" }}>Getting here</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: c.ink70 }}>
              About two hours from Manila via CALAX and the Sta. Rosa–Tagaytay road, then down to Lemery and across to Taal.
              Buses to Lemery stop within a tricycle ride of the Poblacion.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 10px" }}>Tourism office</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: c.ink70 }}>
              Municipal Tourism Office, ground floor, Municipal Hall · (043) 706-3368 · tourism@taal.gov.ph.
              Guided heritage walks may be arranged in advance for groups.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
