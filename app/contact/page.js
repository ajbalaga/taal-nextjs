import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import { c, serif, wrap, eyebrow, h1 } from "@/lib/theme";

export const metadata = { title: "Contact & Feedback" };

export default function Contact() {
  return (
    <div style={wrap}>
      <p style={eyebrow}>Contact &amp; feedback</p>
      <h1 style={{ ...h1, marginBottom: 12 }}>Send a request or a concern</h1>
      <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: c.ink70, maxWidth: "62ch" }}>
        Requests are routed to the concerned office within one working day. For emergencies, call the hotlines in the footer instead.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,4vw,44px)", alignItems: "start" }}>
        <RequestForm />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: c.cream, border: `1px solid ${c.line}`, padding: 24 }}>
            <h2 style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 12px" }}>Municipal Hall</h2>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: c.ink70 }}>
              Calle A. Agoncillo, Poblacion<br />Taal, Batangas 4208<br />(043) 740-6183<br />mayor@taal.gov.ph<br />Monday to Friday, 8:00AM–5:00PM
            </p>
          </div>
          <div style={{ border: `1px solid ${c.line}`, background: c.paper, padding: 24 }}>
            <h2 style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, margin: "0 0 12px" }}>Before you write</h2>
            <p style={{ margin: "0 0 12px", fontSize: 15, lineHeight: 1.6, color: c.ink70 }}>
              Many transactions only need the right requirements on hand. Check the service page first.
            </p>
            <Link href="/services" style={{ fontSize: 15, fontWeight: 600 }}>Services &amp; permits →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
