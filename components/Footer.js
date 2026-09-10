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

export default function Footer() {
  return (
    <footer style={{ background: c.ink, color: c.onDark, marginTop: "auto" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(34px,5vw,52px) 20px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28 }}>
        <div>
          <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 10px", color: c.paper }}>Municipality of Taal</p>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: c.onDarkMuted }}>
            Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />(043) 740-6183
          </p>
        </div>
        <div>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 12px" }}>Emergency hotlines</p>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.85, color: c.onDarkMuted }}>
            {HOTLINES.map(([k, v]) => <span key={k}>{k} — {v}<br /></span>)}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 12px" }}>Quick links</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} style={{ padding: "8px 0", minHeight: 40, fontSize: 14.5, color: c.onDarkMuted, textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(241,230,208,.2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px", fontFamily: mono, fontSize: 11.5, letterSpacing: ".08em", color: "#B9A488", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Local Government of Taal, Batangas
        </div>
      </div>
    </footer>
  );
}
