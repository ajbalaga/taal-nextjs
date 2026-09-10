"use client";
import { useState } from "react";
import { c, serif, mono } from "@/lib/theme";

const TOPICS = ["Business permit","Building permit","Barangay clearance","Cedula / community tax","Senior citizen ID","Civil registry document","Report a concern","Other inquiry"];

const field = { minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, width: "100%" };
const labelStyle = { fontSize: 14, fontWeight: 600, letterSpacing: ".02em" };

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
      <div style={{ background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)" }}>
        <p style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: c.terracottaDark, margin: "0 0 10px" }}>Request received</p>
        <h2 style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, margin: "0 0 12px" }}>Thank you. Your reference number is</h2>
        <p style={{ fontFamily: mono, fontSize: 26, fontWeight: 500, background: c.cream, padding: "14px 18px", margin: "0 0 16px", letterSpacing: ".04em" }}>{state.ref}</p>
        <p style={{ margin: "0 0 20px", fontSize: 15.5, lineHeight: 1.6, color: c.ink70 }}>
          Keep this number. Cite it when following up by phone or at the Hall.
        </p>
        <button onClick={() => { setForm({ name: "", barangay: "", contact: "", topic: TOPICS[0], message: "" }); setState({ status: "idle", ref: "", error: "" }); }}
          style={{ minHeight: 48, padding: "12px 22px", background: c.ink, color: c.paper, border: 0, fontSize: 15.5, fontWeight: 600 }}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label htmlFor="f-name" style={labelStyle}>Full name</label>
        <input id="f-name" value={form.name} onChange={set("name")} style={field} required />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label htmlFor="f-brgy" style={labelStyle}>Barangay</label>
          <input id="f-brgy" value={form.barangay} onChange={set("barangay")} style={field} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label htmlFor="f-contact" style={labelStyle}>Mobile or email</label>
          <input id="f-contact" value={form.contact} onChange={set("contact")} style={field} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label htmlFor="f-topic" style={labelStyle}>This is about</label>
        <select id="f-topic" value={form.topic} onChange={set("topic")} style={{ ...field, color: c.ink }}>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label htmlFor="f-msg" style={labelStyle}>Details</label>
        <textarea id="f-msg" rows={5} value={form.message} onChange={set("message")}
          style={{ padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, resize: "vertical", lineHeight: 1.55 }} required />
      </div>
      <button type="submit" disabled={state.status === "sending"}
        style={{ minHeight: 52, padding: "14px 24px", background: c.terracotta, color: c.paper, border: 0, fontSize: 16, fontWeight: 600, opacity: state.status === "sending" ? .7 : 1 }}>
        {state.status === "sending" ? "Submitting…" : "Submit request"}
      </button>
      {state.error && <p role="alert" style={{ margin: 0, fontSize: 14.5, color: c.terracottaDark, fontWeight: 600 }}>{state.error}</p>}
    </form>
  );
}
