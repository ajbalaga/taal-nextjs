import Link from "next/link";
import ServiceSearch from "@/components/ServiceSearch";
import { Photo } from "@/components/Lightbox";
import { c, serif, mono } from "@/lib/theme";
import { SERVICES } from "@/lib/data";
import { getAnnouncements } from "@/lib/announcements";

export const revalidate = 300;

const styles = {
  hero: { position: "relative", background: c.ink, overflow: "hidden" },
  heroImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(51,37,26,.5) 0%,rgba(51,37,26,.72) 55%,rgba(51,37,26,.9) 100%)" },
  heroInner: { position: "relative", maxWidth: 1180, margin: "0 auto", padding: "clamp(56px,9vw,104px) 20px clamp(40px,6vw,64px)" },
  heroEyebrow: { fontFamily: mono, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: c.goldLight, margin: "0 0 18px" },
  heroTitle: { fontFamily: serif, fontWeight: 600, fontSize: "clamp(34px,6.2vw,62px)", lineHeight: 1.06, color: c.paper, margin: 0, maxWidth: "20ch", textWrap: "pretty" },
  heroLede: { fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: c.onDark, maxWidth: "56ch", margin: "20px 0 0" },

  section: { maxWidth: 1180, margin: "0 auto", padding: "clamp(40px,6vw,68px) 20px 0" },
  sectionTitle: { fontFamily: serif, fontSize: "clamp(24px,3.2vw,32px)", fontWeight: 600, margin: "0 0 6px" },
  sectionSubtitle: { margin: "0 0 26px", color: c.ink55, fontSize: 16 },
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(238px,1fr))", gap: 16 },
  serviceCard: {
    background: c.paper, border: `1px solid ${c.line}`, borderTop: `3px solid ${c.terracotta}`,
    padding: "22px 20px 20px", display: "flex", flexDirection: "column", gap: 8, minHeight: 150, textDecoration: "none"
  },
  serviceCode: { fontFamily: mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.goldText },
  serviceName: { fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: c.ink },
  serviceTime: { fontSize: 14.5, color: c.ink55, lineHeight: 1.5, marginTop: "auto" },

  lowerSection: { maxWidth: 1180, margin: "0 auto", padding: "clamp(40px,6vw,68px) 20px" },
  lowerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,4vw,48px)" },
  newsHeader: {
    display: "flex", flexWrap: "wrap", gap: 12, alignItems: "baseline", justifyContent: "space-between",
    borderBottom: `2px solid ${c.ink}`, paddingBottom: 10, marginBottom: 20
  },
  newsHeaderTitle: { fontFamily: serif, fontSize: "clamp(22px,3vw,28px)", fontWeight: 600, margin: 0 },
  viewAllLink: { fontSize: 14.5, fontWeight: 600 },
  newsItem: { padding: "16px 0", borderBottom: "1px solid rgba(51,37,26,.14)", display: "flex", flexDirection: "column", gap: 7 },
  newsMeta: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" },
  newsTag: { fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", background: c.cream, color: c.ink55, padding: "4px 9px" },
  newsDate: { fontFamily: mono, fontSize: 12.5, color: c.muted },
  newsTitle: { fontFamily: serif, fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.3 },
  newsBlurb: { margin: 0, fontSize: 15, lineHeight: 1.55, color: c.ink70 },

  visitCard: { background: c.cream, border: `1px solid ${c.line}`, padding: "26px 24px" },
  visitTitle: { fontFamily: serif, fontSize: 24, fontWeight: 600, margin: "0 0 10px" },
  visitBlurb: { margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.6, color: c.ink70 },
  visitCta: {
    marginTop: 18, minHeight: 48, background: c.ink, color: c.paper, fontSize: 15.5, fontWeight: 600,
    padding: 12, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none"
  },
  hallCard: { marginTop: 18, border: `1px solid ${c.line}`, padding: "22px 24px", background: c.paper },
  hallTitle: { fontFamily: serif, fontSize: 20, fontWeight: 600, margin: "0 0 12px" },
  hallAddress: { margin: 0, fontSize: 15, lineHeight: 1.7, color: c.ink70 },
  hallLink: { display: "inline-block", marginTop: 14, fontSize: 14.5, fontWeight: 600 }
};

export default async function Home() {
  const news = (await getAnnouncements()).slice(0, 3);

  return (
    <>
      <section style={styles.hero}>
        <img src="/images/basilica-san-martin.png" alt="Basilica de San Martin de Tours" style={styles.heroImg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroInner}>
          <p style={styles.heroEyebrow}>Official website</p>
          <h1 style={styles.heroTitle}>
            The Heritage Town of Taal
          </h1>
          <p style={styles.heroLede}>
            Serving the residents of forty barangays with clear, complete instructions for every transaction at the Municipal Hall.
          </p>
          <ServiceSearch />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Frequently requested</h2>
        <p style={styles.sectionSubtitle}>Each page lists requirements, fees, the window to visit, and processing time.</p>
        <div style={styles.serviceGrid}>
          {SERVICES.map(s => (
            <Link key={s.id} href={`/services#${s.id}`} style={styles.serviceCard}>
              <span style={styles.serviceCode}>{s.code}</span>
              <span style={styles.serviceName}>{s.name}</span>
              <span style={styles.serviceTime}>{s.time}</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={styles.lowerSection}>
        <div style={styles.lowerGrid}>
          <div>
            <div style={styles.newsHeader}>
              <h2 style={styles.newsHeaderTitle}>Announcements</h2>
              <Link href="/announcements" style={styles.viewAllLink}>View all →</Link>
            </div>
            {news.map(n => (
              <article key={n.title} style={styles.newsItem}>
                <div style={styles.newsMeta}>
                  <span style={styles.newsTag}>{n.tag}</span>
                  <span style={styles.newsDate}>{n.date}</span>
                </div>
                <h3 style={styles.newsTitle}>{n.title}</h3>
                <p style={styles.newsBlurb}>{n.blurb}</p>
              </article>
            ))}
          </div>

          <div>
            <div style={styles.visitCard}>
              <h2 style={styles.visitTitle}>Visiting Taal</h2>
              <p style={styles.visitBlurb}>
                A declared National Historical Landmark: the Basilica, the ancestral houses along Calle Agoncillo, and the town’s embroidery and balisong trades.
              </p>
              <Photo src="/images/basilica-san-martin.png" caption="Basilica de San Martin de Tours" height={170} position="center 40%" />
              <Link href="/tourism" style={styles.visitCta}>Discover Taal</Link>
            </div>
            <div style={styles.hallCard}>
              <h3 style={styles.hallTitle}>Municipal Hall</h3>
              <p style={styles.hallAddress}>
                Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />Monday to Friday, 8:00AM–5:00PM
              </p>
              <Link href="/offices" style={styles.hallLink}>Office directory →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
