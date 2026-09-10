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

export default async function Announcements({ searchParams }) {
  const cat = searchParams?.cat || "all";
  const news = await getAnnouncements(cat);
  const label = (FILTERS.find(f => f[0] === cat) || FILTERS[0])[1];

  return (
    <div style={wrap}>
      <p style={eyebrow}>Announcements</p>
      <h1 style={{ ...h1, marginBottom: 28 }}>Public notices and advisories</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 8 }}>
        {FILTERS.map(([key, text]) => (
          <Link key={key} href={key === "all" ? "/announcements" : `/announcements?cat=${key}`}
            style={{ minHeight: 44, padding: "10px 18px", background: key === cat ? c.cream : c.paper, border: "1px solid rgba(51,37,26,.24)", fontSize: 14.5, fontWeight: 600, color: c.ink, display: "flex", alignItems: "center", textDecoration: "none" }}>
            {text}
          </Link>
        ))}
      </div>
      <p style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: ".08em", color: c.muted, margin: "0 0 26px" }}>
        Showing: {label} · {news.length} notices
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {news.map(n => (
          <article key={n._id || n.title} style={{ background: c.paper, border: `1px solid ${c.line}`, padding: "24px clamp(18px,3vw,28px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px 28px" }}>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", background: c.ink, color: c.cream, padding: "4px 9px" }}>{n.tag}</span>
                <span style={{ fontFamily: mono, fontSize: 12.5, color: c.muted }}>{n.date}</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(20px,2.6vw,25px)", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.25 }}>{n.title}</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: c.ink70, maxWidth: "60ch" }}>{n.blurb}</p>
            </div>
            <div style={{ borderLeft: `1px solid rgba(51,37,26,.14)`, paddingLeft: 20 }}>
              <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>Issued by</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink }}>{n.source}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
