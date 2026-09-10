"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { c, serif, mono } from "@/lib/theme";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/announcements", label: "Announcements" },
  { href: "/offices", label: "Offices" },
  { href: "/officials", label: "Officials" },
  { href: "/tourism", label: "Tourism" }
];

export default function Header() {
  const path = usePathname();
  return (
    <>
      <div style={{ background: c.ink, color: c.onDark, fontSize: 12.5, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: mono }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "7px 20px", display: "flex", flexWrap: "wrap", gap: "6px 24px", justifyContent: "space-between" }}>
          <span>Republic of the Philippines · Province of Batangas</span>
          <span>Mon–Fri 8:00AM–5:00PM · (043) 740-6183</span>
        </div>
      </div>

      <header style={{ background: c.cream, borderBottom: `1px solid rgba(51,37,26,.16)` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 13, color: c.ink, textDecoration: "none" }}>
            <span style={{ width: 52, height: 52, minWidth: 52, borderRadius: "50%", background: c.ink, border: `2px solid ${c.gold}`, color: c.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 19, fontWeight: 600, letterSpacing: ".04em" }}>TL</span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontFamily: serif, fontSize: "clamp(19px,2.6vw,24px)", fontWeight: 600 }}>Municipality of Taal</span>
              <span style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: c.ink55, fontFamily: mono, marginTop: 3 }}>Batangas · Heritage Town</span>
            </span>
          </Link>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: 2, marginLeft: "auto" }}>
            {NAV.map(n => {
              const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                  style={{ padding: "12px 13px", minHeight: 44, display: "flex", alignItems: "center", fontSize: 14.5, fontWeight: 600, color: c.ink, textDecoration: "none", position: "relative" }}>
                  {n.label}
                  {active && <span style={{ position: "absolute", left: 13, right: 13, bottom: 6, height: 2, background: c.terracotta }} />}
                </Link>
              );
            })}
            <Link href="/contact" style={{ background: c.terracotta, marginLeft: 8, padding: "12px 18px", minHeight: 44, display: "flex", alignItems: "center", fontSize: 14.5, fontWeight: 600, color: c.paper, textDecoration: "none" }}>Contact</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
