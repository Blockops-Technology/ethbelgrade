import verifiedChannels from "../../components/verify/verified-channels.json";
import { checkInput, PLATFORM_LABELS } from "../../components/verify/verifyLogic";

// Per-IP rate limit so the endpoint can't be used to enumerate phone numbers
// or handles. Instances are reused under Fluid Compute, so an in-memory map
// is effective enough for this purpose.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
const hits = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear();
  return recent.length > RATE_LIMIT;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many attempts" });
  }

  const { input, platform } = req.body || {};
  if (typeof input !== "string" || !input.trim() || input.length > 300 || !PLATFORM_LABELS[platform]) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Without the pepper, hashed team entries can never match — that would return
  // a dangerous false "not verified" for real team members, so fail loudly.
  const pepper = process.env.VERIFY_PEPPER;
  if (!pepper) {
    return res.status(500).json({ error: "Verification is not configured" });
  }

  const result = await checkInput(input, platform, verifiedChannels, pepper);

  // Only expose what the result card needs — never the full channel entry.
  const match = result.match
    ? {
        type: result.match.type,
        name: result.match.name,
        role: result.match.role || null,
        handle: result.match.handle || null,
      }
    : undefined;

  return res.status(200).json({
    status: result.status,
    input: result.input,
    domain: result.domain,
    match,
  });
}
