export const PLATFORM_LABELS = {
  telegram: "Telegram",
  x: "X (Twitter)",
  email: "Email",
  phone: "Phone number",
  linkedin: "LinkedIn",
};

const PLATFORM_DOMAINS = {
  telegram: ["t.me", "telegram.me", "telegram.dog"],
  x: ["x.com", "twitter.com"],
  linkedin: ["linkedin.com"],
};

// Homoglyph check runs on the raw input, BEFORE any unicode normalization —
// normalizing first would fold lookalike characters into their ASCII twins
// and let a fake handle verify as real.
const hasNonAsciiCharacters = (raw) => /[^\x00-\x7F]/.test(raw);

export const cleanValue = (raw) => {
  let value = raw.trim().toLowerCase();
  value = value.split("?")[0].split("#")[0];
  value = value
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
  return value;
};

const detectPlatform = (cleaned) => {
  if (/^[^@\s/]+@[^@\s/]+\.[^@\s/]+$/.test(cleaned)) return "email";

  for (const [platform, domains] of Object.entries(PLATFORM_DOMAINS)) {
    if (domains.some((domain) => cleaned === domain || cleaned.startsWith(`${domain}/`))) {
      return platform;
    }
  }

  return null;
};

export const extractHandle = (cleaned) => {
  let handle = cleaned;

  for (const domain of Object.values(PLATFORM_DOMAINS).flat()) {
    if (handle.startsWith(`${domain}/`)) {
      handle = handle.slice(domain.length + 1);
      break;
    }
  }

  return handle
    .replace(/^(company|in)\//, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
};

const isPhoneLike = (cleaned) => /^[+0-9][0-9\s()./-]{5,}$/.test(cleaned);

// "00" is the international dialing prefix — 00381… and +381… are the same number
export const normalizePhoneDigits = (value) => value.replace(/\D/g, "").replace(/^00/, "");

// Compare phone numbers on digits only, accepting the local form of an
// international number (064 123 4567 vs +381 64 123 4567) in either direction.
const phonesMatch = (inputPhone, entryPhone) => {
  const a = normalizePhoneDigits(inputPhone);
  const b = normalizePhoneDigits(entryPhone);
  if (!a || !b) return false;
  if (a === b) return true;

  const localTail = (value) => (value.startsWith("0") && value.length >= 7 ? value.slice(1) : null);
  const tailA = localTail(a);
  const tailB = localTail(b);
  if (tailA && b.endsWith(tailA)) return true;
  if (tailB && a.endsWith(tailB)) return true;
  return false;
};

const hexToBytes = (hex) => new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));

const bytesToHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

// Personal contacts are stored only as PBKDF2 hashes so neither the public
// repo nor the bundle contains the actual values. The salt in the data file is
// combined with a secret pepper (VERIFY_PEPPER env var, never in git) — without
// the pepper the hashes cannot be brute-forced, which matters for phone numbers
// where the keyspace is small. The hash input is "<type>:<normalized value>" so
// the same handle on different platforms produces different hashes.
export const deriveHash = async (type, value, kdf, pepper) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(`${type}:${value}`), "PBKDF2", false, ["deriveBits"]);
  const saltBytes = hexToBytes(kdf.salt);
  const pepperBytes = encoder.encode(pepper);
  const salt = new Uint8Array(saltBytes.length + pepperBytes.length);
  salt.set(saltBytes);
  salt.set(pepperBytes, saltBytes.length);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: kdf.iterations },
    key,
    256
  );
  return bytesToHex(new Uint8Array(bits));
};

const findMatch = async (verifiedChannels, type, plaintextPredicate, hashValue, pepper) => {
  const plainMatch = verifiedChannels.channels.find(
    (channel) => channel.type === type && channel.handle && plaintextPredicate(channel)
  );
  if (plainMatch) return plainMatch;

  if (verifiedChannels.kdf && hashValue && pepper) {
    const hash = await deriveHash(type, hashValue, verifiedChannels.kdf, pepper);
    return verifiedChannels.channels.find(
      (channel) => channel.type === type && Array.isArray(channel.hashes) && channel.hashes.includes(hash)
    );
  }

  return undefined;
};

export const checkInput = async (rawInput, selectedPlatform, verifiedChannels, pepper) => {
  if (hasNonAsciiCharacters(rawInput)) {
    return { status: "suspicious", input: rawInput.trim() };
  }

  const cleaned = cleanValue(rawInput);
  const platform = detectPlatform(cleaned) || selectedPlatform;

  if (platform === "email") {
    const email = cleaned.replace(/^@/, "");
    const match = await findMatch(
      verifiedChannels,
      "email",
      (channel) => cleanValue(channel.handle) === email,
      email,
      pepper
    );
    if (match) return { status: "verified", input: email, match };

    const domain = email.includes("@") ? email.split("@").pop() : null;
    if (domain && verifiedChannels.emailDomains.includes(domain)) {
      return { status: "officialDomain", input: email, domain };
    }

    return { status: "notVerified", input: email, platform };
  }

  if (platform === "phone" || isPhoneLike(cleaned)) {
    const digits = normalizePhoneDigits(cleaned);
    const match = await findMatch(
      verifiedChannels,
      "phone",
      (channel) => phonesMatch(cleaned, channel.handle),
      digits,
      pepper
    );
    if (match) return { status: "verified", input: cleaned, match };
    return { status: "notVerified", input: cleaned, platform: "phone" };
  }

  const handle = extractHandle(cleaned);
  if (!handle) return { status: "notVerified", input: cleaned, platform };

  const match = await findMatch(
    verifiedChannels,
    platform,
    (channel) => extractHandle(cleanValue(channel.handle)) === handle,
    handle,
    pepper
  );

  if (match) return { status: "verified", input: handle, match };

  return { status: "notVerified", input: cleaned, platform };
};
