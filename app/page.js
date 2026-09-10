import Link from "next/link";
import ServiceSearch from "@/components/ServiceSearch";
import { Photo } from "@/components/Lightbox";
import { c, serif, mono } from "@/lib/theme";
import { SERVICES } from "@/lib/data";
import { getAnnouncements } from "@/lib/announcements";

export const revalidate = 300;

export default async function Home() {
  const news = (await getAnnouncements()).slice(0, 3);

  return (
    <>
      <section style={{ position: "relative", background: c.ink, overflow: "hidden" }}>
        <img src="/images/basilica-san-martin.png" alt="Basilica de San Martin de Tours"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(51,37,26,.5) 0%,rgba(51,37,26,.72) 55%,rgba(51,37,26,.9) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "clamp(56px,9vw,104px) 20px clamp(40px,6vw,64px)" }}>
          <p style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 18px" }}>Official website</p>
          <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(34px,6.2vw,62px)", lineHeight: 1.06, color: c.paper, margin: 0, maxWidth: "20ch", textWrap: "pretty" }}>
            The Heritage Town of Taal
          </h1>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: c.onDark, maxWidth: "56ch", margin: "20px 0 0" }}>
            Serving the residents of forty barangays with clear, complete instructions for every transaction at the Municipal Hall.
          </p>
          <ServiceSearch />
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(40px,6vw,68px) 20px 0" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(24px,3.2vw,32px)", fontWeight: 600, margin: "0 0 6px" }}>Frequently requested</h2>
        <p style={{ margin: "0 0 26px", color: c.ink55, fontSize: 16 }}>Each page lists requirements, fees, the window to visit, and processing time.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(238px,1fr))", gap: 16 }}>
          {SERVICES.map(s => (
            <Link key={s.id} href={`/services#${s.id}`}
              style={{ background: c.paper, border: `1px solid ${c.line}`, borderTop: `3px solid ${c.terracotta}`, padding: "22px 20px 20px", display: "flex", flexDirection: "column", gap: 8, minHeight: 150, textDecoration: "none" }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.goldText }}>{s.code}</span>
              <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: c.ink }}>{s.name}</span>
              <span style={{ fontSize: 14.5, color: c.ink55, lineHeight: 1.5, marginTop: "auto" }}>{s.time}</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(40px,6vw,68px) 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,4vw,48px)" }}>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "baseline", justifyContent: "space-between", borderBottom: `2px solid ${c.ink}`, paddingBottom: 10, marginBottom: 20 }}>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,28px)", fontWeight: 600, margin: 0 }}>Announcements</h2>
              <Link href="/announcements" style={{ fontSize: 14.5, fontWeight: 600 }}>View all →</Link>
            </div>
            {news.map(n => (
              <article key={n.title} style={{ padding: "16px 0", borderBottom: `1px solid rgba(51,37,26,.14)`, display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", background: c.cream, color: c.ink55, padding: "4px 9px" }}>{n.tag}</span>
                  <span style={{ fontFamily: mono, fontSize: 12.5, color: c.muted }}>{n.date}</span>
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{n.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink70 }}>{n.blurb}</p>
              </article>
            ))}
          </div>

          <div>
            <div style={{ background: c.cream, border: `1px solid ${c.line}`, padding: "26px 24px" }}>
              <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, margin: "0 0 10px" }}>Visiting Taal</h2>
              <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.6, color: c.ink70 }}>
                A declared National Historical Landmark: the Basilica, the ancestral houses along Calle Agoncillo, and the town’s embroidery and balisong trades.
              </p>
              <Photo src="/images/basilica-san-martin.png" caption="Basilica de San Martin de Tours" height={170} position="center 40%" />
              <Link href="/tourism" style={{ marginTop: 18, minHeight: 48, background: c.ink, color: c.paper, fontSize: 15.5, fontWeight: 600, padding: 12, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>Discover Taal</Link>
            </div>
            <div style={{ marginTop: 18, border: `1px solid ${c.line}`, padding: "22px 24px", background: c.paper }}>
              <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, margin: "0 0 12px" }}>Municipal Hall</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: c.ink70 }}>
                Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />Monday to Friday, 8:00AM–5:00PM
              </p>
              <Link href="/offices" style={{ display: "inline-block", marginTop: 14, fontSize: 14.5, fontWeight: 600 }}>Office directory →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
