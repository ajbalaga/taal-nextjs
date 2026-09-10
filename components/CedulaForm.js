"use client";
import { useMemo, useState } from "react";
import { c, serif, mono } from "@/lib/theme";
import { BARANGAYS } from "@/lib/data";

const CIVIL_STATUS = ["Single", "Married", "Widowed", "Separated", "Divorced"];
const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 NN", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const EMPTY = {
  lastName: "", firstName: "", middleName: "", address: "", barangay: "",
  placeOfBirth: "", dob: "", sex: "Male", civilStatus: CIVIL_STATUS[0], citizenship: "Filipino",
  employmentStatus: "Employed", occupation: "", grossIncome: "", additionalIncome: "",
  contact: "", email: "", tin: "", height: "", weight: "",
  apptDate: "", apptTime: TIME_SLOTS[0]
};

function peso(n) {
  return "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ₱5 basic tax + ₱1 per ₱1,000 of gross annual income, plus 18% — matches the
// published Cedula calculator formula (basic + income-based tax, times 1.18).
function estimate(grossIncome) {
  const income = Number(grossIncome) || 0;
  const additionalTax = income / 1000;
  const totalBaseTax = 5 + additionalTax;
  const penalty = totalBaseTax * 0.18;
  return { additionalTax, totalBaseTax, penalty, total: totalBaseTax + penalty };
}

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function isWeekday(dateStr) {
  if (!dateStr) return true;
  const day = new Date(dateStr + "T00:00:00").getDay();
  return day !== 0 && day !== 6;
}

const styles = {
  field: { minHeight: 48, padding: "12px 14px", border: "1px solid rgba(51,37,26,.3)", background: c.ivory, width: "100%" },
  select: { color: c.ink },
  label: { fontSize: 14, fontWeight: 600, letterSpacing: ".02em" },
  hint: { margin: "2px 0 0", fontSize: 13, color: c.ink55 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 7 },
  radioRow: { display: "flex", gap: 18, minHeight: 48, alignItems: "center" },
  radioLabel: { display: "flex", alignItems: "center", gap: 7, fontSize: 15 },

  form: { background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)", display: "flex", flexDirection: "column", gap: 22 },
  sectionTitle: { fontFamily: serif, fontSize: 19, fontWeight: 600, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${c.lineSoft}` },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 },
  error: { margin: 0, fontSize: 13.5, color: c.terracottaDark, fontWeight: 600 },

  estimateBox: { background: c.cream, border: `1px solid ${c.line}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6 },
  estimateRow: { display: "flex", justifyContent: "space-between", fontSize: 14.5, color: c.ink70 },
  estimateTotal: { display: "flex", justifyContent: "space-between", fontFamily: serif, fontSize: 22, fontWeight: 600, marginTop: 6, paddingTop: 10, borderTop: `1px solid ${c.line}` },
  estimateNote: { margin: "8px 0 0", fontSize: 13, color: c.muted, lineHeight: 1.5 },

  submit: { minHeight: 52, padding: "14px 24px", background: c.terracotta, color: c.paper, border: 0, fontSize: 16, fontWeight: 600 },

  doneCard: { background: c.paper, border: `1px solid ${c.line}`, padding: "clamp(22px,3vw,32px)" },
  doneEyebrow: { fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: c.terracottaDark, margin: "0 0 10px" },
  doneTitle: { fontFamily: serif, fontSize: 26, fontWeight: 600, margin: "0 0 12px" },
  doneRef: { fontFamily: mono, fontSize: 26, fontWeight: 500, background: c.cream, padding: "14px 18px", margin: "0 0 16px", letterSpacing: ".04em" },
  doneNote: { margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.6, color: c.ink70 },
  doneList: { margin: "0 0 20px", paddingLeft: 20, fontSize: 15.5, lineHeight: 1.7, color: c.ink70 },
  doneButton: { minHeight: 48, padding: "12px 22px", background: c.ink, color: c.paper, border: 0, fontSize: 15.5, fontWeight: 600 }
};

export default function CedulaForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle", ref: "", error: "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const amount = useMemo(() => estimate(form.grossIncome), [form.grossIncome]);
  const dateOk = isWeekday(form.apptDate);

  async function submit(e) {
    e.preventDefault();
    const required = ["lastName", "firstName", "address", "barangay", "placeOfBirth", "dob", "occupation", "grossIncome", "contact", "apptDate", "apptTime"];
    if (required.some(k => !String(form[k]).trim())) {
      setState({ status: "idle", ref: "", error: "Please complete all required fields, including your preferred appointment date and time." });
      return;
    }
    if (!dateOk) {
      setState({ status: "idle", ref: "", error: "The Treasurer's Office is open Monday to Friday only — please choose a weekday." });
      return;
    }

    const name = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ");
    const message = [
      `Cedula appointment request — ${form.apptDate} at ${form.apptTime}`,
      `Address: ${form.address}, Brgy. ${form.barangay}, Taal, Batangas`,
      `Place of birth: ${form.placeOfBirth} · Date of birth: ${form.dob} · Sex: ${form.sex} · Civil status: ${form.civilStatus} · Citizenship: ${form.citizenship}`,
      `Employment status: ${form.employmentStatus} · Occupation: ${form.occupation}`,
      `Gross annual income: ${peso(Number(form.grossIncome) || 0)}${form.additionalIncome ? ` · Additional income: ${peso(Number(form.additionalIncome) || 0)}` : ""}`,
      form.email ? `Email: ${form.email}` : null,
      form.tin ? `TIN: ${form.tin}` : null,
      (form.height || form.weight) ? `Height/Weight: ${form.height || "—"} cm / ${form.weight || "—"} kg` : null,
      `Estimated amount due: ${peso(amount.total)} (basic + income-based tax, incl. standard assessment; confirmed at the Treasurer's Office)`
    ].filter(Boolean).join("\n");

    setState({ status: "sending", ref: "", error: "" });
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, barangay: form.barangay, contact: form.contact, topic: "Cedula / community tax", message })
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
        <p style={styles.doneEyebrow}>Appointment requested</p>
        <h2 style={styles.doneTitle}>Thank you. Your reference number is</h2>
        <p style={styles.doneRef}>{state.ref}</p>
        <p style={styles.doneNote}>
          Come to the <strong>Taxpayer's Lounge, Municipal Hall</strong> on <strong>{form.apptDate}</strong> at{" "}
          <strong>{form.apptTime}</strong> to pay and claim your cedula. Estimated amount due:{" "}
          <strong>{peso(amount.total)}</strong> (the Treasurer's Office confirms the final amount).
        </p>
        <ul style={styles.doneList}>
          <li>Present at least one valid government-issued ID when you pay.</li>
          <li>Keep your reference number and cite it if you need to reschedule.</li>
        </ul>
        <button onClick={() => { setForm(EMPTY); setState({ status: "idle", ref: "", error: "" }); }} style={styles.doneButton}>
          Request another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <div style={styles.fieldGroup}>
        <p style={styles.sectionTitle}>Taxpayer information</p>
      </div>
      <div style={styles.grid3}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Last name</label>
          <input value={form.lastName} onChange={set("lastName")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>First name</label>
          <input value={form.firstName} onChange={set("firstName")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Middle name</label>
          <input value={form.middleName} onChange={set("middleName")} style={styles.field} />
        </div>
      </div>
      <div style={styles.grid2}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Address</label>
          <input value={form.address} onChange={set("address")} style={styles.field} required placeholder="House no., street" />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Barangay</label>
          <select value={form.barangay} onChange={set("barangay")} style={{ ...styles.field, ...styles.select }} required>
            <option value="" disabled>Choose your barangay</option>
            {BARANGAYS.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div style={styles.grid3}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Place of birth</label>
          <input value={form.placeOfBirth} onChange={set("placeOfBirth")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Date of birth</label>
          <input type="date" value={form.dob} onChange={set("dob")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Citizenship</label>
          <input value={form.citizenship} onChange={set("citizenship")} style={styles.field} required />
        </div>
      </div>
      <div style={styles.grid2}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Sex</label>
          <div style={styles.radioRow}>
            {["Male", "Female"].map(v => (
              <label key={v} style={styles.radioLabel}>
                <input type="radio" name="sex" value={v} checked={form.sex === v} onChange={set("sex")} /> {v}
              </label>
            ))}
          </div>
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Civil status</label>
          <select value={form.civilStatus} onChange={set("civilStatus")} style={{ ...styles.field, ...styles.select }}>
            {CIVIL_STATUS.map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.sectionTitle}>Income and occupation</p>
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Employment status</label>
        <div style={styles.radioRow}>
          {["Employed", "Unemployed"].map(v => (
            <label key={v} style={styles.radioLabel}>
              <input type="radio" name="employmentStatus" value={v} checked={form.employmentStatus === v} onChange={set("employmentStatus")} /> {v}
            </label>
          ))}
        </div>
        <p style={styles.hint}>"Unemployed" is for students and first-time job seekers applying for the exemption.</p>
      </div>
      <div style={styles.grid3}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Occupation</label>
          <input value={form.occupation} onChange={set("occupation")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Gross annual income (₱)</label>
          <input type="number" min="0" step="0.01" value={form.grossIncome} onChange={set("grossIncome")} style={styles.field} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Additional income (₱)</label>
          <input type="number" min="0" step="0.01" value={form.additionalIncome} onChange={set("additionalIncome")} style={styles.field} />
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.sectionTitle}>Appointment</p>
        <p style={styles.hint}>Treasurer's Office hours: Monday–Friday, 8:00 AM–5:00 PM. Choose a weekday.</p>
      </div>
      <div style={styles.grid2}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Preferred date</label>
          <input type="date" min={tomorrow()} value={form.apptDate} onChange={set("apptDate")} style={styles.field} required />
          {!dateOk && <p style={styles.error}>Weekdays only — the office is closed on Saturday and Sunday.</p>}
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Preferred time</label>
          <select value={form.apptTime} onChange={set("apptTime")} style={{ ...styles.field, ...styles.select }} required>
            {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.sectionTitle}>Other information</p>
      </div>
      <div style={styles.grid3}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Mobile number</label>
          <input value={form.contact} onChange={set("contact")} style={styles.field} required placeholder="09xx xxx xxxx" />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" value={form.email} onChange={set("email")} style={styles.field} />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>TIN</label>
          <input value={form.tin} onChange={set("tin")} style={styles.field} />
        </div>
      </div>
      <div style={styles.grid2}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Height (cm)</label>
          <input type="number" min="0" value={form.height} onChange={set("height")} style={styles.field} />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Weight (kg)</label>
          <input type="number" min="0" value={form.weight} onChange={set("weight")} style={styles.field} />
        </div>
      </div>

      <div style={styles.estimateBox}>
        <p style={styles.sectionTitle}>Estimated amount due</p>
        <div style={styles.estimateRow}><span>Basic tax</span><span>{peso(5)}</span></div>
        <div style={styles.estimateRow}><span>Additional tax (₱1 per ₱1,000 of income)</span><span>{peso(amount.additionalTax)}</span></div>
        <div style={styles.estimateRow}><span>Total base tax</span><span>{peso(amount.totalBaseTax)}</span></div>
        <div style={styles.estimateRow}><span>Plus 18%</span><span>{peso(amount.penalty)}</span></div>
        <div style={styles.estimateTotal}><span>Estimated amount due</span><span>{peso(amount.total)}</span></div>
        <p style={styles.estimateNote}>
          Estimate only, based on gross annual income. The Municipal Treasurer's Office computes and confirms the exact amount when you pay.
        </p>
      </div>

      <button type="submit" disabled={state.status === "sending"} style={{ ...styles.submit, opacity: state.status === "sending" ? .7 : 1 }}>
        {state.status === "sending" ? "Submitting…" : "Request appointment"}
      </button>
      {state.error && <p role="alert" style={styles.error}>{state.error}</p>}
    </form>
  );
}
