import Link from "next/link";
import CedulaForm from "@/components/CedulaForm";
import { c, serif, wrap, eyebrow, h1 } from "@/lib/theme";

export const metadata = { title: "Cedula Appointment" };

const styles = {
  back: { fontSize: 14.5, fontWeight: 600, display: "inline-block", marginBottom: 18 },
  title: { ...h1, marginBottom: 12 },
  lede: { margin: "0 0 24px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "66ch" },
  payCard: { background: c.cream, border: `1px solid ${c.line}`, padding: "20px 24px", marginBottom: 28, maxWidth: "66ch" },
  payTitle: { fontFamily: serif, fontSize: 19, fontWeight: 600, margin: "0 0 8px" },
  payText: { margin: 0, fontSize: 15, lineHeight: 1.6, color: c.ink70 }
};

export default function CedulaAppointment() {
  return (
    <div style={wrap}>
      <Link href="/services#cedula" style={styles.back}>← Back to Services &amp; permits</Link>
      <p style={eyebrow}>Services &amp; permits</p>
      <h1 style={styles.title}>Cedula appointment request</h1>
      <p style={styles.lede}>
        Fill out this form to reserve a date and time at the Municipal Treasurer's Office.
        No fee is collected online — this only books your slot and gives you an estimate.
      </p>

      <div style={styles.payCard}>
        <h2 style={styles.payTitle}>How payment works</h2>
        <p style={styles.payText}>
          Once you submit this form, you'll get a reference number. Bring it — and at least one
          valid government-issued ID — to the <strong>Taxpayer's Lounge, Municipal Hall</strong> on
          your chosen date and time to pay and claim your cedula.
        </p>
      </div>

      <CedulaForm />
    </div>
  );
}
