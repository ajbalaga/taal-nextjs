// Design tokens from the HTML design reference.
export const c = {
  ivory: "#FBF6EC",
  paper: "#FDF8F0",
  cream: "#F1E6D0",
  ink: "#33251A",
  ink70: "#5A4535",
  ink55: "#6B5544",
  muted: "#8A6A46",
  terracotta: "#A8482C",
  terracottaDark: "#8E3A21",
  terracottaLight: "#B9613C",
  gold: "#A98039",
  goldText: "#7E5F21",
  goldLight: "#E6C88E",
  onDark: "#F1E6D0",
  onDarkMuted: "#D9C6A9",
  line: "rgba(51,37,26,.16)",
  lineSoft: "rgba(51,37,26,.10)"
};

export const serif = "var(--font-serif)";
export const sans = "var(--font-sans)";
export const mono = "var(--font-mono)";

export const eyebrow = {
  fontFamily: mono, fontSize: 11.5, letterSpacing: ".18em",
  textTransform: "uppercase", color: c.goldText, margin: "0 0 12px"
};
export const h1 = {
  fontFamily: serif, fontWeight: 600, lineHeight: 1.1, margin: 0,
  fontSize: "clamp(30px,5vw,46px)"
};
export const card = {
  background: c.paper, border: `1px solid ${c.line}`
};
export const wrap = { maxWidth: 1180, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px clamp(48px,6vw,72px)" };
export const primaryBtn = {
  minHeight: 48, padding: "12px 24px", background: c.terracotta,
  color: c.paper, border: 0, fontSize: 15.5, fontWeight: 600, cursor: "pointer"
};
