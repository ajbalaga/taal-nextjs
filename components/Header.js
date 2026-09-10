"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { c, serif, mono } from "@/lib/theme";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/announcements", label: "Announcements" },
  { href: "/offices", label: "Offices" },
  { href: "/officials", label: "Officials" },
  { href: "/tourism", label: "Tourism" }
];

const styles = {
  topBar: {
    background: c.ink, color: c.onDark, fontSize: 12.5, letterSpacing: ".06em",
    textTransform: "uppercase", fontFamily: mono
  },
  topBarInner: {
    maxWidth: 1180, margin: "0 auto", padding: "7px 20px",
    display: "flex", flexWrap: "wrap", gap: "6px 24px", justifyContent: "space-between"
  },
  header: { background: c.cream, borderBottom: "1px solid rgba(51,37,26,.16)" },
  headerInner: {
    maxWidth: 1180, margin: "0 auto", padding: "14px 20px",
    display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px"
  },
  brand: { display: "flex", alignItems: "center", gap: 13, color: c.ink, textDecoration: "none" },
  brandMark: {
    width: 52, height: 52, minWidth: 52, borderRadius: "50%", background: c.ink,
    border: `2px solid ${c.gold}`, color: c.cream, display: "flex", alignItems: "center",
    justifyContent: "center", fontFamily: serif, fontSize: 19, fontWeight: 600, letterSpacing: ".04em"
  },
  brandText: { display: "flex", flexDirection: "column", lineHeight: 1.15 },
  brandTitle: { fontFamily: serif, fontSize: "clamp(19px,2.6vw,24px)", fontWeight: 600 },
  brandSubtitle: {
    fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase",
    color: c.ink55, fontFamily: mono, marginTop: 3
  },

  desktopNav: { display: "flex", alignItems: "center", gap: 2, marginLeft: "auto", flexWrap: "wrap" },
  navLink: {
    padding: "12px 13px", minHeight: 44, display: "flex", alignItems: "center",
    fontSize: 14.5, fontWeight: 600, color: c.ink, textDecoration: "none", position: "relative"
  },
  navLinkIndicator: { position: "absolute", left: 13, right: 13, bottom: 6, height: 2, background: c.terracotta },
  contactLink: {
    background: c.terracotta, marginLeft: 8, padding: "12px 18px", minHeight: 44,
    display: "flex", alignItems: "center", fontSize: 14.5, fontWeight: 600,
    color: c.paper, textDecoration: "none"
  },

  toggleButton: {
    marginLeft: "auto", background: "transparent", border: "1px solid rgba(51,37,26,.3)",
    width: 44, height: 44, alignItems: "center", justifyContent: "center",
    flexDirection: "column", gap: 5
  },
  toggleBar: { width: 20, height: 2, background: c.ink, transition: "transform .2s" },

  mobileNav: { flexDirection: "column", borderTop: "1px solid rgba(51,37,26,.16)", background: c.cream },
  mobileNavLink: {
    padding: "14px 20px", minHeight: 48, display: "flex", alignItems: "center",
    fontSize: 16, fontWeight: 600, color: c.ink, textDecoration: "none",
    borderBottom: "1px solid rgba(51,37,26,.1)"
  },
  mobileNavLinkActive: { color: c.terracotta },
  mobileContactLink: {
    background: c.terracotta, padding: "14px 20px", minHeight: 48,
    display: "flex", alignItems: "center", fontSize: 16, fontWeight: 600,
    color: c.paper, textDecoration: "none"
  }
};

function isActive(path, href) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      <div style={styles.topBar}>
        <div style={styles.topBarInner}>
          <span>Republic of the Philippines · Province of Batangas</span>
          <span>Mon–Fri 8:00AM–5:00PM · (043) 740-6183</span>
        </div>
      </div>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link href="/" style={styles.brand}>
            <span style={styles.brandMark}>TL</span>
            <span style={styles.brandText}>
              <span style={styles.brandTitle}>Municipality of Taal</span>
              <span style={styles.brandSubtitle}>Batangas · Heritage Town</span>
            </span>
          </Link>

          <nav className="nav-desktop" style={styles.desktopNav}>
            {NAV.map(n => {
              const active = isActive(path, n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} style={styles.navLink}>
                  {n.label}
                  {active && <span style={styles.navLinkIndicator} />}
                </Link>
              );
            })}
            <Link href="/contact" style={styles.contactLink}>Contact</Link>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(o => !o)}
            style={styles.toggleButton}
          >
            <span style={{ ...styles.toggleBar, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ ...styles.toggleBar, opacity: open ? 0 : 1, transition: "opacity .2s" }} />
            <span style={{ ...styles.toggleBar, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        <nav id="mobile-nav" className="nav-mobile" data-open={open} style={styles.mobileNav}>
          {NAV.map(n => {
            const active = isActive(path, n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                style={{ ...styles.mobileNavLink, ...(active && styles.mobileNavLinkActive) }}>
                {n.label}
              </Link>
            );
          })}
          <Link href="/contact" style={styles.mobileContactLink}>Contact</Link>
        </nav>
      </header>
    </>
  );
}
