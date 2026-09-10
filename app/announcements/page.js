import Link from "next/link";
import { c, serif, mono, wrap, eyebrow, h1 } from "@/lib/theme";
import { getAnnouncements } from "@/lib/announcements";

export const metadata = { title: "Announcements" };
export const revalidate = 120;

const FILTERS = [
  ["all", "All notices"],
  ["advisory", "Weather & suspension"],
  ["events", "Events & fiestas"],
  ["health", "Health"]
];

const styles = {
  title: { ...h1, marginBottom: 28 },
  filterRow: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 8 },
  filterLink: (activeKey) => ({
    minHeight: 44, padding: "10px 18px", background: activeKey ? c.cream : c.paper,
    border: "1px solid rgba(51,37,26,.24)", fontSize: 14.5, fontWeight: 600, color: c.ink,
    display: "flex", alignItems: "center", textDecoration: "none"
  }),
  summary: { fontFamily: mono, fontSize: 12.5, letterSpacing: ".08em", color: c.muted, margin: "0 0 26px" },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    background: c.paper, border: `1px solid ${c.line}`, padding: "24px clamp(18px,3vw,28px)",
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px 28px"
  },
  cardMeta: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 },
  tag: { fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", background: c.ink, color: c.cream, padding: "4px 9px" },
  date: { fontFamily: mono, fontSize: 12.5, color: c.muted },
  cardTitle: { fontFamily: serif, fontSize: "clamp(20px,2.6vw,25px)", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.25 },
  blurb: { margin: 0, fontSize: 15.5, lineHeight: 1.6, color: c.ink70, maxWidth: "60ch" },
  sourceCol: { borderLeft: "1px solid rgba(51,37,26,.14)", paddingLeft: 20 },
  sourceLabel: { fontFamily: mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" },
  sourceText: { margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink }
};

export default async function Announcements({ searchParams }) {
  const cat = searchParams?.cat || "all";
  const news = await getAnnouncements(cat);
  const label = (FILTERS.find(f => f[0] === cat) || FILTERS[0])[1];

  return (
    <div style={wrap}>
      <p style={eyebrow}>Announcements</p>
      <h1 style={styles.title}>Public notices and advisories</h1>

      <div style={styles.filterRow}>
        {FILTERS.map(([key, text]) => (
          <Link key={key} href={key === "all" ? "/announcements" : `/announcements?cat=${key}`} style={styles.filterLink(key === cat)}>
            {text}
          </Link>
        ))}
      </div>
      <p style={styles.summary}>
        Showing: {label} · {news.length} notices
      </p>

      <div style={styles.list}>
        {news.map(n => (
          <article key={n._id || n.title} style={styles.card}>
            <div>
              <div style={styles.cardMeta}>
                <span style={styles.tag}>{n.tag}</span>
                <span style={styles.date}>{n.date}</span>
              </div>
              <h2 style={styles.cardTitle}>{n.title}</h2>
              <p style={styles.blurb}>{n.blurb}</p>
            </div>
            <div style={styles.sourceCol}>
              <p style={styles.sourceLabel}>Issued by</p>
              <p style={styles.sourceText}>{n.source}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
