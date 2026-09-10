// Minimal shared-secret guard for write endpoints and /admin.
// Swap for NextAuth or Clerk when the municipality needs per-staff accounts.
export function isAdmin(request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  const cookie = request.cookies?.get?.("admin_token")?.value || "";
  return bearer === token || cookie === token;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
