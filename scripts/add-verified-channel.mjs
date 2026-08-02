// Adds a team contact to components/verify/verified-channels.json as a salted
// PBKDF2 hash, so the value is verifiable on /verify but never appears in the
// repo or the public JS bundle.
//
// Usage:
//   node scripts/add-verified-channel.mjs <type> <value> <name> [role]
//   node scripts/add-verified-channel.mjs telegram @someuser "Jane Doe"
//   node scripts/add-verified-channel.mjs phone "+381 60 000 0000" "Jane Doe"
//
// Types: telegram | x | linkedin | email | phone

import { readFileSync, writeFileSync } from "fs";
import { randomBytes } from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { cleanValue, extractHandle, normalizePhoneDigits, deriveHash } from "../components/verify/verifyLogic.js";

const DATA_PATH = join(dirname(fileURLToPath(import.meta.url)), "../components/verify/verified-channels.json");
const SERBIA_COUNTRY_CODE = "381";

// All input forms that should verify for a given value — e.g. a Serbian phone
// number matches in both international (+381…) and local (06…) form.
export const hashFormsFor = (type, value) => {
  if (type === "phone") {
    const digits = normalizePhoneDigits(value);
    const forms = new Set([digits]);
    if (digits.startsWith(SERBIA_COUNTRY_CODE)) forms.add(`0${digits.slice(SERBIA_COUNTRY_CODE.length)}`);
    if (digits.startsWith("0")) forms.add(SERBIA_COUNTRY_CODE + digits.slice(1));
    return [...forms];
  }
  if (type === "email") return [cleanValue(value).replace(/^@/, "")];
  return [extractHandle(cleanValue(value))];
};

export const buildHashedEntry = async (type, value, name, role, kdf, pepper) => {
  const hashes = await Promise.all(hashFormsFor(type, value).map((form) => deriveHash(type, form, kdf, pepper)));
  return { type, hashes, name, role };
};

// The pepper never lives in the repo — read it from the environment or .env.local.
export const loadPepper = () => {
  if (process.env.VERIFY_PEPPER) return process.env.VERIFY_PEPPER;
  try {
    const envFile = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../.env.local"), "utf8");
    const match = envFile.match(/^VERIFY_PEPPER=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    // fall through
  }
  throw new Error("VERIFY_PEPPER not found — set it in .env.local or the environment.");
};

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  const [type, value, name, role = "ETH Belgrade team"] = process.argv.slice(2);
  if (!type || !value || !name) {
    console.error("Usage: node scripts/add-verified-channel.mjs <type> <value> <name> [role]");
    process.exit(1);
  }

  const pepper = loadPepper();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  if (!data.kdf) {
    data.kdf = { salt: randomBytes(16).toString("hex"), iterations: 600000 };
  }

  const entry = await buildHashedEntry(type, value, name, role, data.kdf, pepper);
  data.channels.push(entry);
  writeFileSync(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Added hashed ${type} entry for ${name} (${entry.hashes.length} accepted form(s)).`);
}
