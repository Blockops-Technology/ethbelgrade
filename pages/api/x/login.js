import crypto from "crypto";

export function getOrigin(req) {
  if (process.env.X_OAUTH_ORIGIN) return process.env.X_OAUTH_ORIGIN;
  const proto = req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${req.headers.host}`;
}

export default function handler(req, res) {
  const clientId = process.env.X_CLIENT_ID;
  if (!clientId) {
    return res
      .status(500)
      .send("X connect is not configured — set X_CLIENT_ID in the environment");
  }

  const origin = getOrigin(req);
  const state = crypto.randomBytes(16).toString("hex");
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

  const secure = origin.startsWith("https") ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `x_oauth=${state}.${verifier}; Path=/api/x; HttpOnly; SameSite=Lax;${secure} Max-Age=600`
  );

  const url = new URL("https://x.com/i/oauth2/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${origin}/api/x/callback`);
  // users/me needs both scopes; the app only ever reads the profile picture
  url.searchParams.set("scope", "users.read tweet.read");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");

  res.redirect(url.toString());
}
