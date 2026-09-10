import Link from "next/link";
import { c, serif, mono } from "@/lib/theme";

const HOTLINES = [
  ["MDRRMO", "(043) 706-3504"],
  ["Ambulance", "(043) 706-4492"],
  ["PNP Taal", "0905 349 3734"],
  ["Fire Protection", "0921 726 2470"],
  ["Rural Health Unit", "(043) 706-3391"]
];

const LINKS = [
  ["/services", "Services & permits"],
  ["/announcements", "Announcements"],
  ["/offices", "Office directory"],
  ["/contact", "Contact & feedback"]
];

const styles = {
  footer: { background: c.ink, color: c.onDark, marginTop: "auto" },
  grid: {
    maxWidth: 1180, margin: "0 auto", padding: "clamp(34px,5vw,52px) 20px 22px",
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28
  },
  brandTitle: { fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 10px", color: c.paper },
  address: { margin: 0, fontSize: 14.5, lineHeight: 1.7, color: c.onDarkMuted },
  columnHeading: { fontFamily: mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 12px" },
  hotlines: { margin: 0, fontSize: 14.5, lineHeight: 1.85, color: c.onDarkMuted },
  linksCol: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 },
  link: { padding: "8px 0", minHeight: 40, fontSize: 14.5, color: c.onDarkMuted, textDecoration: "none" },
  bottomBar: { borderTop: "1px solid rgba(241,230,208,.2)" },
  bottomBarInner: {
    maxWidth: 1180, margin: "0 auto", padding: "16px 20px", fontFamily: mono,
    fontSize: 11.5, letterSpacing: ".08em", color: "#B9A488", textTransform: "uppercase"
  }
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
          <p style={styles.brandTitle}>Municipality of Taal</p>
          <p style={styles.address}>
            Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />(043) 740-6183
          </p>
        </div>
        <div>
          <p style={styles.columnHeading}>Emergency hotlines</p>
          <p style={styles.hotlines}>
            {HOTLINES.map(([k, v]) => <span key={k}>{k} — {v}<br /></span>)}
          </p>
        </div>
        <div>
          <p style={styles.columnHeading}>Quick links</p>
          <div style={styles.linksCol}>
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} style={styles.link}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <div style={styles.bottomBarInner}>
          © {new Date().getFullYear()} Local Government of Taal, Batangas
        </div>
      </div>
    </footer>
  );
}
