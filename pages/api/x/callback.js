import { getOrigin } from "./login";

const PENDING_KEY = "ebg_pending";

// The popup/tab lands here after X auth. The result is delivered two ways so
// Connect works everywhere: postMessage for the desktop popup, localStorage
// for the mobile same-tab redirect (window.opener is unreliable on mobile).
function respond(res, payload, closePopup = true) {
  const json = JSON.stringify(payload);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Set-Cookie", "x_oauth=; Path=/api/x; HttpOnly; Max-Age=0");
  res.send(`<!DOCTYPE html><html><body><script>
(function () {
  var payload = ${json};
  try { localStorage.setItem("${PENDING_KEY}", JSON.stringify({ ts: Date.now(), data: payload })); } catch (e) {}
  if (window.opener) {
    try { window.opener.postMessage(payload, window.location.origin); } catch (e) {}
    ${closePopup ? "window.close();" : ""}
  }
  window.location.replace("/im-going");
})();
</script></body></html>`);
}

const fail = (res, message) => respond(res, { type: "connect-error", message });

export default async function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) return fail(res, error === "access_denied" ? "access was denied" : error);

  const cookie = (req.headers.cookie || "")
    .split(/;\s*/)
    .find((c) => c.startsWith("x_oauth="));
  const [savedState, verifier] = (cookie ? cookie.slice("x_oauth=".length) : "").split(".");

  if (!code || !savedState || !verifier || state !== savedState) {
    return fail(res, "session expired — try again");
  }

  const clientId = process.env.X_CLIENT_ID;
  const clientSecret = process.env.X_CLIENT_SECRET;
  const origin = getOrigin(req);

  try {
    const tokenHeaders = { "Content-Type": "application/x-www-form-urlencoded" };
    if (clientSecret) {
      tokenHeaders.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
    }

    const tokenResponse = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: tokenHeaders,
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        redirect_uri: `${origin}/api/x/callback`,
        code_verifier: verifier,
      }),
    });
    if (!tokenResponse.ok) return fail(res, "authorization failed");
    const { access_token } = await tokenResponse.json();

    const userResponse = await fetch(
      "https://api.x.com/2/users/me?user.fields=profile_image_url",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!userResponse.ok) return fail(res, "couldn't read your profile");
    const user = await userResponse.json();

    const normalUrl = user?.data?.profile_image_url;
    if (!normalUrl) return fail(res, "no profile picture found");

    // The API hands out a 48px "_normal" variant. Stripping the suffix serves
    // the original upload at full resolution; fall back to 400x400 if that
    // variant is gone.
    let imageResponse = await fetch(normalUrl.replace("_normal", ""));
    if (!imageResponse.ok) {
      imageResponse = await fetch(normalUrl.replace("_normal", "_400x400"));
    }
    if (!imageResponse.ok) return fail(res, "couldn't load your profile picture");
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const base64 = Buffer.from(await imageResponse.arrayBuffer()).toString("base64");

    return respond(res, {
      type: "connected",
      avatar: `data:${contentType};base64,${base64}`,
    });
  } catch (err) {
    return fail(res, "connection failed — try again");
  }
}
