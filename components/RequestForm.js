"use client";
import { useState } from "react";
import { c, serif, mono } from "@/lib/theme";

const TOPICS = ["Business permit","Building permit","Barangay clearance","Cedula / community tax","Senior citizen ID","Civil registry document","Report a concern","Other inquiry"];

const styles = {
  field: { minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, width: "100%" },
  select: { color: c.ink },
  label: { fontSize: 14, fontWeight: 600, letterSpacing: ".02em" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 7 },

  doneCard: { background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)" },
  doneEyebrow: { fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: c.terracottaDark, margin: "0 0 10px" },
  doneTitle: { fontFamily: serif, fontSize: 26, fontWeight: 600, margin: "0 0 12px" },
  doneRef: { fontFamily: mono, fontSize: 26, fontWeight: 500, background: c.cream, padding: "14px 18px", margin: "0 0 16px", letterSpacing: ".04em" },
  doneNote: { margin: "0 0 20px", fontSize: 15.5, lineHeight: 1.6, color: c.ink70 },
  doneButton: { minHeight: 48, padding: "12px 22px", background: c.ink, color: c.paper, border: 0, fontSize: 15.5, fontWeight: 600 },

  form: { background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)", display: "flex", flexDirection: "column", gap: 18 },
  twoCol: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16 },
  textarea: { padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, resize: "vertical", lineHeight: 1.55 },
  submit: { minHeight: 52, padding: "14px 24px", background: c.terracotta, color: c.paper, border: 0, fontSize: 16, fontWeight: 600 },
  error: { margin: 0, fontSize: 14.5, color: c.terracottaDark, fontWeight: 600 }
};

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", barangay: "", contact: "", topic: TOPICS[0], message: "" });
  const [state, setState] = useState({ status: "idle", ref: "", error: "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setState({ status: "idle", ref: "", error: "Please fill in your name and the details of your request." });
      return;
    }
    setState({ status: "sending", ref: "", error: "" });
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setState({ status: "done", ref: data.reference, error: "" });
    } catch (err) {
      setState({ status: "idle", ref: "", error: err.message });
    }
  }

  if (state.status === "done") {
    return (
      <div style={styles.doneCard}>
        <p style={styles.doneEyebrow}>Request received</p>
        <h2 style={styles.doneTitle}>Thank you. Your reference number is</h2>
        <p style={styles.doneRef}>{state.ref}</p>
        <p style={styles.doneNote}>
          Keep this number. Cite it when following up by phone or at the Hall.
        </p>
        <button onClick={() => { setForm({ name: "", barangay: "", contact: "", topic: TOPICS[0], message: "" }); setState({ status: "idle", ref: "", error: "" }); }}
          style={styles.doneButton}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <div style={styles.fieldGroup}>
        <label htmlFor="f-name" style={styles.label}>Full name</label>
        <input id="f-name" value={form.name} onChange={set("name")} style={styles.field} required />
      </div>
      <div style={styles.twoCol}>
        <div style={styles.fieldGroup}>
          <label htmlFor="f-brgy" style={styles.label}>Barangay</label>
          <input id="f-brgy" value={form.barangay} onChange={set("barangay")} style={styles.field} />
        </div>
        <div style={styles.fieldGroup}>
          <label htmlFor="f-contact" style={styles.label}>Mobile or email</label>
          <input id="f-contact" value={form.contact} onChange={set("contact")} style={styles.field} />
        </div>
      </div>
      <div style={styles.fieldGroup}>
        <label htmlFor="f-topic" style={styles.label}>This is about</label>
        <select id="f-topic" value={form.topic} onChange={set("topic")} style={{ ...styles.field, ...styles.select }}>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div style={styles.fieldGroup}>
        <label htmlFor="f-msg" style={styles.label}>Details</label>
        <textarea id="f-msg" rows={5} value={form.message} onChange={set("message")} style={styles.textarea} required />
      </div>
      <button type="submit" disabled={state.status === "sending"}
        style={{ ...styles.submit, opacity: state.status === "sending" ? .7 : 1 }}>
        {state.status === "sending" ? "Submitting…" : "Submit request"}
      </button>
      {state.error && <p role="alert" style={styles.error}>{state.error}</p>}
    </form>
  );
}
