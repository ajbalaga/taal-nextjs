import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import { c, serif, wrap, eyebrow, h1 } from "@/lib/theme";

export const metadata = { title: "Contact & Feedback" };

const styles = {
  title: { ...h1, marginBottom: 12 },
  lede: { margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "62ch" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,4vw,44px)", alignItems: "start" },
  sideCol: { display: "flex", flexDirection: "column", gap: 18 },
  hallCard: { background: c.cream, border: `1px solid ${c.line}`, padding: 24 },
  cardTitle: { fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 12px" },
  hallAddress: { margin: 0, fontSize: 15.5, lineHeight: 1.75, color: c.ink70 },
  tipCard: { border: `1px solid ${c.line}`, background: c.paper, padding: 24 },
  tipText: { margin: "0 0 12px", fontSize: 15, lineHeight: 1.6, color: c.ink70 },
  tipLink: { fontSize: 15, fontWeight: 600 }
};

export default function Contact() {
  return (
    <div style={wrap}>
      <p style={eyebrow}>Contact &amp; feedback</p>
      <h1 style={styles.title}>Send a request or a concern</h1>
      <p style={styles.lede}>
        Requests are routed to the concerned office within one working day. For emergencies, call the hotlines in the footer instead.
      </p>

      <div style={styles.grid}>
        <RequestForm />

        <div style={styles.sideCol}>
          <div style={styles.hallCard}>
            <h2 style={styles.cardTitle}>Municipal Hall</h2>
            <p style={styles.hallAddress}>
              Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />(043) 740-6183<br />mayor@taal.gov.ph<br />Monday to Friday, 8:00AM–5:00PM
            </p>
          </div>
          <div style={styles.tipCard}>
            <h2 style={styles.cardTitle}>Before you write</h2>
            <p style={styles.tipText}>
              Many transactions only need the right requirements on hand. Check the service page first.
            </p>
            <Link href="/services" style={styles.tipLink}>Services &amp; permits →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
