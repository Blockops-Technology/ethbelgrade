import { useState } from "react";

import styles from "./verify.module.scss";
import Button from "../common/button/button";
import { PLATFORM_LABELS } from "./verifyLogic";

const Verify = ({ publicChannels }) => {
  const [platform, setPlatform] = useState("telegram");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || checking) return;
    setChecking(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, platform }),
      });
      if (response.status === 429) {
        setResult({ status: "rateLimited" });
      } else if (!response.ok) {
        setResult({ status: "error" });
      } else {
        setResult(await response.json());
      }
    } catch {
      setResult({ status: "error" });
    } finally {
      setChecking(false);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setResult(null);
  };

  return (
    <div className={styles.verify}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Channel Verification</h1>
          <p className={styles.subtitle}>
            Scammers impersonate the ETH Belgrade team over Telegram, X, email, and phone.
            Use this page to check whether an account, address, or number officially belongs to us.
          </p>
        </div>

        <div className={styles.grid}>
          <div>
            <form className={styles.checkerCard} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="verify-platform">Channel</label>
              <select
                id="verify-platform"
                className={styles.select}
                value={platform}
                onChange={(event) => { setPlatform(event.target.value); setResult(null); }}
              >
                {Object.entries(PLATFORM_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              <label className={styles.label} htmlFor="verify-input">Channel details</label>
              <input
                id="verify-input"
                className={styles.input}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter username, email, phone number, or profile link"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <p className={styles.hint}>
                Copy the exact username from the profile you want to check. Be careful with
                similar-looking characters such as I (i), l (L), O, and 0 — your input must match
                the characters shown in the channel exactly.
              </p>

              <Button styleType="red" type="submit" disabled={checking}>
                {checking ? "Verifying…" : "Verify"}
              </Button>
            </form>

            {result && result.status === "verified" && (
              <div className={`${styles.result} ${styles.resultVerified}`}>
                <p className={styles.resultTitle}>✓ Verified official channel</p>
                <p className={styles.resultHandle}>{result.match.handle || result.input}</p>
                <p className={styles.resultMeta}>
                  {PLATFORM_LABELS[result.match.type] || result.match.type} — {result.match.name}
                  {result.match.role ? ` · ${result.match.role}` : ""}
                </p>
                <p className={styles.resultText}>
                  Compare it character by character with the channel you are checking. If it differs
                  in any way — an extra underscore, a capital I instead of a lowercase l — it is not us.
                </p>
              </div>
            )}

            {result && result.status === "officialDomain" && (
              <div className={`${styles.result} ${styles.resultWarning}`}>
                <p className={styles.resultTitle}>Official domain, unlisted address</p>
                <p className={styles.resultHandle}>{result.input}</p>
                <p className={styles.resultText}>
                  This address is on our official @{result.domain} domain, but it is not on our
                  published list. Email addresses can be spoofed — before acting on anything sensitive,
                  confirm through one of the verified channels below.
                </p>
              </div>
            )}

            {result && result.status === "notVerified" && (
              <div className={`${styles.result} ${styles.resultDanger}`}>
                <p className={styles.resultTitle}>✗ Not an official ETH Belgrade channel</p>
                <p className={styles.resultHandle}>{result.input}</p>
                <p className={styles.resultText}>
                  We could not verify this as an official ETH Belgrade channel. Do not engage,
                  do not send funds, and do not share personal information. If someone is impersonating
                  our team, please report it to us through a verified channel below.
                </p>
              </div>
            )}

            {result && result.status === "rateLimited" && (
              <div className={`${styles.result} ${styles.resultWarning}`}>
                <p className={styles.resultTitle}>Too many attempts</p>
                <p className={styles.resultText}>
                  Please wait a minute and try again.
                </p>
              </div>
            )}

            {result && result.status === "error" && (
              <div className={`${styles.result} ${styles.resultWarning}`}>
                <p className={styles.resultTitle}>Something went wrong</p>
                <p className={styles.resultText}>
                  We couldn&apos;t run the check. Please try again.
                </p>
              </div>
            )}

            {result && result.status === "suspicious" && (
              <div className={`${styles.result} ${styles.resultDanger}`}>
                <p className={styles.resultTitle}>⚠ Contains unusual characters</p>
                <p className={styles.resultHandle}>{result.input}</p>
                <p className={styles.resultText}>
                  Your input contains non-standard characters that imitate normal letters — a common
                  scam technique (for example, a Cyrillic &quot;а&quot; instead of a Latin &quot;a&quot;).
                  This is not an official ETH Belgrade channel. Do not engage.
                </p>
              </div>
            )}
          </div>

          <aside className={styles.notice}>
            <p className={styles.noticeTitle}>Important notice</p>
            <p>
              All official emails from ETH Belgrade are sent from addresses ending in
              <strong> @ethbelgrade.rs</strong> — check the spelling of the domain carefully.
            </p>
            <p>
              Our team will <strong>never</strong> DM you first to ask for payment, wallet access,
              seed phrases, private keys, or a &quot;deposit&quot; to confirm a ticket, sponsorship,
              or speaking slot.
            </p>
            <p>
              Do not engage with unverified sources, and do not share personal or project
              information with them.
            </p>
          </aside>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Make sure you&apos;re checking the right field</h2>
          <div className={styles.compareGrid}>
            <div className={`${styles.compareCard} ${styles.compareGood}`}>
              <p className={styles.compareBadge}>✓ Username</p>
              <p className={styles.compareExample}>@ethbelgrade</p>
              <p className={styles.compareText}>
                The username is unique — no two accounts can share it. This is the only field
                worth verifying.
              </p>
            </div>
            <div className={`${styles.compareCard} ${styles.compareBad}`}>
              <p className={styles.compareBadge}>✗ Display name / bio</p>
              <p className={styles.compareExample}>ETH Belgrade Team</p>
              <p className={styles.compareText}>
                Anyone can put anything in their display name, bio, or profile photo.
                Never trust these fields.
              </p>
            </div>
          </div>
          <p className={styles.sectionText}>
            Scammers often hide or remove their username and imitate official ETH Belgrade names in
            their bio and display name. Open the user&apos;s profile page and verify the actual
            <strong> username</strong> field — not the name shown in the chat.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Official channels</h2>
          <div className={styles.channelsList}>
            {publicChannels.map((channel) => (
              <div key={`${channel.type}-${channel.handle}`} className={styles.channelCard}>
                <p className={styles.channelPlatform}>{PLATFORM_LABELS[channel.type] || channel.type}</p>
                {channel.url ? (
                  <a className={styles.channelHandle} href={channel.url} target="_blank" rel="noreferrer noopener">
                    {channel.handle}
                  </a>
                ) : (
                  <p className={styles.channelHandle}>{channel.handle}</p>
                )}
                <p className={styles.channelMeta}>
                  {channel.name}
                  {channel.role ? ` · ${channel.role}` : ""}
                </p>
              </div>
            ))}
          </div>
          <p className={styles.sectionText}>
            Individual team members&apos; contacts are not listed publicly — use the checker above
            to verify a specific handle, email address, or phone number someone gives you.
          </p>
        </div>

        <div className={styles.disclaimer}>
          <p className={styles.disclaimerTitle}>Disclaimer</p>
          <p>
            We strive to keep the information on this page accurate and up to date; however, it may
            not always be complete or current. All information is provided on an &quot;as is&quot;
            basis, without warranties of any kind. Any information provided by our team is for
            information purposes only and is not financial, investment, or legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
